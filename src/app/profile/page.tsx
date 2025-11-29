'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { UserType } from '@/components/Onboarding';

interface UserProfile {
  username: string;
  userType: UserType;
  bio: string;
  totalDrops: number;
  totalClaimed: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  requirement?: number;
}

const ProfilePage: React.FC = () => {
  const { walletAddress, balance, connectWallet, isConnecting, disconnectWallet } = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    username: 'CryptoExplorer',
    userType: 'personal',
    bio: 'Love hunting for crypto drops around the city!',
    totalDrops: 15,
    totalClaimed: 42,
  });
  const [editedProfile, setEditedProfile] = useState(profile);

  useEffect(() => {
    if (walletAddress) {
      const storedProfile = localStorage.getItem(`profile_${walletAddress}`);
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        setProfile({ ...profile, ...parsed });
        setEditedProfile({ ...profile, ...parsed });
      }
    }
  }, [walletAddress]);

  const badges: Badge[] = [
    {
      id: 'first-drop',
      name: 'First Drop',
      description: 'Created your first geo-drop',
      icon: '🎯',
      unlocked: true,
    },
    {
      id: 'top-dropper',
      name: 'Top Dropper',
      description: 'Created 10 geo-drops',
      icon: '🏆',
      unlocked: true,
      progress: 15,
      requirement: 10,
    },
    {
      id: 'treasure-hunter',
      name: 'Treasure Hunter',
      description: 'Claimed 25 drops',
      icon: '💎',
      unlocked: true,
      progress: 42,
      requirement: 25,
    },
    {
      id: 'early-adopter',
      name: 'Early Adopter',
      description: 'Joined during beta',
      icon: '🚀',
      unlocked: true,
    },
    {
      id: 'generous',
      name: 'Generous',
      description: 'Drop 100 XLM total',
      icon: '💰',
      unlocked: false,
      progress: 67,
      requirement: 100,
    },
    {
      id: 'explorer',
      name: 'City Explorer',
      description: 'Claim drops in 10 different locations',
      icon: '🗺️',
      unlocked: false,
      progress: 6,
      requirement: 10,
    },
  ];

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    if (walletAddress) {
      localStorage.setItem(`profile_${walletAddress}`, JSON.stringify(editedProfile));
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const getUserTypeLabel = (type: UserType) => {
    switch (type) {
      case 'personal':
        return '👤 Personal User';
      case 'company':
        return '🏢 Company';
      case 'nonprofit':
        return '🎗️ Non-Profit';
      default:
        return 'User';
    }
  };

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
              Connect your wallet to view your profile
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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold">
          Your <span className="text-neon-500">Profile</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Manage your account and view achievements
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-neon-500 to-neon-700 rounded-2xl flex items-center justify-center text-4xl shadow-neon">
                    {profile.userType === 'personal' && '👤'}
                    {profile.userType === 'company' && '🏢'}
                    {profile.userType === 'nonprofit' && '🎗️'}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-100">
                      {isEditing ? (
                        <Input
                          value={editedProfile.username}
                          onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                          className="text-3xl font-bold"
                        />
                      ) : (
                        profile.username
                      )}
                    </h2>
                    <p className="text-gray-400">{getUserTypeLabel(profile.userType)}</p>
                  </div>
                </div>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 text-gray-100 placeholder-gray-500 focus:border-neon-500 focus:outline-none focus:ring-2 focus:ring-neon-500/20 transition-all duration-300 resize-none"
                    rows={3}
                    maxLength={200}
                  />
                ) : (
                  <p className="text-gray-400">{profile.bio}</p>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-3">
                  <Button variant="primary" className="flex-1" onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                  <Button variant="ghost" className="flex-1" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">{profile.totalDrops}</p>
                    <p className="text-sm text-gray-400">Drops Created</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-neon-500">{profile.totalClaimed}</p>
                    <p className="text-sm text-gray-400">Drops Claimed</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-display font-bold">Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <GlassCard
                    padding="sm"
                    className={`text-center ${!badge.unlocked ? 'opacity-50' : ''}`}
                  >
                    <div className={`text-4xl mb-2 ${badge.unlocked ? 'animate-float' : ''}`}>
                      {badge.icon}
                    </div>
                    <h3 className="font-bold text-sm text-gray-100 mb-1">
                      {badge.name}
                    </h3>
                    <p className="text-xs text-gray-400 mb-2">
                      {badge.description}
                    </p>
                    {!badge.unlocked && badge.progress !== undefined && badge.requirement && (
                      <div>
                        <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                          <div
                            className="bg-neon-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(badge.progress / badge.requirement) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          {badge.progress}/{badge.requirement}
                        </p>
                      </div>
                    )}
                    {badge.unlocked && (
                      <div className="text-xs text-neon-500 font-semibold">✓ Unlocked</div>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Wallet Info */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="space-y-4">
              <h3 className="text-xl font-bold">Wallet</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Address</p>
                  <p className="text-sm font-mono text-gray-300 break-all">
                    {walletAddress}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">Balance</p>
                  <p className="text-3xl font-bold text-neon-500">
                    {balance || '0.00'} XLM
                  </p>
                </div>
              </div>

              <Button variant="danger" className="w-full" onClick={disconnectWallet}>
                Disconnect Wallet
              </Button>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="space-y-4">
              <h3 className="text-xl font-bold">Stats</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                  <span className="text-gray-400">Rank</span>
                  <span className="font-bold text-neon-500">#42</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                  <span className="text-gray-400">Member Since</span>
                  <span className="font-bold text-gray-300">Nov 2025</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                  <span className="text-gray-400">Badges Earned</span>
                  <span className="font-bold text-gray-300">
                    {badges.filter(b => b.unlocked).length}/{badges.length}
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

