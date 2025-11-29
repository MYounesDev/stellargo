# StellarGo Soroban Smart Contracts

This directory contains the Soroban smart contracts for the StellarGo platform.

## Contracts

### GeoDropContract (`geo_drop/`)

The main contract handling drop creation and claiming functionality.

**Key Features:**
- Create drops with XLM or any Stellar asset
- Claim drops with authentication
- Cancel unclaimed drops (creator only)
- Query drop details and statistics

**Functions:**
- `initialize(token: Address)` - Initialize contract with token
- `create_drop(creator: Address, amount: i128, message: String)` - Create a new drop
- `claim_drop(drop_id: u64, claimer: Address)` - Claim a drop
- `get_drop(drop_id: u64)` - Get drop details
- `get_drop_count()` - Get total number of drops
- `cancel_drop(drop_id: u64, creator: Address)` - Cancel unclaimed drop

## Building

Make sure you have the Soroban CLI installed:

```bash
cargo install --locked soroban-cli
```

Build the contract:

```bash
cd geo_drop
soroban contract build
```

## Testing

Run tests:

```bash
cd geo_drop
cargo test
```

## Deployment

### Deploy to Testnet

```bash
# Build optimized contract
soroban contract build

# Deploy
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/geo_drop.wasm \
  --source <YOUR_SECRET_KEY> \
  --rpc-url https://soroban-testnet.stellar.org:443 \
  --network-passphrase "Test SDF Network ; September 2015"

# Initialize with token (XLM or custom token)
soroban contract invoke \
  --id <CONTRACT_ID> \
  --source <YOUR_SECRET_KEY> \
  --rpc-url https://soroban-testnet.stellar.org:443 \
  --network-passphrase "Test SDF Network ; September 2015" \
  -- \
  initialize \
  --token <TOKEN_CONTRACT_ADDRESS>
```

## Security Considerations

### Current Implementation (MVP)
- Location verification happens off-chain
- Basic authentication using Soroban's built-in auth
- No time-locks or expiration

### Future Improvements
- On-chain location proof verification using oracles
- Time-locked drops with automatic refunds
- Multi-signature claims for high-value drops
- Reputation system for creators
- Fee distribution mechanism
- Emergency pause functionality

## Architecture

```
Contract Storage:
├── Token (Instance) - Token contract address
├── DropCount (Instance) - Total number of drops
└── Drop(id) (Persistent) - Individual drop data
    ├── id: u64
    ├── creator: Address
    ├── amount: i128
    ├── message: String
    ├── claimed: bool
    └── claimer: Option<Address>
```

## Integration with Frontend

The frontend communicates with this contract through:
1. Freighter wallet for transaction signing
2. Stellar SDK for contract invocation
3. Off-chain location verification before allowing claims

## Development Roadmap

- [x] Basic drop creation and claiming
- [x] Cancel functionality
- [ ] Time-locked drops
- [ ] Multi-asset support
- [ ] Drop templates (recurring, conditional)
- [ ] Batch operations
- [ ] Event emissions for indexing
- [ ] Oracle integration for location proofs

## Resources

- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Soroban by Example](https://soroban.stellar.org/docs/learn/examples)
- [Stellar Laboratory](https://laboratory.stellar.org/)

## License

MIT License - Built for hackathon purposes

