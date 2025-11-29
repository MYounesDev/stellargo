'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { Drop, UserLocation } from '@/types';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center glass rounded-2xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading map...</p>
      </div>
    </div>
  ),
});

type DropFilter = 'all' | 'company' | 'personal' | 'nonprofit';

const MapPage: React.FC = () => {
  const { walletAddress } = useWallet();
  const [drops, setDrops] = useState<Drop[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<DropFilter>('all');

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to New York
          setUserLocation({
            latitude: 40.7128,
            longitude: -74.006,
          });
        }
      );
    } else {
      setUserLocation({
        latitude: 40.7128,
        longitude: -74.006,
      });
    }

    fetchDrops();
  }, []);

  const fetchDrops = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/drops');
      const data = await response.json();
      
      if (data.success) {
        setDrops(data.data);
      }
    } catch (error) {
      console.error('Error fetching drops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimDrop = async (drop: Drop) => {
    if (!walletAddress || !userLocation) {
      alert('Please connect your wallet and enable location');
      return;
    }

    try {
      const response = await fetch(`/api/drops/${drop._id}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPublicKey: walletAddress,
          userLatitude: userLocation.latitude,
          userLongitude: userLocation.longitude,
        }),
      });

      const result = await response.json();

      if (result.success) {
        await fetchDrops();
        alert(`Successfully claimed ${drop.amount} XLM!`);
      } else {
        throw new Error(result.error || 'Failed to claim drop');
      }
    } catch (error: any) {
      console.error('Error claiming drop:', error);
      alert(error.message || 'Failed to claim drop');
    }
  };

  const filters: { value: DropFilter; label: string; icon: string }[] = [
    { value: 'all', label: 'All Drops', icon: '🌐' },
    { value: 'company', label: 'Companies', icon: '🏢' },
    { value: 'personal', label: 'Personal', icon: '👤' },
    { value: 'nonprofit', label: 'Non-Profits', icon: '🎗️' },
  ];

  const filteredDrops = drops.filter((drop) => {
    if (filter === 'all') return true;
    // In a real app, drops would have a type field
    return true;
  });

  const stats = {
    total: filteredDrops.length,
    available: filteredDrops.filter(d => !d.claimed).length,
    claimed: filteredDrops.filter(d => d.claimed).length,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold">
          Explore <span className="text-neon-500">Nearby Drops</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Find and claim crypto drops in your area
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
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

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4"
      >
        <GlassCard padding="sm" className="text-center">
          <p className="text-2xl font-bold text-gray-100">{stats.total}</p>
          <p className="text-sm text-gray-400">Total Drops</p>
        </GlassCard>
        <GlassCard padding="sm" className="text-center">
          <p className="text-2xl font-bold text-neon-500">{stats.available}</p>
          <p className="text-sm text-gray-400">Available</p>
        </GlassCard>
        <GlassCard padding="sm" className="text-center">
          <p className="text-2xl font-bold text-gray-500">{stats.claimed}</p>
          <p className="text-sm text-gray-400">Claimed</p>
        </GlassCard>
      </motion.div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="h-[600px] rounded-2xl overflow-hidden"
      >
        {loading ? (
          <div className="h-full flex items-center justify-center glass rounded-2xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading drops...</p>
            </div>
          </div>
        ) : (
          <div className="h-full glass rounded-2xl overflow-hidden">
            <MapView
              drops={filteredDrops}
              userLocation={userLocation}
              onMapClick={() => {}}
              onClaimDrop={handleClaimDrop}
            />
          </div>
        )}
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard padding="sm">
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-neon-500 rounded-full shadow-neon"></div>
              <span className="text-gray-400">Available Drop</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
              <span className="text-gray-400">Claimed Drop</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400">Your Location</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default MapPage;

