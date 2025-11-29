'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isConnected, getPublicKey, signTransaction } from '@stellar/freighter-api';

export type UserPersona = 'individual' | 'business' | 'nonprofit' | 'other';

export interface WalletContextType {
  publicKey: string | null;
  isConnected: boolean;
  isDemoMode: boolean;
  balance: number;
  persona: UserPersona | null;
  isOnboarded: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  connectDemoWallet: () => void;
  setPersona: (persona: UserPersona) => void;
  completeOnboarding: () => void;
  signTransaction: (xdr: string, network: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const DEMO_ADDRESS = 'GBDEMOADDRESS123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DEMO_BALANCE = 1000.50;

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [balance, setBalance] = useState(0);
  const [persona, setPersonaState] = useState<UserPersona | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedPublicKey = localStorage.getItem('stellargo_publicKey');
    const savedIsDemoMode = localStorage.getItem('stellargo_isDemoMode') === 'true';
    const savedPersona = localStorage.getItem('stellargo_persona') as UserPersona | null;
    const savedIsOnboarded = localStorage.getItem('stellargo_isOnboarded') === 'true';

    if (savedPublicKey) {
      setPublicKey(savedPublicKey);
      setIsConnected(true);
      setIsDemoMode(savedIsDemoMode);
      setPersonaState(savedPersona);
      setIsOnboarded(savedIsOnboarded);

      if (savedIsDemoMode) {
        setBalance(DEMO_BALANCE);
      } else {
        // In production, fetch real balance from Stellar network
        fetchBalance(savedPublicKey);
      }
    }
  }, []);

  const fetchBalance = async (pubKey: string) => {
    try {
      // TODO: Implement actual Stellar balance fetching
      // For now, set a placeholder
      setBalance(0);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(0);
    }
  };

  const connectWallet = async () => {
    try {
      const connected = await isConnected();
      if (!connected) {
        throw new Error('Freighter is not installed or accessible');
      }

      const pubKey = await getPublicKey();
      setPublicKey(pubKey);
      setIsConnected(true);
      setIsDemoMode(false);

      // Save to localStorage
      localStorage.setItem('stellargo_publicKey', pubKey);
      localStorage.setItem('stellargo_isDemoMode', 'false');

      await fetchBalance(pubKey);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  const connectDemoWallet = () => {
    setPublicKey(DEMO_ADDRESS);
    setIsConnected(true);
    setIsDemoMode(true);
    setBalance(DEMO_BALANCE);

    // Save to localStorage
    localStorage.setItem('stellargo_publicKey', DEMO_ADDRESS);
    localStorage.setItem('stellargo_isDemoMode', 'true');
  };

  const disconnectWallet = () => {
    setPublicKey(null);
    setIsConnected(false);
    setIsDemoMode(false);
    setBalance(0);
    setPersonaState(null);
    setIsOnboarded(false);

    // Clear localStorage
    localStorage.removeItem('stellargo_publicKey');
    localStorage.removeItem('stellargo_isDemoMode');
    localStorage.removeItem('stellargo_persona');
    localStorage.removeItem('stellargo_isOnboarded');
  };

  const setPersona = (newPersona: UserPersona) => {
    setPersonaState(newPersona);
    localStorage.setItem('stellargo_persona', newPersona);
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
    localStorage.setItem('stellargo_isOnboarded', 'true');
  };

  const signTransactionHandler = async (xdr: string, network: string): Promise<string> => {
    if (isDemoMode) {
      // In demo mode, simulate signing
      return `DEMO_SIGNED_${xdr.substring(0, 20)}`;
    }

    try {
      const signedXdr = await signTransaction(xdr, { network });
      return signedXdr;
    } catch (error) {
      console.error('Failed to sign transaction:', error);
      throw error;
    }
  };

  const value: WalletContextType = {
    publicKey,
    isConnected,
    isDemoMode,
    balance,
    persona,
    isOnboarded,
    connectWallet,
    disconnectWallet,
    connectDemoWallet,
    setPersona,
    completeOnboarding,
    signTransaction: signTransactionHandler,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

