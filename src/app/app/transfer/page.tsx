'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWallet } from '@/hooks/useWallet';
import Button from '@/components/Button';
import Card from '@/components/Card';
import dynamic from 'next/dynamic';
import { Send, MapPin, Users, Clock, Target, Wallet } from 'lucide-react';
import { Drop, UserLocation } from '@/types';

// Dynamically import MapView
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
});

function TransferContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { publicKey, isConnected } = useWallet();
  
  const [activeTab, setActiveTab] = useState<'direct' | 'geodrop'>('direct');
  const [loading, setLoading] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  // Direct Transfer State
  const [recipientAddress, setRecipientAddress] = useState('');
  const [directAmount, setDirectAmount] = useState('');
  const [directMemo, setDirectMemo] = useState('');

  // Geo-Drop State
  const [dropAmount, setDropAmount] = useState('');
  const [dropMessage, setDropMessage] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [targetAudience, setTargetAudience] = useState<'public' | 'friends' | 'customers'>('public');
  const [expirationHours, setExpirationHours] = useState('24');

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
          setUserLocation({
            latitude: 41.0082,
            longitude: 28.9784,
          });
        }
      );
    } else {
      setUserLocation({
        latitude: 41.0082,
        longitude: 28.9784,
      });
    }

    // Fetch drops
    fetch('/api/drops')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDrops(data.data);
        }
      })
      .catch(err => console.error('Error fetching drops:', err));
  }, []);

  useEffect(() => {
    // Check URL params for mode and location first
    const mode = searchParams.get('mode');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (mode === 'geodrop') {
      setActiveTab('geodrop');
    }

    if (lat && lng) {
      setLatitude(lat);
      setLongitude(lng);
    } else {
      // Get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude.toString());
            setLongitude(position.coords.longitude.toString());
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    }
  }, [searchParams]);

  const handleDirectTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) return;

    setLoading(true);
    try {
      // TODO: Implement actual Stellar payment transaction
      // For now, just simulate
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Successfully sent ${directAmount} XLM to ${recipientAddress}`);
      setRecipientAddress('');
      setDirectAmount('');
      setDirectMemo('');
    } catch (error: any) {
      console.error('Transfer error:', error);
      alert(error.message || 'Failed to send transfer');
    } finally {
      setLoading(false);
    }
  };

  const handleGeoDrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey || !latitude || !longitude) return;

    setLoading(true);
    try {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + parseInt(expirationHours));

      const response = await fetch('/api/drops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          amount: parseFloat(dropAmount),
          message: dropMessage,
          createdBy: publicKey,
          targetAudience,
          expiresAt: expirationHours !== 'never' ? expiresAt : null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Geo-Drop created successfully!');
        router.push('/app/map');
      } else {
        throw new Error(data.error || 'Failed to create drop');
      }
    } catch (error: any) {
      console.error('Drop creation error:', error);
      alert(error.message || 'Failed to create drop');
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    // In transfer mode, clicking empty point selects it directly
    setLatitude(lat.toString());
    setLongitude(lng.toString());
    setActiveTab('geodrop'); // Switch to geodrop tab
  };

  const handleClaimDrop = async (drop: Drop) => {
    // Not used in transfer page, but required by MapView
  };

  // Show connect wallet prompt if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-dark-950 bg-animated pt-20 md:pt-24 pb-20 md:pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="text-center py-12">
            <Wallet className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Wallet Not Connected</h2>
            <p className="text-slate-400 mb-6">
              Please connect your wallet to send crypto
            </p>
            <Button variant="primary" onClick={() => router.push('/app/map')}>
              Go to Map
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 bg-animated pt-20 md:pt-24 pb-20 md:pb-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Send XLM</h1>
          <p className="text-slate-400">Choose how you want to send crypto</p>
        </div>

        <Card>
          {/* Tabs */}
          <div className="flex space-x-2 mb-6 p-1 glass rounded-xl">
            <button
              onClick={() => setActiveTab('direct')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'direct'
                  ? 'bg-cyber-500 text-dark-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Direct Transfer</span>
            </button>
            <button
              onClick={() => setActiveTab('geodrop')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'geodrop'
                  ? 'bg-cyber-500 text-dark-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Geo-Drop</span>
            </button>
          </div>

          {/* Direct Transfer Form */}
          {activeTab === 'direct' && (
            <form onSubmit={handleDirectTransfer} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="GXXX..."
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Amount (XLM)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  value={directAmount}
                  onChange={(e) => setDirectAmount(e.target.value)}
                  placeholder="10.00"
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Memo (Optional)
                </label>
                <input
                  type="text"
                  value={directMemo}
                  onChange={(e) => setDirectMemo(e.target.value)}
                  placeholder="Payment note..."
                  maxLength={28}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyber-500 transition-colors"
                />
                <p className="text-xs text-slate-500 mt-1">Max 28 characters</p>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
                disabled={!recipientAddress || !directAmount}
              >
                <Send className="w-4 h-4 mr-2" />
                Send XLM
              </Button>
            </form>
          )}

          {/* Geo-Drop Form */}
          {activeTab === 'geodrop' && (
            <form onSubmit={handleGeoDrop} className="space-y-4">
              {/* Map for selecting location */}
              <div className="h-[400px] rounded-xl overflow-hidden">
                <Card padding="none" className="h-full">
                  <MapView
                    drops={drops}
                    userLocation={userLocation}
                    mode="transfer"
                    onMapClick={handleMapClick}
                    onClaimDrop={handleClaimDrop}
                  />
                </Card>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Amount (XLM)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  value={dropAmount}
                  onChange={(e) => setDropAmount(e.target.value)}
                  placeholder="10.00"
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Message
                </label>
                <textarea
                  value={dropMessage}
                  onChange={(e) => setDropMessage(e.target.value)}
                  placeholder="Leave a message for the finder..."
                  required
                  maxLength={200}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyber-500 transition-colors resize-none"
                />
                <p className="text-xs text-slate-500 mt-1">Max 200 characters</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="glass rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center">
                  <Target className="w-4 h-4 mr-2 text-cyber-500" />
                  Advanced Settings
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-slate-400" />
                    Target Audience
                  </label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyber-500 transition-colors"
                  >
                    <option value="public">Public (Anyone can claim)</option>
                    <option value="friends">Friends Only</option>
                    <option value="customers">For Customers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-slate-400" />
                    Expiration
                  </label>
                  <select
                    value={expirationHours}
                    onChange={(e) => setExpirationHours(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyber-500 transition-colors"
                  >
                    <option value="1">1 Hour</option>
                    <option value="6">6 Hours</option>
                    <option value="24">24 Hours</option>
                    <option value="72">3 Days</option>
                    <option value="168">1 Week</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
                disabled={!dropAmount || !dropMessage || !latitude || !longitude}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Create Geo-Drop
              </Button>
            </form>
          )}
        </Card>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.back()}
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Map
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TransferPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark-500 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    }>
      <TransferContent />
    </Suspense>
  );
}

