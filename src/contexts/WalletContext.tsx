'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { connectWalletWithModal, disconnectWallet as disconnectWalletLib } from '@/lib/wallet';
import { getAccountBalance } from '@/lib/stellar';

interface WalletContextType {
  walletAddress: string | null;
  balance: string | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check for previously connected wallet
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
      fetchBalance(savedAddress);
    }
  }, []);

  const fetchBalance = async (address: string) => {
    try {
      const bal = await getAccountBalance(address);
      setBalance(parseFloat(bal).toFixed(2));
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('0.00');
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      const address = await connectWalletWithModal();
      if (address) {
        setWalletAddress(address);
        localStorage.setItem('walletAddress', address);
        await fetchBalance(address);
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      if (error.message?.includes('User declined')) {
        // User cancelled, don't show error
        return;
      }
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(null);
    disconnectWalletLib();
  };

  const refreshBalance = async () => {
    if (walletAddress) {
      await fetchBalance(walletAddress);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        balance,
        isConnecting,
        connectWallet,
        disconnectWallet,
        refreshBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

