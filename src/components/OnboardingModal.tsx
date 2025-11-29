'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPersona } from '@/contexts/WalletContext';
import { Users, Briefcase, Heart, Sparkles } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (persona: UserPersona) => void;
}

const personaOptions = [
  {
    value: 'individual' as UserPersona,
    icon: Users,
    title: 'Individual',
    subtitle: 'Friends & Family',
    description: 'Share crypto with your loved ones and discover drops nearby',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    value: 'business' as UserPersona,
    icon: Briefcase,
    title: 'Business',
    subtitle: 'Targeting Customers',
    description: 'Promote your business with location-based crypto rewards',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    value: 'nonprofit' as UserPersona,
    icon: Heart,
    title: 'Non-Profit',
    subtitle: 'Education/Charity',
    description: 'Distribute educational rewards and charitable donations',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    value: 'other' as UserPersona,
    icon: Sparkles,
    title: 'Other',
    subtitle: 'Explorer',
    description: 'Just exploring and discovering what StellarGo has to offer',
    gradient: 'from-orange-500 to-yellow-500',
  },
];

export default function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const [selectedPersona, setSelectedPersona] = useState<UserPersona | null>(null);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (selectedPersona) {
      onComplete(selectedPersona);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-4xl glass-card rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3 gradient-text">
                Welcome to StellarGo! 🚀
              </h2>
              <p className="text-lg text-slate-600">
                Let's personalize your experience. How will you be using StellarGo?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {personaOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedPersona === option.value;

                return (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPersona(option.value)}
                    className={`
                      relative p-6 rounded-xl text-left transition-all
                      ${isSelected
                        ? 'bg-white border-2 border-stellar-500 shadow-lg'
                        : 'bg-white/50 border-2 border-transparent hover:border-slate-300'
                      }
                    `}
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${option.gradient} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {option.title}
                    </h3>
                    <p className="text-sm font-medium text-stellar-600 mb-2">
                      {option.subtitle}
                    </p>
                    <p className="text-sm text-slate-600">
                      {option.description}
                    </p>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-stellar-500 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                disabled={!selectedPersona}
                className={`
                  px-8 py-3 rounded-xl font-semibold text-white transition-all
                  ${selectedPersona
                    ? 'bg-gradient-to-r from-stellar-600 to-trustBlue-600 hover:shadow-lg'
                    : 'bg-slate-300 cursor-not-allowed'
                  }
                `}
              >
                Continue to Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

