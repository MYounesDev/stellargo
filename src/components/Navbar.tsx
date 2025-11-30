'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWallet } from '@/hooks/useWallet';
import { getAccountBalance } from '@/lib/stellar';
import Button from './Button';
import { 
  Home, 
  Send, 
  History, 
  User, 
  HelpCircle, 
  Menu, 
  X,
  Wallet,
  Maximize,
  Minimize
} from 'lucide-react';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { publicKey, isConnected, isLoading, error, connect, disconnect } = useWallet();
  const [balance, setBalance] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (publicKey) {
      fetchBalance(publicKey);
    } else {
      setBalance(null);
    }
  }, [publicKey]);

  // Check fullscreen status
  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', checkFullscreen);
    return () => document.removeEventListener('fullscreenchange', checkFullscreen);
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

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (error: any) {
      // Error is stored in hook state and displayed in UI
      console.error('Connection error:', error);
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const desktopNavLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/app/transfer', label: 'Transfer', icon: Send },
    { href: '/app/history', label: 'History', icon: History },
    { href: '/app/profile', label: 'Profile', icon: User },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
  ];

  const mobileNavLinks = [
    { href: '/app/map', label: 'Map', icon: Home },
    { href: '/app/transfer', label: 'Transfer', icon: Send },
    { href: '/app/history', label: 'History', icon: History },
    { href: '/app/profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Navbar - Fixed Top */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-40 glass-dark border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <img src="/logo.png" alt="StellarGo Logo" className="w-10 h-10 rounded-xl shadow-lg group-hover:shadow-cyber-500/50 transition-all duration-300" />
              <span className="text-xl font-bold text-gradient">StellarGo</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-6">
              {desktopNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-cyber-500/10 text-cyber-500'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    } ${link.label === 'FAQ' ? 'pulse-glow' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Wallet Section */}
            <div className="flex items-center space-x-4">
              {isConnected && publicKey ? (
                <div className="flex items-center space-x-3">
                  <div className="glass rounded-xl px-4 py-2">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">
                        {balance ? `${balance} XLM` : 'Loading...'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {truncateAddress(publicKey)}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={disconnect}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleConnectWallet}
                  loading={isLoading}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-40 glass-dark border-b border-slate-800/50">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="StellarGo Logo" className="w-9 h-9 rounded-lg" />
              <span className="text-lg font-bold text-gradient">StellarGo</span>
            </Link>

            {/* Right Side: Balance, Fullscreen, Menu */}
            <div className="flex items-center space-x-2">
              {isConnected && publicKey && balance && (
                <div className="text-right mr-2">
                  <div className="text-xs font-semibold text-white">
                    {balance} XLM
                  </div>
                </div>
              )}
              
              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-2 text-green-300 hover:text-white transition-colors rounded-lg bg-green-900/60 hover:bg-green-800/80"
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>

              {/* Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-green-300 hover:text-white transition-colors rounded-lg bg-green-900/60 hover:bg-green-800/80"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="py-4 border-t border-slate-800 animate-slide-down">
              <div className="space-y-2">
                {!isConnected ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleConnectWallet}
                    loading={isLoading}
                    className="w-full mb-3"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                ) : (
                  <div className="mb-3 glass rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {balance} XLM
                        </div>
                        <div className="text-xs text-slate-400">
                          {truncateAddress(publicKey!)}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={disconnect}>
                        Disconnect
                      </Button>
                    </div>
                  </div>
                )}
                
                <Link
                  href="/faq"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>FAQ</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-dark border-t border-slate-800/50 pb-safe">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {mobileNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-cyber-500/10 text-cyber-500'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
