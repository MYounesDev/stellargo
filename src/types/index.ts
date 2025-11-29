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

