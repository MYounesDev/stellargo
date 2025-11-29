import { isConnected, getPublicKey, signTransaction } from '@stellar/freighter-api';
import * as StellarSdk from 'stellar-sdk';
import { server, getNetworkPassphrase } from './stellar';

// Check if Freighter is available
export async function checkFreighterAvailability(): Promise<boolean> {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      console.log('Not in browser environment');
      return false;
    }
    
    // Wait a bit for Freighter to load (sometimes it takes a moment)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Check if Freighter API exists
    if (!(window as any).freighter) {
      console.log('Freighter API not found on window object');
      return false;
    }
    
    console.log('Checking Freighter connection...');
    const connected = await isConnected();
    console.log('Freighter isConnected:', connected);
    return true; // Return true if API exists, even if not "connected"
  } catch (error) {
    console.error('Freighter availability check failed:', error);
    // If we get here but window.freighter exists, Freighter is available
    if (typeof window !== 'undefined' && (window as any).freighter) {
      console.log('Freighter exists despite error, treating as available');
      return true;
    }
    return false;
  }
}

// Connect to Freighter wallet
export async function connectWallet(): Promise<string | null> {
  try {
    console.log('Starting wallet connection...');
    
    // First check if window.freighter exists at all
    if (typeof window !== 'undefined' && !(window as any).freighter) {
      throw new Error('Freighter extension not found. Please install it from freighter.app and refresh the page.');
    }
    
    console.log('Freighter extension detected');
    
    // Try to get public key directly - this will prompt the user
    console.log('Requesting public key from Freighter...');
    
    try {
      const publicKey = await getPublicKey();
      console.log('Public key received:', publicKey ? 'Yes' : 'No');
      
      if (!publicKey) {
        throw new Error('No public key returned. Please unlock your Freighter wallet and try again.');
      }
      
      return publicKey;
    } catch (getKeyError: any) {
      console.error('getPublicKey error:', getKeyError);
      
      // Better error messages based on the error
      if (getKeyError.toString().includes('User declined')) {
        throw new Error('Connection cancelled. Please click "Approve" when Freighter asks for permission.');
      } else if (getKeyError.toString().includes('locked')) {
        throw new Error('Freighter wallet is locked. Please unlock it by clicking the Freighter icon in your browser and entering your password.');
      } else {
        throw new Error(`Failed to get wallet key: ${getKeyError.message || 'Please make sure Freighter is unlocked'}`);
      }
    }
  } catch (error: any) {
    console.error('Error connecting wallet:', error);
    throw error; // Re-throw the error with its message
  }
}

// Create and sign a payment transaction
export async function createPaymentTransaction(
  sourcePublicKey: string,
  destinationPublicKey: string,
  amount: string,
  memo?: string
): Promise<string> {
  try {
    // Load source account
    const sourceAccount = await server.loadAccount(sourcePublicKey);

    // Build transaction
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: getNetworkPassphrase(),
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationPublicKey,
          asset: StellarSdk.Asset.native(),
          amount: amount,
        })
      )
      .setTimeout(180);

    // Add memo if provided
    if (memo) {
      transaction.addMemo(StellarSdk.Memo.text(memo));
    }

    const builtTransaction = transaction.build();

    // Sign with Freighter
    const signedXdr = await signTransaction(builtTransaction.toXDR(), {
      networkPassphrase: getNetworkPassphrase(),
    });

    // Submit transaction
    const transactionToSubmit = StellarSdk.TransactionBuilder.fromXDR(
      signedXdr,
      getNetworkPassphrase()
    );
    const result = await server.submitTransaction(transactionToSubmit);

    return result.hash;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
}

