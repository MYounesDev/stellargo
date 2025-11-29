'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const MobileTabBar: React.FC = () => {
  const pathname = usePathname();

  const tabs = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/map', label: 'Map', icon: '🗺️' },
    { href: '/transfer', label: 'Drop', icon: '💸' },
    { href: '/history', label: 'History', icon: '📜' },
    { href: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md md:hidden"
    >
      <div className="glass rounded-2xl px-3 py-3 shadow-glass">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center gap-1 flex-1"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300
                    ${
                      isActive
                        ? 'bg-neon-500 shadow-neon'
                        : 'bg-white/5 text-gray-400'
                    }
                  `}
                >
                  {tab.icon}
                </motion.div>
                <span
                  className={`
                    text-xs font-semibold transition-colors duration-300
                    ${isActive ? 'text-neon-500' : 'text-gray-500'}
                  `}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default MobileTabBar;

