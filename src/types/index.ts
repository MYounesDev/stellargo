export interface Drop {
  _id?: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  amount: number;
  message: string;
  createdBy: string; // Wallet address
  claimed: boolean;
  claimedBy?: string;
  claimedAt?: Date;
  transactionHash?: string;
  createdAt: Date;
  updatedAt: Date;
  // New fields
  targetAudience?: 'public' | 'friends' | 'customers';
  expiresAt?: Date;
}

export interface User {
  _id?: string;
  publicKey: string;
  username?: string;
  bio?: string;
  persona: 'personal' | 'business' | 'nonprofit';
  badge?: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  totalDropsCreated: number;
  totalDropsClaimed: number;
  totalAmountSent: number;
  totalAmountReceived: number;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface WalletState {
  publicKey: string | null;
  balance: string | null;
  isConnected: boolean;
}

export interface DropFormData {
  amount: number;
  message: string;
  latitude: number;
  longitude: number;
  targetAudience?: 'public' | 'friends' | 'customers';
  expiresAt?: Date;
}

export interface ClaimDropPayload {
  dropId: string;
  userPublicKey: string;
  userLocation: UserLocation;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Transaction {
  _id?: string;
  type: 'direct' | 'drop_placed' | 'drop_claimed';
  from: string;
  to?: string;
  amount: number;
  dropId?: string;
  transactionHash?: string;
  createdAt: Date;
}

