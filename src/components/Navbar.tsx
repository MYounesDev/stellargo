'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Button';
import { connectWallet } from '@/lib/freighter';
import { getAccountBalance } from '@/lib/stellar';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if wallet was previously connected
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
    }
  };

  const handleConnectWallet = async () => {
    console.log('🔵 Connect Wallet button clicked');
    setLoading(true);
    
    try {
      // Check if Freighter extension is installed
      if (typeof window !== 'undefined') {
        if (!(window as any).freighter) {
          alert(
            '❌ Freighter Wallet Not Found\n\n' +
            'Please follow these steps:\n' +
            '1. Install Freighter from: https://www.freighter.app/\n' +
            '2. Restart your browser\n' +
            '3. Refresh this page\n' +
            '4. Try connecting again'
          );
          window.open('https://www.freighter.app/', '_blank');
          return;
        }
        console.log('✓ Freighter extension detected');
      }
      
      console.log('🔵 Attempting to connect wallet...');
      const publicKey = await connectWallet();
      console.log('🔵 Received public key:', publicKey ? publicKey.slice(0, 10) + '...' : 'null');
      
      if (publicKey) {
        setWalletAddress(publicKey);
        localStorage.setItem('walletAddress', publicKey);
        await fetchBalance(publicKey);
        console.log('✅ Wallet connected successfully!');
      } else {
        throw new Error('No public key received. Please unlock your Freighter wallet and try again.');
      }
    } catch (error: any) {
      console.error('❌ Error connecting wallet:', error);
      
      // Show specific error message
      let title = '❌ Connection Failed';
      let message = '';
      let instructions = '';
      
      if (error.message?.includes('not found') || error.message?.includes('not installed')) {
        title = '❌ Freighter Not Installed';
        message = 'The Freighter wallet extension is not installed.';
        instructions = '\nSteps to fix:\n1. Visit: https://www.freighter.app/\n2. Install the extension\n3. Refresh this page';
      } else if (error.message?.includes('locked')) {
        title = '🔒 Wallet Locked';
        message = 'Your Freighter wallet is locked.';
        instructions = '\nSteps to fix:\n1. Click the Freighter icon in your browser toolbar\n2. Enter your password to unlock\n3. Try connecting again';
      } else if (error.message?.includes('declined') || error.message?.includes('cancelled')) {
        title = '🚫 Connection Cancelled';
        message = 'You cancelled the connection request.';
        instructions = '\nTo connect:\n1. Click "Connect Wallet" again\n2. Click "Approve" in the Freighter popup';
      } else {
        message = error.message || 'An unknown error occurred.';
        instructions = '\nTroubleshooting:\n1. Make sure Freighter is installed\n2. Make sure Freighter is unlocked\n3. Try refreshing the page';
      }
      
      alert(title + '\n\n' + message + instructions);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setBalance(null);
    localStorage.removeItem('walletAddress');
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/ai-trader', label: 'AI Trader' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <nav className="bg-white border-b border-accent-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-accent-900">StellarGo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-primary-600'
                    : 'text-accent-600 hover:text-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet Section */}
          <div className="hidden md:flex items-center space-x-4">
            {walletAddress ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-semibold text-accent-900">
                    {balance ? `${balance} XLM` : 'Loading...'}
                  </div>
                  <div className="text-xs text-accent-500">
                    {truncateAddress(walletAddress)}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={handleConnectWallet}
                loading={loading}
              >
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-accent-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-accent-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${
                    pathname === link.href
                      ? 'text-primary-600'
                      : 'text-accent-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-accent-200">
                {walletAddress ? (
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="font-semibold text-accent-900">
                        {balance ? `${balance} XLM` : 'Loading...'}
                      </div>
                      <div className="text-xs text-accent-500">
                        {truncateAddress(walletAddress)}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDisconnect}
                      className="w-full"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleConnectWallet}
                    loading={loading}
                    className="w-full"
                  >
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

