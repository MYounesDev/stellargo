'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Heart, ArrowRight } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (persona: 'personal' | 'business' | 'nonprofit') => void;
  publicKey: string;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete, publicKey }) => {
  const [selectedPersona, setSelectedPersona] = useState<'personal' | 'business' | 'nonprofit' | null>(null);
  const [loading, setLoading] = useState(false);

  const personas = [
    {
      value: 'personal' as const,
      icon: Users,
      title: 'Personal User',
      description: 'Share crypto with friends, create treasure hunts, or discover drops near you',
      color: 'from-cyber-500 to-green-500'
    },
    {
      value: 'business' as const,
      icon: Briefcase,
      title: 'Business / Merchant',
      description: 'Reward customers, drive foot traffic, and create engaging marketing campaigns',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      value: 'nonprofit' as const,
      icon: Heart,
      title: 'Non-Profit / Charity',
      description: 'Distribute aid directly, create fundraising events, and engage your community',
      color: 'from-pink-500 to-purple-500'
    }
  ];

  const handleSubmit = async () => {
    if (!selectedPersona) return;

    setLoading(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicKey,
          persona: selectedPersona,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        onComplete(selectedPersona);
      } else {
        throw new Error(data.error || 'Failed to create user profile');
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
      alert('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} size="lg">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-20 h-20 bg-gradient-to-br from-cyber-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <span className="text-3xl">👋</span>
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome to StellarGo!</h2>
        <p className="text-slate-400">Tell us who you are to get started</p>
      </div>

      <div className="space-y-4 mb-8">
        {personas.map((persona, index) => {
          const Icon = persona.icon;
          const isSelected = selectedPersona === persona.value;
          
          return (
            <motion.button
              key={persona.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPersona(persona.value)}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-cyber-500 bg-cyber-500/10'
                  : 'border-slate-700 hover:border-slate-600 bg-transparent'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${persona.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{persona.title}</h3>
                  <p className="text-sm text-slate-400">{persona.description}</p>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-cyber-500 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-dark-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleSubmit}
        disabled={!selectedPersona}
        loading={loading}
      >
        Continue
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>

      <p className="text-slate-500 text-xs text-center mt-4">
        You can update this later in your profile settings
      </p>
    </Modal>
  );
};

export default OnboardingModal;

