'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Drop, UserLocation } from '@/types';
import Button from './Button';

// Fix for default marker icons in leaflet with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom drop marker icon
const dropIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMwMjg0YzciLz4KPHRleHQgeD0iMTYiIHk9IjIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiPiQ8L3RleHQ+Cjwvc3ZnPgo=',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// User location icon
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiMzODYwZjgiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface MapViewProps {
  drops: Drop[];
  userLocation: UserLocation | null;
  onMapClick: (lat: number, lng: number) => void;
  onClaimDrop: (drop: Drop) => void;
}

const MapClickHandler: React.FC<{
  onClick: (lat: number, lng: number) => void;
}> = ({ onClick }) => {
  useMapEvents({
    click: (e) => {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapView: React.FC<MapViewProps> = ({
  drops,
  userLocation,
  onMapClick,
  onClaimDrop,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-accent-100 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-accent-600">Loading map...</p>
        </div>
      </div>
    );
  }

  const center: [number, number] = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [41.0082, 28.9784]; // Default to Istanbul

  const isDropClaimable = (drop: Drop): boolean => {
    if (!userLocation || drop.claimed) return false;
    
    const [dropLng, dropLat] = drop.location.coordinates;
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      dropLat,
      dropLng
    );
    
    return distance <= 50; // 50 meters
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapClickHandler onClick={onMapClick} />

      {/* User location marker */}
      {userLocation && (
        <>
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userIcon}
          >
            <Popup>
              <div className="text-center">
                <p className="font-semibold text-accent-900">Your Location</p>
              </div>
            </Popup>
          </Marker>
          
          {/* 50m radius circle */}
          <Circle
            center={[userLocation.latitude, userLocation.longitude]}
            radius={50}
            pathOptions={{
              color: '#3860f8',
              fillColor: '#3860f8',
              fillOpacity: 0.1,
              weight: 2,
            }}
          />
        </>
      )}

      {/* Drop markers */}
      {drops.map((drop) => {
        const [lng, lat] = drop.location.coordinates;
        const claimable = isDropClaimable(drop);
        
        return (
          <Marker key={drop._id} position={[lat, lng]} icon={dropIcon}>
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-primary-600">
                    {drop.amount} XLM
                  </span>
                  {drop.claimed && (
                    <span className="text-xs bg-accent-200 text-accent-700 px-2 py-1 rounded">
                      Claimed
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-accent-700 mb-2">{drop.message}</p>
                
                <p className="text-xs text-accent-500 mb-3">
                  by {drop.createdBy.slice(0, 8)}...
                </p>
                
                {!drop.claimed && claimable && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onClaimDrop(drop)}
                    className="w-full"
                  >
                    Claim Drop
                  </Button>
                )}
                
                {!drop.claimed && !claimable && userLocation && (
                  <p className="text-xs text-accent-500 text-center">
                    Get within 50m to claim
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapView;

