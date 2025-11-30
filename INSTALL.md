# StellarGo - Installation Guide

Welcome to StellarGo! This guide will help you set up the project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or cloud instance)
- **Freighter Wallet** browser extension
- **Rust** and **Cargo** (for Soroban smart contracts)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/stellargo.git
cd stellargo
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/stellargo
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stellargo

# Stellar Network
STELLAR_NETWORK=TESTNET
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org

# Optional: API Keys
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up MongoDB

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (via Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and add to `.env.local`

### 5. Install Freighter Wallet

1. Visit [freighter.app](https://www.freighter.app/)
2. Install the browser extension for Chrome/Firefox/Edge
3. Create a new wallet or import existing
4. Switch to **Testnet** in Freighter settings
5. Fund your testnet account at [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)

### 6. Set Up Soroban Smart Contracts (Optional)

If you want to deploy smart contracts:

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Soroban CLI
cargo install --locked soroban-cli

# Navigate to contracts directory
cd soroban/geo_drop

# Build contract
soroban contract build

# Deploy to testnet (replace ACCOUNT_ID)
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/geo_drop.wasm \
  --source YOUR_SECRET_KEY \
  --network testnet
```

### 7. Seed Database (Optional)

Populate the database with sample data:

```bash
npm run seed
```

## Verification

Test that everything is set up correctly:

```bash
# Check Node version
node --version  # Should be v18+

# Check MongoDB connection
mongosh "mongodb://localhost:27017/stellargo"

# Verify Freighter installation
# Open browser and check for Freighter extension icon
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check firewall settings
- Verify connection string in `.env.local`

### Freighter Wallet Issues
- Make sure you're on Testnet
- Clear browser cache
- Reinstall extension if needed

### Soroban Build Errors
- Update Rust: `rustup update`
- Clear cargo cache: `cargo clean`
- Check Soroban version: `soroban --version`

## Next Steps

Once installation is complete, proceed to [RUN.md](./RUN.md) to start the development server.

## Support

If you encounter issues:
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Open an issue on GitHub
- Contact the team

---
**StellarGo** - Crypto on the Streets 🚀
