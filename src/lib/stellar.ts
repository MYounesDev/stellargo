import * as StellarSdk from 'stellar-sdk';

// Stellar configuration
export const STELLAR_NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'TESTNET';
export const HORIZON_URL =
  STELLAR_NETWORK === 'TESTNET'
    ? 'https://horizon-testnet.stellar.org'
    : 'https://horizon.stellar.org';

export const server = new StellarSdk.Horizon.Server(HORIZON_URL);

// Get network passphrase
export const getNetworkPassphrase = () => {
  return STELLAR_NETWORK === 'TESTNET'
    ? StellarSdk.Networks.TESTNET
    : StellarSdk.Networks.PUBLIC;
};

// Get account balance
export async function getAccountBalance(publicKey: string): Promise<string> {
  try {
    const account = await server.loadAccount(publicKey);
    const xlmBalance = account.balances.find(
      (balance) => balance.asset_type === 'native'
    );
    return xlmBalance ? xlmBalance.balance : '0';
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

// Check if user is within range of a drop
export function isWithinRange(
  userLat: number,
  userLon: number,
  dropLat: number,
  dropLon: number,
  rangeMeters: number = 50
): boolean {
  const distance = calculateDistance(userLat, userLon, dropLat, dropLon);
  return distance <= rangeMeters;
}

