'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import Modal from '@/components/ui/Modal';

const HomePage: React.FC = () => {
  const [showQA, setShowQA] = useState(false);

  const leaderboard = [
    { rank: 1, name: 'CryptoKing', drops: 234, amount: '1,234 XLM' },
    { rank: 2, name: 'StellarQueen', drops: 189, amount: '987 XLM' },
    { rank: 3, name: 'BlockchainBoss', drops: 156, amount: '856 XLM' },
    { rank: 4, name: 'DeFiMaster', drops: 142, amount: '745 XLM' },
    { rank: 5, name: 'CryptoNinja', drops: 128, amount: '678 XLM' },
  ];

  const features = [
    {
      icon: '🏢',
      title: 'For Companies',
      description: 'Drive foot traffic with location-based crypto marketing campaigns',
    },
    {
      icon: '🎮',
      title: 'For Users',
      description: 'Turn your city into a treasure hunt. Find and claim crypto drops',
    },
    {
      icon: '🎗️',
      title: 'For Non-Profits',
      description: 'Engage communities with event-based token distribution',
    },
  ];

  const faqs = [
    {
      q: 'What is StellarGo?',
      a: 'StellarGo is a location-based crypto platform that brings digital currency to the physical world. Drop and claim crypto at real-world locations.',
    },
    {
      q: 'Why Stellar?',
      a: 'Stellar offers 3-second transactions at $0.00001 cost. This makes gamification economically viable - unlike Ethereum at $5 per transaction.',
    },
    {
      q: 'How do I start?',
      a: 'Connect your Freighter wallet, enable location access, and start dropping or claiming crypto near you!',
    },
    {
      q: 'Is it safe?',
      a: 'Yes! All transactions are secured on the Stellar blockchain. Your location is only used for drop verification.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 py-20"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight">
            Crypto on the{' '}
            <span className="text-neon-500 animate-pulse-slow">Streets</span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
        >
          Not just a tool. A <span className="text-neon-500 font-semibold">Platform</span> for
          location-based SocialFi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link href="/dashboard">
            <Button variant="primary" size="lg">
              Launch App 🚀
            </Button>
          </Link>
          <Button variant="outline" size="lg" onClick={() => setShowQA(true)}>
            Learn More
          </Button>
        </motion.div>

        {/* Animated 3D-style elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mt-16 relative h-64"
        >
          <div className="absolute inset-0 flex items-center justify-center gap-8">
            <motion.div
              className="w-32 h-32 bg-neon-500/20 rounded-2xl shadow-neon-lg"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="w-24 h-24 bg-neon-400/20 rounded-2xl shadow-neon"
              animate={{ rotate: [360, 180, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="w-40 h-40 bg-neon-600/20 rounded-2xl shadow-neon-lg"
              animate={{ rotate: [0, -180, -360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Value Proposition */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center">
          Built For Everyone
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <GlassCard className="h-full">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-neon-500">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Live Leaderboard */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center">
          Most Active Droppers
        </h2>
        <GlassCard>
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                    w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl
                    ${user.rank === 1 ? 'bg-yellow-500 text-dark-900' : ''}
                    ${user.rank === 2 ? 'bg-gray-400 text-dark-900' : ''}
                    ${user.rank === 3 ? 'bg-orange-600 text-white' : ''}
                    ${user.rank > 3 ? 'bg-white/10 text-gray-400' : ''}
                  `}
                  >
                    {user.rank}
                  </div>
                  <div>
                    <div className="font-bold text-gray-100">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.drops} drops</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-neon-500">{user.amount}</div>
                  <div className="text-xs text-gray-400">Total Dropped</div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.section>

      {/* Footer */}
      <footer className="text-center space-y-4 py-12 border-t border-white/10">
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-neon-500 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-neon-500 transition-colors"
          >
            LinkedIn
          </a>
          <Link href="/presentation" className="text-gray-400 hover:text-neon-500 transition-colors">
            Presentation
          </Link>
        </div>
        <p className="text-gray-500 text-sm">
          Built on Stellar Network • StellarGo © 2025
        </p>
      </footer>

      {/* Floating Q&A Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowQA(true)}
        className="fixed bottom-24 md:bottom-8 right-8 w-16 h-16 bg-neon-500 text-dark-900 rounded-full shadow-neon-lg flex items-center justify-center text-2xl font-bold animate-pulse-slow z-40"
      >
        ?
      </motion.button>

      {/* Q&A Modal */}
      <Modal isOpen={showQA} onClose={() => setShowQA(false)} title="Frequently Asked Questions" maxWidth="lg">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-bold text-neon-500">{faq.q}</h3>
              <p className="text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;

