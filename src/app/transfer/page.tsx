'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import dynamic from 'next/dynamic';
import { UserLocation } from '@/types';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

type Tab = 'direct' | 'geodrop';
type Audience = 'public' | 'friends' | 'students';

const TransferPage: React.FC = () => {
  const { walletAddress, balance, connectWallet, isConnecting } = useWallet();
  const [activeTab, setActiveTab] = useState<Tab>('geodrop');
  
  // Direct Transfer State
  const [recipientAddress, setRecipientAddress] = useState('');
  const [directAmount, setDirectAmount] = useState('');
  const [directMemo, setDirectMemo] = useState('');
  
  // Geo-Drop State
  const [selectedLocation, setSelectedLocation] = useState<UserLocation | null>(null);
  const [dropAmount, setDropAmount] = useState('');
  const [dropMessage, setDropMessage] = useState('');
  const [audience, setAudience] = useState<Audience>('public');
  const [expiryDate, setExpiryDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const tabs = [
    { id: 'geodrop' as Tab, label: 'Geo-Drop', icon: '📍' },
    { id: 'direct' as Tab, label: 'Direct Transfer', icon: '💸' },
  ];

  const audienceOptions = [
    { value: 'public' as Audience, label: 'Public', description: 'Anyone can claim' },
    { value: 'friends' as Audience, label: 'Friends Only', description: 'Only your friends' },
    { value: 'students' as Audience, label: 'Students', description: 'Verified students only' },
  ];

  const handleDirectTransfer = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet');
      return;
    }

    if (!recipientAddress || !directAmount) {
      alert('Please fill in all fields');
      return;
    }

    // In production, implement actual transfer logic
    alert(`Transfer ${directAmount} XLM to ${recipientAddress.slice(0, 10)}...`);
  };

  const handleGeoDrop = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet');
      return;
    }

    if (!selectedLocation || !dropAmount) {
      alert('Please select location and enter amount');
      return;
    }

    try {
      const response = await fetch('/api/drops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          amount: dropAmount,
          message: dropMessage,
          createdBy: walletAddress,
          audience,
          expiryDate: expiryDate || null,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Drop created successfully!');
        // Reset form
        setDropAmount('');
        setDropMessage('');
        setSelectedLocation(null);
      } else {
        throw new Error(result.error || 'Failed to create drop');
      }
    } catch (error: any) {
      console.error('Error creating drop:', error);
      alert(error.message || 'Failed to create drop');
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
              Connect your wallet to start transferring crypto
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
          Transfer <span className="text-neon-500">Crypto</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Send directly or drop at a location
        </p>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard padding="sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Available Balance</p>
              <p className="text-3xl font-bold text-neon-500">{balance || '0.00'} XLM</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard padding="sm">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300
                  ${
                    activeTab === tab.id
                      ? 'bg-neon-500 text-dark-900 shadow-neon'
                      : 'text-gray-400 hover:bg-white/5'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'direct' && (
          <motion.div
            key="direct"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className="space-y-6">
              <h2 className="text-2xl font-bold">Direct Transfer</h2>
              
              <Input
                label="Recipient Address"
                placeholder="G..."
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                icon={<span>👤</span>}
              />
              
              <Input
                label="Amount (XLM)"
                type="number"
                placeholder="0.00"
                value={directAmount}
                onChange={(e) => setDirectAmount(e.target.value)}
                icon={<span>💰</span>}
              />
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Memo (Optional)
                </label>
                <textarea
                  value={directMemo}
                  onChange={(e) => setDirectMemo(e.target.value)}
                  placeholder="Add a message..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 text-gray-100 placeholder-gray-500 focus:border-neon-500 focus:outline-none focus:ring-2 focus:ring-neon-500/20 transition-all duration-300 resize-none"
                  rows={3}
                />
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={handleDirectTransfer}
                disabled={!recipientAddress || !directAmount}
              >
                Send Transfer
              </Button>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === 'geodrop' && (
          <motion.div
            key="geodrop"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <GlassCard className="space-y-6">
              <h2 className="text-2xl font-bold">Create Geo-Drop</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Select Location on Map
                </label>
                <div className="h-[300px] rounded-xl overflow-hidden glass">
                  <MapView
                    drops={[]}
                    userLocation={selectedLocation}
                    onMapClick={(lat, lng) => setSelectedLocation({ latitude: lat, longitude: lng })}
                    onClaimDrop={() => {}}
                  />
                </div>
                {selectedLocation && (
                  <p className="mt-2 text-sm text-neon-500">
                    Selected: {selectedLocation.latitude.toFixed(6)}, {selectedLocation.longitude.toFixed(6)}
                  </p>
                )}
              </div>
              
              <Input
                label="Amount (XLM)"
                type="number"
                placeholder="0.00"
                value={dropAmount}
                onChange={(e) => setDropAmount(e.target.value)}
                icon={<span>💰</span>}
              />
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={dropMessage}
                  onChange={(e) => setDropMessage(e.target.value)}
                  placeholder="Add a message for the finder..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 text-gray-100 placeholder-gray-500 focus:border-neon-500 focus:outline-none focus:ring-2 focus:ring-neon-500/20 transition-all duration-300 resize-none"
                  rows={3}
                />
              </div>

              {/* Advanced Settings */}
              <div>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-neon-500 hover:text-neon-400 transition-colors"
                >
                  <span>{showAdvanced ? '▼' : '▶'}</span>
                  Advanced Settings
                </button>
                
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Who can claim?
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {audienceOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setAudience(option.value)}
                            className={`
                              p-4 rounded-xl text-left transition-all duration-300
                              ${
                                audience === option.value
                                  ? 'bg-neon-500/20 border-2 border-neon-500'
                                  : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
                              }
                            `}
                          >
                            <p className="font-bold text-gray-100">{option.label}</p>
                            <p className="text-xs text-gray-400">{option.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <Input
                      label="Expiry Date (Optional)"
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </motion.div>
                )}
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={handleGeoDrop}
                disabled={!selectedLocation || !dropAmount}
              >
                Create Drop
              </Button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransferPage;

