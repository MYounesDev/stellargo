'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Drop, UserLocation } from '@/types';
import Button from './Button';
import { MapPin, Gift } from 'lucide-react';

// Fix for default marker icons in leaflet with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom drop marker icon (claimed - gray)
const claimedDropIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2NDc0OGIiLz4KPHRleHQgeD0iMTYiIHk9IjIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiPiQ8L3RleHQ+Cjwvc3ZnPgo=',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Custom drop marker icon (available - cyber green)
const availableDropIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMwMGZmOWQiLz4KPHRleHQgeD0iMTYiIHk9IjIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzBhMGEwYSI+JDwvdGV4dD4KPC9zdmc+Cg==',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// User location icon
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiMwMGZmOWQiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface MapViewProps {
  drops: Drop[];
  userLocation: UserLocation | null;
  mode?: 'map' | 'transfer'; // 'map' = map page, 'transfer' = transfer page
  onMapClick: (lat: number, lng: number) => void;
  onClaimDrop: (drop: Drop) => void;
  onDropHere?: (lat: number, lng: number) => void; // For "Drop Here" button in map mode
}

const MapClickHandler: React.FC<{
  onClick: (lat: number, lng: number) => void;
  drops: Drop[];
  mode: 'map' | 'transfer';
  onDropHere?: (lat: number, lng: number) => void;
}> = ({ onClick, drops, mode, onDropHere }) => {
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [popup, setPopup] = useState<L.Popup | null>(null);

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      
      // Check if there's a drop at this location (within 10 meters)
      const hasDrop = drops.some((drop) => {
        const [dropLng, dropLat] = drop.location.coordinates;
        const distance = calculateDistance(lat, lng, dropLat, dropLng);
        return distance < 10; // 10 meters threshold
      });

      if (hasDrop) {
        // If there's a drop, don't handle click here (let marker handle it)
        return;
      }

      // Empty location clicked
      if (mode === 'transfer') {
        // Transfer page: select directly
        onClick(lat, lng);
      } else {
        // Map page: show popup asking "Drop Here?"
        setClickedPosition({ lat, lng });
        
        // Create and show popup
        const newPopup = L.popup({
          closeButton: true,
          className: 'drop-here-popup',
        })
          .setLatLng([lat, lng])
          .setContent(`
            <div style="padding: 12px; text-align: center; min-width: 180px;">
              <div style="margin-bottom: 12px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #00ff9d; margin: 0 auto;">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <p style="margin: 0 0 12px 0; font-weight: 600; color: #f8fafc;">Drop Here?</p>
              <button 
                id="drop-here-btn" 
                style="
                  width: 100%;
                  padding: 8px 16px;
                  background: linear-gradient(135deg, #00ff9d 0%, #00d4ff 100%);
                  color: #0a0a0a;
                  border: none;
                  border-radius: 8px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: transform 0.2s;
                "
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'"
              >
                Drop Here
              </button>
            </div>
          `)
          .openOn(e.target);

        setPopup(newPopup);

        // Handle button click after popup is added to DOM
        setTimeout(() => {
          const btn = document.getElementById('drop-here-btn');
          if (btn && onDropHere) {
            btn.onclick = () => {
              onDropHere(lat, lng);
              newPopup.close();
            };
          }
        }, 100);
      }
    },
  });

  return null;
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

const MapView: React.FC<MapViewProps> = ({
  drops,
  userLocation,
  mode = 'map',
  onMapClick,
  onClaimDrop,
  onDropHere,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-dark-500 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading map...</p>
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
      
      <MapClickHandler 
        onClick={onMapClick} 
        drops={drops}
        mode={mode}
        onDropHere={onDropHere}
      />

      {/* User location marker */}
      {userLocation && (
        <>
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userIcon}
          >
            <Popup>
              <div className="text-center">
                <p className="font-semibold text-white">Your Location</p>
              </div>
            </Popup>
          </Marker>
          
          {/* 50m radius circle */}
          <Circle
            center={[userLocation.latitude, userLocation.longitude]}
            radius={50}
            pathOptions={{
              color: '#00ff9d',
              fillColor: '#00ff9d',
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
          <Marker 
            key={drop._id} 
            position={[lat, lng]} 
            icon={drop.claimed ? claimedDropIcon : availableDropIcon}
          >
            <Popup className="custom-popup">
              <div className="p-3 min-w-[220px] bg-dark-500 text-white rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-cyber-500 flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    {drop.amount} XLM
                  </span>
                  {drop.claimed && (
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      Claimed
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-slate-300 mb-2">{drop.message}</p>
                
                <p className="text-xs text-slate-500 mb-3">
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
                  <p className="text-xs text-slate-500 text-center">
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
