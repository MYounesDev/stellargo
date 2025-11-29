'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';

export type UserType = 'personal' | 'company' | 'nonprofit';

interface OnboardingProps {
  onComplete: (userType: UserType, username: string) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'type' | 'username'>('type');
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const [username, setUsername] = useState('');

  const userTypes = [
    {
      type: 'personal' as UserType,
      icon: '👤',
      title: 'Personal User',
      description: 'Find and claim crypto drops while exploring your city',
      color: 'neon',
    },
    {
      type: 'company' as UserType,
      icon: '🏢',
      title: 'Company',
      description: 'Drive foot traffic with location-based marketing campaigns',
      color: 'blue',
    },
    {
      type: 'nonprofit' as UserType,
      icon: '🎗️',
      title: 'Non-Profit',
      description: 'Engage communities with event-based token distribution',
      color: 'purple',
    },
  ];

  const handleTypeSelect = (type: UserType) => {
    setSelectedType(type);
    setStep('username');
  };

  const handleComplete = () => {
    if (selectedType && username.trim()) {
      onComplete(selectedType, username.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-900/95 backdrop-blur-lg p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl"
      >
        <GlassCard className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold">
              Welcome to <span className="text-neon-500">StellarGo</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Let's set up your profile
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'type' && (
              <motion.div
                key="type"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-center">Who are you?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {userTypes.map((userType) => (
                    <motion.button
                      key={userType.type}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTypeSelect(userType.type)}
                      className="glass-dark p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 border-2 border-transparent hover:border-neon-500 text-left"
                    >
                      <div className="text-5xl mb-4">{userType.icon}</div>
                      <h4 className="text-xl font-bold mb-2 text-gray-100">
                        {userType.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {userType.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'username' && (
              <motion.div
                key="username"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 max-w-md mx-auto"
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">
                    {userTypes.find(t => t.type === selectedType)?.icon}
                  </div>
                  <h3 className="text-2xl font-bold">Choose your username</h3>
                </div>

                <div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username..."
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border-2 border-white/10 text-gray-100 placeholder-gray-500 focus:border-neon-500 focus:outline-none focus:ring-2 focus:ring-neon-500/20 transition-all duration-300 text-lg"
                    autoFocus
                    maxLength={20}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    {username.length}/20 characters
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    className="flex-1"
                    onClick={() => setStep('type')}
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={handleComplete}
                    disabled={!username.trim()}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Onboarding;

