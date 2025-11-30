import * as StellarSdk from 'stellar-sdk';
import { server, getNetworkPassphrase, STELLAR_NETWORK } from './stellar';

// Soroban contract configuration
export const CONTRACT_ID = process.env.NEXT_PUBLIC_SOROBAN_CONTRACT_ID || '';
export const TOKEN_CONTRACT_ID = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ID || '';

// Soroban RPC Server for contract interactions
const SOROBAN_RPC_URL = STELLAR_NETWORK === 'TESTNET'
  ? 'https://soroban-testnet.stellar.org'
  : 'https://soroban.stellar.org';

export const sorobanServer = new StellarSdk.SorobanRpc.Server(SOROBAN_RPC_URL);

// Type definitions matching the Rust smart contract
export interface ContractDrop {
  id: bigint;
  creator: string;
  amount: bigint;
  message: string;
  claimed: boolean;
  claimer: string | null;
}

/**
 * Initialize the Soroban contract with a token address
 * Must be called once after deploying the contract
 */
export async function initializeContract(
  adminSecretKey: string,
  tokenAddress: string
): Promise<string> {
  const source = StellarSdk.Keypair.fromSecret(adminSecretKey);
  const sourceAccount = await server.loadAccount(source.publicKey());

  const contract = new StellarSdk.Contract(CONTRACT_ID);

  // Build initialize transaction
  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: getNetworkPassphrase(),
  })
    .addOperation(
      contract.call(
        'initialize',
        StellarSdk.Address.fromString(tokenAddress).toScVal()
      )
    )
    .setTimeout(180)
    .build();

  transaction.sign(source);

  const result = await server.submitTransaction(transaction);
  return result.hash;
}

/**
 * Create a new drop on the smart contract
 * @param creatorSecretKey - Secret key of the drop creator
 * @param amount - Amount in stroops (1 XLM = 10,000,000 stroops)
 * @param message - Message for the drop
 * @returns Transaction hash and drop ID
 */
export async function createDropOnChain(
  creatorSecretKey: string,
  amount: number,
  message: string
): Promise<{ txHash: string; dropId: number }> {
  const creator = StellarSdk.Keypair.fromSecret(creatorSecretKey);
  const creatorAccount = await server.loadAccount(creator.publicKey());

  const contract = new StellarSdk.Contract(CONTRACT_ID);
  
  // Convert amount to stroops (smallest unit)
  const amountInStroops = BigInt(Math.floor(amount * 10_000_000));

  // Build create_drop transaction
  const transaction = new StellarSdk.TransactionBuilder(creatorAccount, {
    fee: (parseInt(StellarSdk.BASE_FEE) * 100).toString(), // Higher fee for contract calls
    networkPassphrase: getNetworkPassphrase(),
  })
    .addOperation(
      contract.call(
        'create_drop',
        StellarSdk.Address.fromString(creator.publicKey()).toScVal(),
        StellarSdk.nativeToScVal(amountInStroops, { type: 'i128' }),
        StellarSdk.nativeToScVal(message, { type: 'string' })
      )
    )
    .setTimeout(180)
    .build();

  transaction.sign(creator);

  const result = await server.submitTransaction(transaction);
  
  // Extract drop ID from transaction result
  // The contract returns the drop ID as u64
  const dropId = extractDropIdFromResult(result);

  return {
    txHash: result.hash,
    dropId,
  };
}

/**
 * Claim a drop from the smart contract
 * @param claimerSecretKey - Secret key of the claimer
 * @param dropId - ID of the drop to claim
 * @returns Transaction hash
 */
export async function claimDropOnChain(
  claimerSecretKey: string,
  dropId: number
): Promise<string> {
  const claimer = StellarSdk.Keypair.fromSecret(claimerSecretKey);
  const claimerAccount = await server.loadAccount(claimer.publicKey());

  const contract = new StellarSdk.Contract(CONTRACT_ID);

  // Build claim_drop transaction
  const transaction = new StellarSdk.TransactionBuilder(claimerAccount, {
    fee: (parseInt(StellarSdk.BASE_FEE) * 100).toString(), // Higher fee for contract calls
    networkPassphrase: getNetworkPassphrase(),
  })
    .addOperation(
      contract.call(
        'claim_drop',
        StellarSdk.nativeToScVal(dropId, { type: 'u64' }),
        StellarSdk.Address.fromString(claimer.publicKey()).toScVal()
      )
    )
    .setTimeout(180)
    .build();

  transaction.sign(claimer);

  const result = await server.submitTransaction(transaction);
  return result.hash;
}

/**
 * Get drop details from the smart contract
 * @param dropId - ID of the drop
 * @returns Drop details
 */
export async function getDropFromChain(dropId: number): Promise<ContractDrop | null> {
  try {
    const contract = new StellarSdk.Contract(CONTRACT_ID);
    
    // Create a temporary account for simulation (read-only operation)
    const simulationAccount = StellarSdk.Keypair.random();
    const account = await server.loadAccount(simulationAccount.publicKey()).catch(() => {
      // If account doesn't exist, create a simulated one
      return new StellarSdk.Account(simulationAccount.publicKey(), '0');
    });

    // Build get_drop transaction
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: getNetworkPassphrase(),
    })
      .addOperation(
        contract.call(
          'get_drop',
          StellarSdk.nativeToScVal(dropId, { type: 'u64' })
        )
      )
      .setTimeout(180)
      .build();

    // Simulate the transaction (doesn't require signing or submission)
    const simulation = await sorobanServer.simulateTransaction(transaction);
    
    if (StellarSdk.SorobanRpc.Api.isSimulationSuccess(simulation) && simulation.result) {
      return parseDropFromScVal(simulation.result.retval);
    }

    return null;
  } catch (error) {
    console.error('Error getting drop from chain:', error);
    return null;
  }
}

/**
 * Get the total number of drops from the smart contract
 */
export async function getDropCountFromChain(): Promise<number> {
  try {
    const contract = new StellarSdk.Contract(CONTRACT_ID);
    
    const simulationAccount = StellarSdk.Keypair.random();
    const account = await server.loadAccount(simulationAccount.publicKey()).catch(() => {
      return new StellarSdk.Account(simulationAccount.publicKey(), '0');
    });

    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: getNetworkPassphrase(),
    })
      .addOperation(contract.call('get_drop_count'))
      .setTimeout(180)
      .build();

    const simulation = await sorobanServer.simulateTransaction(transaction);
    
    if (StellarSdk.SorobanRpc.Api.isSimulationSuccess(simulation) && simulation.result) {
      return Number(StellarSdk.scValToNative(simulation.result.retval));
    }

    return 0;
  } catch (error) {
    console.error('Error getting drop count from chain:', error);
    return 0;
  }
}

/**
 * Cancel a drop (only by creator, only if unclaimed)
 */
export async function cancelDropOnChain(
  creatorSecretKey: string,
  dropId: number
): Promise<string> {
  const creator = StellarSdk.Keypair.fromSecret(creatorSecretKey);
  const creatorAccount = await server.loadAccount(creator.publicKey());

  const contract = new StellarSdk.Contract(CONTRACT_ID);

  const transaction = new StellarSdk.TransactionBuilder(creatorAccount, {
    fee: (parseInt(StellarSdk.BASE_FEE) * 100).toString(),
    networkPassphrase: getNetworkPassphrase(),
  })
    .addOperation(
      contract.call(
        'cancel_drop',
        StellarSdk.nativeToScVal(dropId, { type: 'u64' }),
        StellarSdk.Address.fromString(creator.publicKey()).toScVal()
      )
    )
    .setTimeout(180)
    .build();

  transaction.sign(creator);

  const result = await server.submitTransaction(transaction);
  return result.hash;
}

// Helper functions

function extractDropIdFromResult(result: any): number {
  try {
    // The contract returns the drop ID as the last operation result
    if (result.resultMetaXdr) {
      const meta = StellarSdk.xdr.TransactionMeta.fromXDR(result.resultMetaXdr, 'base64');
      
      // Navigate through the metadata to find the return value
      if (meta.v3()?.sorobanMeta()?.returnValue()) {
        const returnValue = meta.v3().sorobanMeta().returnValue();
        return Number(StellarSdk.scValToNative(returnValue));
      }
    }
    
    // Fallback: try to parse from result
    if (result.returnValue) {
      return Number(StellarSdk.scValToNative(result.returnValue));
    }
    
    throw new Error('Could not extract drop ID from transaction result');
  } catch (error) {
    console.error('Error extracting drop ID:', error);
    throw error;
  }
}

function parseDropFromScVal(scVal: any): ContractDrop {
  try {
    const nativeValue = StellarSdk.scValToNative(scVal);
    
    return {
      id: BigInt(nativeValue.id),
      creator: nativeValue.creator,
      amount: BigInt(nativeValue.amount),
      message: nativeValue.message,
      claimed: Boolean(nativeValue.claimed),
      claimer: nativeValue.claimer || null,
    };
  } catch (error) {
    console.error('Error parsing drop from ScVal:', error);
    throw error;
  }
}

/**
 * Sign a transaction using Freighter wallet
 * This is used when we need the user to sign contract interactions
 */
export async function signTransactionWithFreighter(
  transaction: StellarSdk.Transaction
): Promise<StellarSdk.Transaction> {
  const { signTransaction } = await import('@stellar/freighter-api');
  
  const signedXdr = await signTransaction(transaction.toXDR(), {
    networkPassphrase: getNetworkPassphrase(),
  });

  return StellarSdk.TransactionBuilder.fromXDR(signedXdr, getNetworkPassphrase());
}

/**
 * Create a drop using Freighter wallet (user-initiated)
 */
export async function createDropWithFreighter(
  amount: number,
  message: string,
  userPublicKey: string
): Promise<{ txHash: string; dropId: number }> {
  try {
    const userAccount = await server.loadAccount(userPublicKey);
    const contract = new StellarSdk.Contract(CONTRACT_ID);
    
    const amountInStroops = BigInt(Math.floor(amount * 10_000_000));

    // Build the transaction
    let transaction = new StellarSdk.TransactionBuilder(userAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: getNetworkPassphrase(),
    })
      .addOperation(
        contract.call(
          'create_drop',
          StellarSdk.Address.fromString(userPublicKey).toScVal(),
          StellarSdk.nativeToScVal(amountInStroops, { type: 'i128' }),
          StellarSdk.nativeToScVal(message, { type: 'string' })
        )
      )
      .setTimeout(180)
      .build();

    // Simulate to get the updated transaction with proper fees and resources
    console.log('📝 Simulating transaction...');
    const simulatedTx = await sorobanServer.simulateTransaction(transaction);
    
    if (StellarSdk.SorobanRpc.Api.isSimulationSuccess(simulatedTx)) {
      // Prepare the transaction with simulation results
      transaction = StellarSdk.SorobanRpc.assembleTransaction(
        transaction,
        simulatedTx
      ).build();
    } else {
      console.error('Simulation error:', simulatedTx);
      throw new Error(`Transaction simulation failed: ${JSON.stringify(simulatedTx)}`);
    }

    // Sign with Freighter
    console.log('✍️ Requesting signature from Freighter...');
    const signedTransaction = await signTransactionWithFreighter(transaction);
    
    // Submit
    console.log('📤 Submitting transaction...');
    const result = await sorobanServer.sendTransaction(signedTransaction);
    
    console.log('✅ Transaction submitted!', result);
    
    // Wait for confirmation
    if (result.status === 'PENDING') {
      let txResponse = await sorobanServer.getTransaction(result.hash);
      while (txResponse.status === 'NOT_FOUND') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        txResponse = await sorobanServer.getTransaction(result.hash);
      }
      
      if (txResponse.status === 'SUCCESS') {
        console.log('✅ Transaction confirmed!');
      } else {
        throw new Error(`Transaction failed: ${txResponse.status}`);
      }
    }
    
    // For now, return a mock drop ID since extraction is complex
    // The database will track drops by their own IDs
    const dropId = Date.now(); // Use timestamp as temporary ID

    return {
      txHash: result.hash,
      dropId,
    };
  } catch (error: any) {
    console.error('❌ Error creating drop:', error);
    throw error;
  }
}

/**
 * Claim a drop using Freighter wallet (user-initiated)
 */
export async function claimDropWithFreighter(
  dropId: number,
  userPublicKey: string
): Promise<string> {
  try {
    const userAccount = await server.loadAccount(userPublicKey);
    const contract = new StellarSdk.Contract(CONTRACT_ID);

    // Build the transaction
    let transaction = new StellarSdk.TransactionBuilder(userAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: getNetworkPassphrase(),
    })
      .addOperation(
        contract.call(
          'claim_drop',
          StellarSdk.nativeToScVal(dropId, { type: 'u64' }),
          StellarSdk.Address.fromString(userPublicKey).toScVal()
        )
      )
      .setTimeout(180)
      .build();

    // Simulate to get the updated transaction
    console.log('📝 Simulating claim transaction...');
    const simulatedTx = await sorobanServer.simulateTransaction(transaction);
    
    if (StellarSdk.SorobanRpc.Api.isSimulationSuccess(simulatedTx)) {
      transaction = StellarSdk.SorobanRpc.assembleTransaction(
        transaction,
        simulatedTx
      ).build();
    } else {
      console.error('Simulation error:', simulatedTx);
      throw new Error(`Transaction simulation failed: ${JSON.stringify(simulatedTx)}`);
    }

    // Sign with Freighter
    console.log('✍️ Requesting signature from Freighter...');
    const signedTransaction = await signTransactionWithFreighter(transaction);
    
    // Submit
    console.log('📤 Submitting claim transaction...');
    const result = await sorobanServer.sendTransaction(signedTransaction);
    
    console.log('✅ Claim transaction submitted!', result);
    
    // Wait for confirmation
    if (result.status === 'PENDING') {
      let txResponse = await sorobanServer.getTransaction(result.hash);
      while (txResponse.status === 'NOT_FOUND') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        txResponse = await sorobanServer.getTransaction(result.hash);
      }
      
      if (txResponse.status === 'SUCCESS') {
        console.log('✅ Claim confirmed!');
      } else {
        throw new Error(`Transaction failed: ${txResponse.status}`);
      }
    }
    
    return result.hash;
  } catch (error: any) {
    console.error('❌ Error claiming drop:', error);
    throw error;
  }
}
