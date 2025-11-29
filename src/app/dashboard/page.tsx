'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import Onboarding, { UserType } from '@/components/Onboarding';
import Link from 'next/link';

interface UserProfile {
  username: string;
  userType: UserType;
  totalDrops: number;
  totalClaimed: number;
}

const DashboardPage: React.FC = () => {
  const { walletAddress, balance, connectWallet, isConnecting } = useWallet();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState({
    activeDrops: 12,
    todayClaims: 3,
    weeklyActivity: 18,
  });

  useEffect(() => {
    if (walletAddress) {
      // Check if user has completed onboarding
      const storedProfile = localStorage.getItem(`profile_${walletAddress}`);
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      } else {
        setShowOnboarding(true);
      }
    }
  }, [walletAddress]);

  const handleOnboardingComplete = (userType: UserType, username: string) => {
    const profile: UserProfile = {
      username,
      userType,
      totalDrops: 0,
      totalClaimed: 0,
    };
    setUserProfile(profile);
    if (walletAddress) {
      localStorage.setItem(`profile_${walletAddress}`, JSON.stringify(profile));
    }
    setShowOnboarding(false);
  };

  const quickActions = [
    {
      title: 'Create Drop',
      description: 'Drop crypto at a location',
      icon: '💸',
      href: '/transfer',
      color: 'neon',
    },
    {
      title: 'View Map',
      description: 'Find nearby drops',
      icon: '🗺️',
      href: '/map',
      color: 'blue',
    },
    {
      title: 'History',
      description: 'View your transactions',
      icon: '📜',
      href: '/history',
      color: 'purple',
    },
  ];

  const recentActivity = [
    { type: 'claim', amount: '5 XLM', location: 'Central Park', time: '2 hours ago' },
    { type: 'drop', amount: '10 XLM', location: 'Coffee Shop', time: '5 hours ago' },
    { type: 'claim', amount: '3 XLM', location: 'Library', time: '1 day ago' },
  ];

  if (!walletAddress) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 py-20"
        >
          <GlassCard>
            <div className="text-6xl mb-6">🔐</div>
            <h2 className="text-3xl font-display font-bold mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-gray-400 mb-8">
              Connect your Stellar wallet to access the dashboard
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={connectWallet}
              loading={isConnecting}
            >
              Connect Wallet
            </Button>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold">
          Welcome back, <span className="text-neon-500">{userProfile?.username}</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Here's what's happening with your account
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm font-semibold">Balance</p>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-3xl font-bold text-neon-500">{balance || '0.00'} XLM</p>
            <p className="text-xs text-gray-500">Available to drop</p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm font-semibold">Active Drops</p>
              <span className="text-2xl">📍</span>
            </div>
            <p className="text-3xl font-bold text-blue-500">{stats.activeDrops}</p>
            <p className="text-xs text-gray-500">Unclaimed drops nearby</p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm font-semibold">Today's Claims</p>
              <span className="text-2xl">🎯</span>
            </div>
            <p className="text-3xl font-bold text-purple-500">{stats.todayClaims}</p>
            <p className="text-xs text-gray-500">Claims in last 24h</p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm font-semibold">Weekly Activity</p>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-3xl font-bold text-orange-500">{stats.weeklyActivity}</p>
            <p className="text-xs text-gray-500">Total actions this week</p>
          </GlassCard>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-display font-bold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GlassCard hover className="cursor-pointer h-full">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{action.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-100">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-400">{action.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold">Recent Activity</h2>
          <Link href="/history">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <GlassCard>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                    ${activity.type === 'claim' ? 'bg-neon-500/20' : 'bg-blue-500/20'}
                  `}
                  >
                    {activity.type === 'claim' ? '📥' : '📤'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-100">
                      {activity.type === 'claim' ? 'Claimed' : 'Dropped'} {activity.amount}
                    </p>
                    <p className="text-sm text-gray-400">{activity.location}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default DashboardPage;

