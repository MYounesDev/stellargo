#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env, String};

// Data structure for a drop
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Drop {
    pub id: u64,
    pub creator: Address,
    pub amount: i128,
    pub message: String,
    pub claimed: bool,
    pub claimer: Option<Address>,
}

// Storage keys
#[contracttype]
pub enum DataKey {
    Drop(u64),      // Individual drop
    DropCount,      // Total number of drops
    Token,          // Token contract address
}

#[contract]
pub struct GeoDropContract;

#[contractimpl]
impl GeoDropContract {
    /// Initialize the contract with a token address
    pub fn initialize(env: Env, token: Address) {
        if env.storage().instance().has(&DataKey::Token) {
            panic!("Already initialized");
        }
        
        env.storage().instance().set(&DataKey::Token, &token);
        env.storage().instance().set(&DataKey::DropCount, &0u64);
    }

    /// Create a new drop
    /// The creator must have already approved the token transfer
    pub fn create_drop(
        env: Env,
        creator: Address,
        amount: i128,
        message: String,
    ) -> u64 {
        // Verify the creator
        creator.require_auth();

        if amount <= 0 {
            panic!("Amount must be positive");
        }

        // Get token and transfer funds to contract
        let token_address: Address = env
            .storage()
            .instance()
            .get(&DataKey::Token)
            .expect("Token not initialized");
        
        let token_client = token::Client::new(&env, &token_address);
        token_client.transfer(&creator, &env.current_contract_address(), &amount);

        // Create drop
        let drop_count: u64 = env
            .storage()
            .instance()
            .get(&DataKey::DropCount)
            .unwrap_or(0);
        
        let drop_id = drop_count + 1;

        let drop = Drop {
            id: drop_id,
            creator: creator.clone(),
            amount,
            message,
            claimed: false,
            claimer: None,
        };

        // Store drop
        env.storage().persistent().set(&DataKey::Drop(drop_id), &drop);
        env.storage().instance().set(&DataKey::DropCount, &drop_id);

        drop_id
    }

    /// Claim a drop
    /// In a real implementation, location verification would happen off-chain
    /// and pass a signed proof here
    pub fn claim_drop(env: Env, drop_id: u64, claimer: Address) {
        // Verify the claimer
        claimer.require_auth();

        // Get drop
        let mut drop: Drop = env
            .storage()
            .persistent()
            .get(&DataKey::Drop(drop_id))
            .expect("Drop not found");

        if drop.claimed {
            panic!("Drop already claimed");
        }

        // Mark as claimed
        drop.claimed = true;
        drop.claimer = Some(claimer.clone());

        // Transfer tokens to claimer
        let token_address: Address = env
            .storage()
            .instance()
            .get(&DataKey::Token)
            .expect("Token not initialized");
        
        let token_client = token::Client::new(&env, &token_address);
        token_client.transfer(&env.current_contract_address(), &claimer, &drop.amount);

        // Update storage
        env.storage().persistent().set(&DataKey::Drop(drop_id), &drop);
    }

    /// Get drop details
    pub fn get_drop(env: Env, drop_id: u64) -> Drop {
        env.storage()
            .persistent()
            .get(&DataKey::Drop(drop_id))
            .expect("Drop not found")
    }

    /// Get total number of drops
    pub fn get_drop_count(env: Env) -> u64 {
        env.storage()
            .instance()
            .get(&DataKey::DropCount)
            .unwrap_or(0)
    }

    /// Cancel a drop (only by creator, only if unclaimed)
    pub fn cancel_drop(env: Env, drop_id: u64, creator: Address) {
        // Verify the creator
        creator.require_auth();

        // Get drop
        let drop: Drop = env
            .storage()
            .persistent()
            .get(&DataKey::Drop(drop_id))
            .expect("Drop not found");

        if drop.creator != creator {
            panic!("Only creator can cancel");
        }

        if drop.claimed {
            panic!("Cannot cancel claimed drop");
        }

        // Return funds to creator
        let token_address: Address = env
            .storage()
            .instance()
            .get(&DataKey::Token)
            .expect("Token not initialized");
        
        let token_client = token::Client::new(&env, &token_address);
        token_client.transfer(&env.current_contract_address(), &creator, &drop.amount);

        // Remove drop from storage
        env.storage().persistent().remove(&DataKey::Drop(drop_id));
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Address, Env, String};

    #[test]
    fn test_create_and_claim_drop() {
        let env = Env::default();
        let contract_id = env.register_contract(None, GeoDropContract);
        let client = GeoDropContractClient::new(&env, &contract_id);

        // Create mock token
        let token_admin = Address::generate(&env);
        let token_contract = env.register_stellar_asset_contract_v2(token_admin.clone());
        let token_address = token_contract.address();
        let token_stellar_client = token::StellarAssetClient::new(&env, &token_address);

        // Initialize contract with token address
        client.initialize(&token_address);

        // Create test users
        let creator = Address::generate(&env);
        let claimer = Address::generate(&env);

        // Mock all authorizations (this allows minting and transfers)
        env.mock_all_auths();

        // Mint tokens to creator
        token_stellar_client.mint(&creator, &10000i128);

        // Create drop
        let amount = 1000i128;
        let message = String::from_str(&env, "Test drop");
        let drop_id = client.create_drop(&creator, &amount, &message);

        assert_eq!(drop_id, 1);
        assert_eq!(client.get_drop_count(), 1);

        // Get drop
        let drop = client.get_drop(&drop_id);
        assert_eq!(drop.creator, creator);
        assert_eq!(drop.amount, amount);
        assert_eq!(drop.claimed, false);

        // Claim drop
        client.claim_drop(&drop_id, &claimer);

        // Verify claimed
        let drop = client.get_drop(&drop_id);
        assert_eq!(drop.claimed, true);
        assert_eq!(drop.claimer, Some(claimer));
    }

    #[test]
    #[should_panic(expected = "Drop already claimed")]
    fn test_cannot_claim_twice() {
        let env = Env::default();
        let contract_id = env.register_contract(None, GeoDropContract);
        let client = GeoDropContractClient::new(&env, &contract_id);

        let token_admin = Address::generate(&env);
        let token_contract = env.register_stellar_asset_contract_v2(token_admin.clone());
        let token_address = token_contract.address();
        let token_stellar_client = token::StellarAssetClient::new(&env, &token_address);

        client.initialize(&token_address);

        let creator = Address::generate(&env);
        let claimer1 = Address::generate(&env);
        let claimer2 = Address::generate(&env);

        env.mock_all_auths();

        // Mint tokens to creator
        token_stellar_client.mint(&creator, &10000i128);

        let drop_id = client.create_drop(
            &creator,
            &1000i128,
            &String::from_str(&env, "Test"),
        );

        client.claim_drop(&drop_id, &claimer1);
        client.claim_drop(&drop_id, &claimer2); // Should panic
    }
}

