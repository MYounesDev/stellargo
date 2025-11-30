'use client';

import { useState, useEffect, useCallback } from 'react';
import { isConnected, getPublicKey } from '@stellar/freighter-api';

interface WalletState {
  publicKey: string | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for Freighter wallet integration
 * Based on: https://developers.stellar.org/docs/build/guides/dapps/frontend-guide
 */
export function useWallet() {
  const [state, setState] = useState<WalletState>({
    publicKey: null,
    isConnected: false,
    isLoading: false,
    error: null,
  });

  // Check if wallet was previously connected (from localStorage) on mount
  // This restores the connection state without triggering the Freighter popup
  useEffect(() => {
    const checkPreviousConnection = async () => {
      try {
        // Check localStorage for previous connection
        const savedAddress = localStorage.getItem('walletAddress');
        
        if (savedAddress) {
          // Check if Freighter is still connected (doesn't trigger popup)
          const connected = await isConnected();
          
          if (connected) {
            // Wallet is still connected, restore the state
            setState({
              publicKey: savedAddress,
              isConnected: true,
              isLoading: false,
              error: null,
            });
            console.log('✅ Restored wallet connection from localStorage');
          } else {
            // Wallet was disconnected, clear localStorage
            localStorage.removeItem('walletAddress');
          }
        }
      } catch (error) {
        // If isConnected fails, Freighter might not be installed
        console.log('Freighter check failed - extension might not be installed');
      }
    };

    checkPreviousConnection();
  }, []);

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      console.log('🔵 Attempting to connect to Freighter...');

      // Try to get the public key - this will trigger Freighter's connection popup
      // If Freighter is not installed, this will throw an error
      const pubKey = await getPublicKey();

      console.log('✅ Successfully connected! Public key:', pubKey.slice(0, 10) + '...');

      // Update state with successful connection
      setState({
        publicKey: pubKey,
        isConnected: true,
        isLoading: false,
        error: null,
      });

      // Persist to localStorage
      localStorage.setItem('walletAddress', pubKey);

      return pubKey;
    } catch (error: any) {
      console.error('❌ Connection error:', error);

      let errorMessage = 'Failed to connect to Freighter wallet';

      // Parse the error to provide helpful feedback
      const errorString = error?.message || error?.toString() || '';

      if (errorString.includes('User declined')) {
        errorMessage = 'You declined the connection request. Please try again and approve the connection.';
      } else if (errorString.includes('Freighter is not installed')) {
        errorMessage = 'Freighter wallet is not installed. Please install it from freighter.app';
      } else if (errorString.includes('extension')) {
        errorMessage = 'Cannot connect to Freighter extension. Please make sure it is installed and enabled.';
      } else if (errorString.includes('locked')) {
        errorMessage = 'Your Freighter wallet is locked. Please unlock it and try again.';
      } else if (errorString) {
        errorMessage = errorString;
      }

      setState({
        publicKey: null,
        isConnected: false,
        isLoading: false,
        error: errorMessage,
      });

      throw new Error(errorMessage);
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      publicKey: null,
      isConnected: false,
      isLoading: false,
      error: null,
    });
    localStorage.removeItem('walletAddress');
  }, []);

  return {
    publicKey: state.publicKey,
    isConnected: state.isConnected,
    isLoading: state.isLoading,
    error: state.error,
    connect,
    disconnect,
  };
}

