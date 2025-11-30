'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/hooks/useWallet';
import Card from '@/components/Card';
import { Send, MapPin, Gift, Calendar, ExternalLink } from 'lucide-react';
import { Transaction } from '@/types';

export default function HistoryPage() {
  const router = useRouter();
  const { publicKey, isConnected } = useWallet();
  const [activeTab, setActiveTab] = useState<'sent' | 'drops_placed' | 'drops_claimed'>('sent');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isConnected) {
      router.push('/app/map');
      return;
    }

    fetchTransactions();
  }, [isConnected, publicKey, activeTab, router]);

  const fetchTransactions = async () => {
    if (!publicKey) return;

    setLoading(true);
    try {
      // For MVP, fetch drops created and claimed
      let endpoint = '/api/drops';
      
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.success) {
        const allDrops = data.data;
        
        let filtered: any[] = [];
        
        if (activeTab === 'sent') {
          // Direct transfers - for now, empty
          filtered = [];
        } else if (activeTab === 'drops_placed') {
          filtered = allDrops.filter((drop: any) => drop.createdBy === publicKey);
        } else if (activeTab === 'drops_claimed') {
          filtered = allDrops.filter((drop: any) => drop.claimedBy === publicKey);
        }

        setTransactions(filtered);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const tabs = [
    { id: 'sent' as const, label: 'Sent Directly', icon: Send },
    { id: 'drops_placed' as const, label: 'Geo-Drops Placed', icon: MapPin },
    { id: 'drops_claimed' as const, label: 'Geo-Drops Claimed', icon: Gift }
  ];

  return (
    <div className="min-h-screen bg-dark-950 bg-animated pt-20 md:pt-24 pb-20 md:pb-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Transaction History</h1>
          <p className="text-slate-400">View all your transactions and geo-drops</p>
        </div>

        <Card>
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-6 p-1 glass rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-cyber-500 text-dark-500'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          {loading ? (
            <div className="py-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-500 mx-auto mb-4"></div>
              <p className="text-slate-400">Loading transactions...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'sent' && <Send className="w-8 h-8 text-slate-600" />}
                {activeTab === 'drops_placed' && <MapPin className="w-8 h-8 text-slate-600" />}
                {activeTab === 'drops_claimed' && <Gift className="w-8 h-8 text-slate-600" />}
              </div>
              <p className="text-slate-400 mb-2">No transactions yet</p>
              <p className="text-slate-500 text-sm">
                {activeTab === 'sent' && 'You haven\'t sent any direct transfers'}
                {activeTab === 'drops_placed' && 'You haven\'t created any geo-drops'}
                {activeTab === 'drops_claimed' && 'You haven\'t claimed any geo-drops'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {activeTab === 'drops_placed' && (
                          <MapPin className="w-5 h-5 text-cyber-500" />
                        )}
                        {activeTab === 'drops_claimed' && (
                          <Gift className="w-5 h-5 text-green-500" />
                        )}
                        <span className="font-semibold text-white">
                          {tx.amount} XLM
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          tx.claimed
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {tx.claimed ? 'Claimed' : 'Available'}
                        </span>
                      </div>
                      
                      <p className="text-slate-400 text-sm mb-2">{tx.message}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(tx.createdAt)}</span>
                        </div>
                        
                        {tx.claimedBy && activeTab === 'drops_placed' && (
                          <div className="flex items-center space-x-1">
                            <span>Claimed by:</span>
                            <span className="text-cyber-500">{truncateAddress(tx.claimedBy)}</span>
                          </div>
                        )}
                        
                        {activeTab === 'drops_claimed' && (
                          <div className="flex items-center space-x-1">
                            <span>From:</span>
                            <span className="text-cyber-500">{truncateAddress(tx.createdBy)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-4 text-right">
                      <div className="text-xs text-slate-500 mb-1">Location</div>
                      <div className="text-xs text-slate-400">
                        {tx.location.coordinates[1].toFixed(4)}°, {tx.location.coordinates[0].toFixed(4)}°
                      </div>
                      {tx.transactionHash && (
                        <a
                          href={`https://stellar.expert/explorer/testnet/tx/${tx.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-cyber-500 hover:text-cyber-400 transition-colors text-xs mt-2"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/app/map')}
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Map
          </button>
        </div>
      </div>
    </div>
  );
}

