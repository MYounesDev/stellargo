'use client';

import { StellarWalletsKit, WalletNetwork, allowAllModules, FREIGHTER_ID } from '@creit.tech/stellar-wallets-kit';

let walletKit: StellarWalletsKit | null = null;

export const initWalletKit = () => {
  if (typeof window === 'undefined') return null;
  
  if (!walletKit) {
    walletKit = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: FREIGHTER_ID,
      modules: allowAllModules(),
    });
  }
  
  return walletKit;
};

export const getWalletKit = () => {
  if (!walletKit) {
    return initWalletKit();
  }
  return walletKit;
};

export const connectWalletWithModal = async () => {
  try {
    const kit = getWalletKit();
    if (!kit) throw new Error('Wallet kit not initialized');
    
    await kit.openModal({
      onWalletSelected: async (option) => {
        console.log('Selected wallet:', option.name);
      }
    });
    
    const { address } = await kit.getAddress();
    return address;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

export const disconnectWallet = () => {
  // Clear any stored wallet data
  if (typeof window !== 'undefined') {
    localStorage.removeItem('walletAddress');
  }
};

