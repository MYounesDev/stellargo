'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/Button';
import Card from '@/components/Card';
import DropModal from '@/components/DropModal';
import { Drop, UserLocation, DropFormData } from '@/types';
import { createPaymentTransaction } from '@/lib/freighter';

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-accent-100 rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-accent-600">Loading map...</p>
      </div>
    </div>
  ),
});

export default function Dashboard() {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<UserLocation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

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

    // Check wallet connection
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }

    // Fetch drops
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

  const handleMapClick = (lat: number, lng: number) => {
    if (!walletAddress) {
      alert('Please connect your wallet first');
      return;
    }
    
    setSelectedLocation({ latitude: lat, longitude: lng });
    setIsModalOpen(true);
  };

  const handleCreateDrop = async (data: DropFormData) => {
    if (!walletAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      // For MVP, we'll skip the actual blockchain transaction
      // and just save to database
      // In production, you'd call createPaymentTransaction here

      const response = await fetch('/api/drops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: data.latitude,
          longitude: data.longitude,
          amount: data.amount,
          message: data.message,
          createdBy: walletAddress,
          // transactionHash: txHash, // Would come from blockchain transaction
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Refresh drops
        await fetchDrops();
        alert('Drop created successfully!');
      } else {
        throw new Error(result.error || 'Failed to create drop');
      }
    } catch (error) {
      console.error('Error creating drop:', error);
      throw error;
    }
  };

  const handleClaimDrop = async (drop: Drop) => {
    if (!walletAddress || !userLocation) {
      alert('Please connect your wallet and enable location');
      return;
    }

    try {
      // For MVP, we'll skip the actual blockchain transaction
      const response = await fetch(`/api/drops/${drop._id}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPublicKey: walletAddress,
          userLatitude: userLocation.latitude,
          userLongitude: userLocation.longitude,
          // transactionHash: txHash, // Would come from blockchain transaction
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Refresh drops
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

  return (
    <div className="h-[calc(100vh-4rem)] p-4 md:p-6">
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 lg:max-h-full lg:overflow-y-auto">
            <Card>
              <h2 className="text-xl font-bold text-accent-900 mb-4">
                Dashboard
              </h2>
              <div className="space-y-3">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <p className="text-sm text-primary-700 font-semibold mb-1">
                    Total Drops
                  </p>
                  <p className="text-3xl font-bold text-primary-900">{drops.length}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700 font-semibold mb-1">
                    Available
                  </p>
                  <p className="text-3xl font-bold text-green-900">
                    {drops.filter(d => !d.claimed).length}
                  </p>
                </div>
                
                <div className="bg-accent-100 p-4 rounded-lg">
                  <p className="text-sm text-accent-700 font-semibold mb-1">
                    Claimed
                  </p>
                  <p className="text-3xl font-bold text-accent-900">
                    {drops.filter(d => d.claimed).length}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-accent-900 mb-3">
                How to Use
              </h3>
              <ol className="text-sm text-accent-700 space-y-2 list-decimal list-inside">
                <li>Connect your Freighter wallet</li>
                <li>Click anywhere on the map to create a drop</li>
                <li>Enter amount and message</li>
                <li>Walk within 50m of a drop to claim it</li>
              </ol>
            </Card>

            {walletAddress && (
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  if (userLocation) {
                    handleMapClick(userLocation.latitude, userLocation.longitude);
                  }
                }}
              >
                Drop Here
              </Button>
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-3 h-[500px] lg:h-full">
            <Card padding="none" className="h-full overflow-hidden">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-accent-600">Loading drops...</p>
                  </div>
                </div>
              ) : (
                <MapView
                  drops={drops}
                  userLocation={userLocation}
                  onMapClick={handleMapClick}
                  onClaimDrop={handleClaimDrop}
                />
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Drop Modal */}
      {selectedLocation && (
        <DropModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedLocation(null);
          }}
          onSubmit={handleCreateDrop}
          latitude={selectedLocation.latitude}
          longitude={selectedLocation.longitude}
        />
      )}
    </div>
  );
}
