'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/hooks/useWallet';
import { getAccountBalance } from '@/lib/stellar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import OnboardingModal from '@/components/OnboardingModal';
import { Drop, UserLocation, User } from '@/types';
import { MapPin, Wallet, TrendingUp, Gift, Zap, Activity, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-dark-500 rounded-2xl">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-cyber-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-slate-400">Loading map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const router = useRouter();
  const { publicKey, isConnected, connect } = useWallet();
  const [drops, setDrops] = useState<Drop[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

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
          // Default to Istanbul
          setUserLocation({
            latitude: 41.0082,
            longitude: 28.9784,
          });
        }
      );
    } else {
      // Default to Istanbul
      setUserLocation({
        latitude: 41.0082,
        longitude: 28.9784,
      });
    }

    // Fetch drops
    fetchDrops();
  }, []);

  useEffect(() => {
    if (publicKey && isConnected) {
      fetchBalance(publicKey);
      checkUserProfile(publicKey);
    }
  }, [publicKey, isConnected]);

  const fetchBalance = async (address: string) => {
    try {
      const bal = await getAccountBalance(address);
      setBalance(parseFloat(bal).toFixed(2));
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('0.00');
    }
  };

  const checkUserProfile = async (address: string) => {
    try {
      const response = await fetch(`/api/users/${address}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setUser(data.data);
      } else {
        // User doesn't exist, show onboarding
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error('Error checking user profile:', error);
    }
  };

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

  const handleOnboardingComplete = (persona: 'personal' | 'business' | 'nonprofit') => {
    setShowOnboarding(false);
    // Refresh user profile
    if (publicKey) {
      checkUserProfile(publicKey);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    // This is for when user clicks on an existing drop marker
    // Empty location clicks are handled by MapView's popup
  };

  const handleDropHere = (lat: number, lng: number) => {
    // Redirect to transfer page with coordinates
    router.push(`/app/transfer?lat=${lat}&lng=${lng}&mode=geodrop`);
  };

  const handleClaimDrop = async (drop: Drop) => {
    if (!publicKey || !userLocation) {
      alert('Please connect your wallet and enable location');
      return;
    }

    try {
      // Import smart contract integration
      const { claimDropWithFreighter } = await import('@/lib/soroban');
      
      console.log('🎯 Claiming drop on-chain...');
      
      // First, call the smart contract to claim the drop
      // This requires user signature via Freighter
      const txHash = await claimDropWithFreighter(
        parseInt(drop._id || '0'), // Drop ID from database maps to on-chain ID
        publicKey
      );
      
      console.log('✅ Drop claimed on-chain! TX:', txHash);
      
      // Then, update the backend database with the claim
      const response = await fetch(`/api/drops/${drop._id}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPublicKey: publicKey,
          userLatitude: userLocation.latitude,
          userLongitude: userLocation.longitude,
          transactionHash: txHash, // Include the on-chain transaction hash
        }),
      });

      const result = await response.json();

      if (result.success) {
        await fetchDrops();
        if (publicKey) {
          await fetchBalance(publicKey);
        }
        alert(`✅ Successfully claimed ${drop.amount} XLM!\n\nTransaction: ${txHash.substring(0, 8)}...`);
      } else {
        throw new Error(result.error || 'Failed to update claim in database');
      }
    } catch (error: any) {
      console.error('❌ Error claiming drop:', error);
      
      // Provide helpful error messages
      if (error.message?.includes('User declined')) {
        alert('You cancelled the transaction in Freighter wallet.');
      } else if (error.message?.includes('already claimed')) {
        alert('This drop has already been claimed.');
      } else if (error.message?.includes('not within range')) {
        alert('You need to be within 50 meters of the drop to claim it.');
      } else {
        alert(`Failed to claim drop: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const stats = [
    {
      label: 'Available Drops',
      value: drops.filter(d => !d.claimed).length,
      icon: Gift,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400'
    },
    {
      label: 'Total Value',
      value: `${drops.filter(d => !d.claimed).reduce((sum, d) => sum + d.amount, 0).toFixed(1)} XLM`,
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-400'
    },
    {
      label: 'Nearby',
      value: drops.filter(d => !d.claimed).length > 0 ? Math.floor(Math.random() * 5) + 1 : 0,
      icon: MapPin,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-400'
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950 bg-animated pt-16 md:pt-20 pb-20 md:pb-4">
      {/* Mobile: Full Screen Map Mode */}
      <div className="md:hidden fixed inset-0 pt-16 pb-20 z-10">
        <Card padding="none" className="h-full overflow-hidden relative">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-4 border-cyber-500 border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-slate-400">Loading drops...</p>
              </div>
            </div>
          ) : (
            <>
              <MapView
                drops={drops}
                userLocation={userLocation}
                mode="map"
                onMapClick={handleMapClick}
                onClaimDrop={handleClaimDrop}
                onDropHere={handleDropHere}
              />
              {/* Map Overlay Info - Mobile */}
              <div className="absolute top-4 left-4 right-4 z-[1000] pointer-events-none">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="glass-dark rounded-xl px-3 py-2 pointer-events-auto">
                      <p className="text-xs text-slate-400">Drops</p>
                      <p className="text-xl font-bold text-white">{drops.filter(d => !d.claimed).length}</p>
                    </div>
                    {isConnected && balance && (
                      <div className="glass-dark rounded-xl px-3 py-2 pointer-events-auto">
                        <p className="text-xs text-slate-400">Balance</p>
                        <p className="text-sm font-bold text-cyber-500">{balance} XLM</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Quick Actions - Mobile Floating Button */}
              {isConnected && (
                <div className="absolute bottom-4 right-4 z-[1000] pointer-events-auto">
                  <button
                    onClick={() => router.push(`/app/transfer?mode=geodrop`)}
                    className="w-14 h-14 bg-gradient-to-br from-cyber-500 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-cyber-500/50 hover:scale-110 transition-transform"
                  >
                    <MapPin className="w-6 h-6 text-dark-500" />
                  </button>
                </div>
              )}
            </>
          )}
        </Card>
      </div>

      {/* Desktop: Original Layout */}
      <div className="hidden md:block h-[calc(100vh-5rem)] px-4 md:px-6 py-4 md:py-6">
        <div className="max-w-[1600px] mx-auto h-full">
          {/* Welcome Banner */}
          {isConnected && user && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Card className="bg-gradient-to-r from-cyber-500/20 via-cyan-500/10 to-transparent border-l-4 border-cyber-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyber-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-dark-500" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Welcome back, {user.username || 'Explorer'}!
                      </h2>
                      <p className="text-slate-400 text-sm">
                        Level {user.level} • {drops.filter(d => !d.claimed).length} drops waiting to be claimed
                      </p>
                    </div>
                  </div>
                  {balance && (
                    <div className="hidden md:flex items-center space-x-2 glass rounded-xl px-4 py-2">
                      <Wallet className="w-5 h-5 text-cyber-500" />
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{balance}</p>
                        <p className="text-xs text-slate-400">XLM</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 h-[calc(100%-5rem)] lg:h-full">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 space-y-4 lg:max-h-full lg:overflow-y-auto"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card hover className={stat.bgColor}>
                        <div className="flex lg:flex-row flex-col items-center lg:items-start space-y-2 lg:space-y-0 lg:space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-center lg:text-left">
                            <p className={`text-2xl lg:text-3xl font-bold ${stat.textColor}`}>
                              {stat.value}
                            </p>
                            <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <Card>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-cyber-500" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => router.push('/app/transfer?mode=geodrop')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-green-700 rounded-xl hover:bg-green-600 transition-all duration-200 group border border-green-600"
                    disabled={!isConnected}
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-cyber-500" />
                      <span className="text-white font-medium">Create Drop</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-green-300 group-hover:text-cyber-500 group-hover:translate-x-1 transition-all" />
                  </button>
                  
                  <button
                    onClick={() => router.push('/app/history')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-green-700 rounded-xl hover:bg-green-600 transition-all duration-200 group border border-green-600"
                  >
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-cyan-500" />
                      <span className="text-white font-medium">View History</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-green-300 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </Card>

              {/* Connect Wallet Prompt */}
              {!isConnected && (
                <Card className="bg-gradient-to-br from-cyber-500/20 to-cyan-500/10 border-2 border-cyber-500/30">
                  <div className="text-center">
                    <Wallet className="w-12 h-12 text-cyber-500 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">Connect Wallet</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Connect your Freighter wallet to start dropping and claiming crypto
                    </p>
                    <Button variant="primary" onClick={connect} className="w-full">
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Now
                    </Button>
                  </div>
                </Card>
              )}

              {/* How to Use */}
              <Card>
                <h3 className="text-sm font-bold text-white mb-3">How to Use</h3>
                <ol className="text-xs text-slate-400 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-cyber-500/20 text-cyber-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                    <span>Connect your Freighter wallet</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-cyber-500/20 text-cyber-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                    <span>Click on the map to create a drop</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-cyber-500/20 text-cyber-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                    <span>Walk within 50m to claim drops</span>
                  </li>
                </ol>
              </Card>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-9 h-[600px] lg:h-full"
            >
              <Card padding="none" className="h-full overflow-hidden relative">
                {loading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-12 h-12 border-4 border-cyber-500 border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <p className="text-slate-400">Loading drops...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <MapView
                      drops={drops}
                      userLocation={userLocation}
                      mode="map"
                      onMapClick={handleMapClick}
                      onClaimDrop={handleClaimDrop}
                      onDropHere={handleDropHere}
                    />
                    {/* Map Overlay Info */}
                    <div className="absolute top-4 left-4 right-4 z-[1000] pointer-events-none">
                      <div className="flex justify-between items-start">
                        <div className="glass-dark rounded-xl px-4 py-2 pointer-events-auto">
                          <p className="text-xs text-slate-400">Total Drops</p>
                          <p className="text-2xl font-bold text-white">{drops.length}</p>
                        </div>
                        {isConnected && userLocation && (
                          <div className="glass-dark rounded-xl px-4 py-2 pointer-events-auto">
                            <p className="text-xs text-slate-400">Your Location</p>
                            <p className="text-xs text-cyber-500 font-mono">
                              {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && publicKey && (
        <OnboardingModal
          isOpen={showOnboarding}
          onComplete={handleOnboardingComplete}
          publicKey={publicKey}
        />
      )}
    </div>
  );
}
