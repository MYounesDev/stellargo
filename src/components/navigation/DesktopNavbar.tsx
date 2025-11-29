'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useWallet } from '@/contexts/WalletContext';

const DesktopNavbar: React.FC = () => {
  const pathname = usePathname();
  const { walletAddress, balance, isConnecting, connectWallet, disconnectWallet } = useWallet();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/map', label: 'Map', icon: '🗺️' },
    { href: '/transfer', label: 'Transfer', icon: '💸' },
    { href: '/history', label: 'History', icon: '📜' },
    { href: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl hidden md:block"
    >
      <div className="glass rounded-2xl px-6 py-4 shadow-glass">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-neon-500 rounded-xl flex items-center justify-center shadow-neon group-hover:shadow-neon-lg transition-all duration-300">
              <span className="text-dark-900 font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-display font-bold text-gray-100">
              Stellar<span className="text-neon-500">Go</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300
                    ${
                      isActive
                        ? 'bg-neon-500 text-dark-900 shadow-neon'
                        : 'text-gray-300 hover:bg-white/10 hover:text-neon-500'
                    }
                  `}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Wallet Section */}
          <div className="flex items-center gap-4">
            {walletAddress ? (
              <>
                <div className="glass-dark px-4 py-2.5 rounded-xl">
                  <div className="text-right">
                    <div className="text-sm font-bold text-neon-500">
                      {balance ? `${balance} XLM` : 'Loading...'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {truncateAddress(walletAddress)}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={disconnectWallet}>
                  Disconnect
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={connectWallet}
                loading={isConnecting}
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default DesktopNavbar;

