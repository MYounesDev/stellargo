'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

type TransactionType = 'all' | 'drops' | 'claims' | 'transfers';

interface Transaction {
  id: string;
  type: 'drop' | 'claim' | 'transfer-sent' | 'transfer-received';
  amount: string;
  location?: string;
  address?: string;
  message?: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

const HistoryPage: React.FC = () => {
  const { walletAddress, connectWallet, isConnecting } = useWallet();
  const [filter, setFilter] = useState<TransactionType>('all');

  // Mock data - in production, fetch from API
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'claim',
      amount: '5.00',
      location: 'Central Park, NY',
      message: 'Welcome to the park!',
      timestamp: '2025-11-29T10:30:00',
      status: 'completed',
    },
    {
      id: '2',
      type: 'drop',
      amount: '10.00',
      location: 'Coffee Shop',
      message: 'Free coffee crypto!',
      timestamp: '2025-11-28T15:45:00',
      status: 'completed',
    },
    {
      id: '3',
      type: 'transfer-sent',
      amount: '25.00',
      address: 'GBCD...XY12',
      message: 'Payment for services',
      timestamp: '2025-11-27T09:15:00',
      status: 'completed',
    },
    {
      id: '4',
      type: 'claim',
      amount: '3.50',
      location: 'Public Library',
      message: 'Knowledge is wealth',
      timestamp: '2025-11-26T14:20:00',
      status: 'completed',
    },
    {
      id: '5',
      type: 'transfer-received',
      amount: '50.00',
      address: 'GDEF...AB34',
      message: 'Thanks!',
      timestamp: '2025-11-25T11:00:00',
      status: 'completed',
    },
    {
      id: '6',
      type: 'drop',
      amount: '8.00',
      location: 'Times Square',
      message: 'Happy holidays!',
      timestamp: '2025-11-24T18:30:00',
      status: 'completed',
    },
  ];

  const filters = [
    { value: 'all' as TransactionType, label: 'All', icon: '📊' },
    { value: 'drops' as TransactionType, label: 'My Drops', icon: '📤' },
    { value: 'claims' as TransactionType, label: 'Claims', icon: '📥' },
    { value: 'transfers' as TransactionType, label: 'Transfers', icon: '💸' },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'all') return true;
    if (filter === 'drops') return tx.type === 'drop';
    if (filter === 'claims') return tx.type === 'claim';
    if (filter === 'transfers') return tx.type === 'transfer-sent' || tx.type === 'transfer-received';
    return true;
  });

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'drop':
        return '📤';
      case 'claim':
        return '📥';
      case 'transfer-sent':
        return '↗️';
      case 'transfer-received':
        return '↙️';
      default:
        return '💰';
    }
  };

  const getTransactionLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'drop':
        return 'Geo-Drop Created';
      case 'claim':
        return 'Claimed Drop';
      case 'transfer-sent':
        return 'Transfer Sent';
      case 'transfer-received':
        return 'Transfer Received';
      default:
        return 'Transaction';
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'drop':
        return 'bg-blue-500/20 text-blue-400';
      case 'claim':
        return 'bg-neon-500/20 text-neon-400';
      case 'transfer-sent':
        return 'bg-orange-500/20 text-orange-400';
      case 'transfer-received':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const stats = {
    totalTransactions: transactions.length,
    totalDrops: transactions.filter(t => t.type === 'drop').length,
    totalClaims: transactions.filter(t => t.type === 'claim').length,
    totalTransfers: transactions.filter(t => t.type === 'transfer-sent' || t.type === 'transfer-received').length,
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
              Connect your wallet to view transaction history
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
          Transaction <span className="text-neon-500">History</span>
        </h1>
        <p className="text-gray-400 text-lg">
          View all your drops, claims, and transfers
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <GlassCard padding="sm" className="text-center">
          <p className="text-2xl font-bold text-gray-100">{stats.totalTransactions}</p>
          <p className="text-sm text-gray-400">Total</p>
        </GlassCard>
        <GlassCard padding="sm" className="text-center">
          <p className="text-2xl font-bold text-blue-400">{stats.totalDrops}</p>
          <p className="text-sm text-gray-400">Drops</p>
        </GlassCard>
        <GlassCard padding="sm" className="text-center">
          <p className="text-2xl font-bold text-neon-500">{stats.totalClaims}</p>
          <p className="text-sm text-gray-400">Claims</p>
        </GlassCard>
        <GlassCard padding="sm" className="text-center">
          <p className="text-2xl font-bold text-purple-400">{stats.totalTransfers}</p>
          <p className="text-sm text-gray-400">Transfers</p>
        </GlassCard>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard padding="sm">
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter(f.value)}
              >
                <span className="mr-2">{f.icon}</span>
                {f.label}
              </Button>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredTransactions.length === 0 ? (
          <GlassCard className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-300 mb-2">No transactions yet</h3>
            <p className="text-gray-500">Start dropping or claiming crypto!</p>
          </GlassCard>
        ) : (
          filteredTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard hover className="cursor-pointer">
                <div className="flex items-center justify-between gap-4">
                  {/* Left: Icon & Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${getTransactionColor(tx.type)}`}>
                      {getTransactionIcon(tx.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-100">
                        {getTransactionLabel(tx.type)}
                      </p>
                      <p className="text-sm text-gray-400">
                        {tx.location || tx.address || 'N/A'}
                      </p>
                      {tx.message && (
                        <p className="text-sm text-gray-500 italic mt-1">
                          "{tx.message}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Amount & Time */}
                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      tx.type === 'transfer-received' || tx.type === 'claim'
                        ? 'text-neon-500'
                        : 'text-gray-100'
                    }`}>
                      {tx.type === 'transfer-received' || tx.type === 'claim' ? '+' : '-'}
                      {tx.amount} XLM
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(tx.timestamp)}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default HistoryPage;

