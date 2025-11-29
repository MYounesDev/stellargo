# StellarGo Setup Guide

Complete setup instructions for the StellarGo hackathon project.

## Prerequisites

Before starting, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (running locally or remote instance)
- **Freighter Wallet** browser extension
- **Git**

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd stellargo

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/stellargo
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
NEXT_PUBLIC_HOLDING_WALLET_ADDRESS=GAEXAMPLEWALLETADDRESSXXXXXXXXXXXXXXXXXXXXXXXXX
HOLDING_WALLET_SECRET=SAEXAMPLESECRETXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Important:** Replace the wallet addresses with your actual Stellar testnet wallet.

### 3. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or run manually
mongod --dbpath ~/data/db
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 4. Stellar Testnet Wallet

1. **Install Freighter:**
   - Visit [freighter.app](https://freighter.app)
   - Install browser extension
   - Create new wallet (save recovery phrase!)

2. **Get Test XLM:**
   ```bash
   # Visit Stellar Laboratory
   https://laboratory.stellar.org/#account-creator
   
   # Or use Friendbot
   curl "https://friendbot.stellar.org/?addr=YOUR_PUBLIC_KEY"
   ```

3. **Update .env with your holding wallet:**
   - Create a second wallet for holding drops
   - Update `NEXT_PUBLIC_HOLDING_WALLET_ADDRESS` and `HOLDING_WALLET_SECRET`

### 5. Seed Database

```bash
npm run seed
```

Expected output:
```
✨ Seeding completed successfully!
📊 Created 30 drops around Istanbul
📍 Center: 41.0082, 28.9784
💰 Total value: 245.50 XLM
🔓 Unclaimed: 24
🔒 Claimed: 6
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
stellargo/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx           # Dashboard with map
│   │   ├── ai-trader/         # AI Trading assistant
│   │   ├── faq/               # FAQ page
│   │   ├── api/               # API routes
│   │   │   └── drops/         # Drop CRUD operations
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── DropModal.tsx
│   │   ├── MapView.tsx
│   │   ├── Navbar.tsx
│   │   └── FullscreenButton.tsx
│   ├── lib/                   # Utilities
│   │   ├── mongodb.ts         # Database connection
│   │   ├── stellar.ts         # Stellar utilities
│   │   └── freighter.ts       # Wallet integration
│   ├── models/                # MongoDB models
│   │   └── Drop.ts
│   └── types/                 # TypeScript types
│       └── index.ts
├── soroban/                   # Smart contracts
│   └── geo_drop/
│       ├── src/lib.rs         # Contract code
│       └── Cargo.toml
├── scripts/
│   └── seed.js                # Database seeding
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Features Checklist

### Core Features ✅
- [x] Wallet connection (Freighter)
- [x] Interactive map (Leaflet)
- [x] Create geo-drops
- [x] Claim drops (proximity-based)
- [x] Real-time balance display
- [x] MongoDB integration

### UI/UX ✅
- [x] Modern FinTech design
- [x] Responsive (mobile + desktop)
- [x] Fullscreen mode button (mobile)
- [x] Clean component library
- [x] Smooth animations

### Additional Features ✅
- [x] AI Trader mock UI
- [x] Comprehensive FAQ page
- [x] Database seeding script
- [x] Soroban smart contract

## Common Issues & Solutions

### Issue: Map not loading
**Solution:**
- Check browser console for errors
- Enable location services
- Refresh page
- Try different browser

### Issue: Wallet won't connect
**Solution:**
- Install Freighter extension
- Unlock wallet
- Refresh page
- Check if on correct network (Testnet)

### Issue: MongoDB connection failed
**Solution:**
```bash
# Check if MongoDB is running
mongosh

# Start MongoDB
brew services start mongodb-community

# Or check connection string in .env
```

### Issue: Drops not appearing
**Solution:**
```bash
# Re-run seed script
npm run seed

# Check API response
curl http://localhost:3000/api/drops
```

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Seed database
npm run seed

# Lint code
npm run lint
```

## Building Soroban Contracts

```bash
# Install Soroban CLI
cargo install --locked soroban-cli

# Build contract
cd soroban/geo_drop
soroban contract build

# Run tests
cargo test
```

## Mobile Testing

1. Get your local IP:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Access from mobile:
   ```
   http://YOUR_LOCAL_IP:3000
   ```

3. Test fullscreen button (mobile only)

## Production Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# - MONGODB_URI
# - NEXT_PUBLIC_STELLAR_NETWORK
# - NEXT_PUBLIC_HOLDING_WALLET_ADDRESS
# - HOLDING_WALLET_SECRET
```

### Manual Deployment

```bash
# Build
npm run build

# Set environment variables on server
export MONGODB_URI="your-mongodb-uri"
export NEXT_PUBLIC_STELLAR_NETWORK="TESTNET"

# Start
npm start
```

## Testing Strategy

### Manual Testing

1. **Wallet Connection:**
   - Connect Freighter
   - Check balance displays
   - Disconnect and reconnect

2. **Drop Creation:**
   - Click map location
   - Fill form with valid data
   - Submit and verify on map

3. **Drop Claiming:**
   - Mock location near drop (dev tools)
   - Click claim
   - Verify transaction

4. **Responsive Design:**
   - Test on mobile (DevTools)
   - Test fullscreen mode
   - Check navigation menu

5. **AI Trader:**
   - Send various messages
   - Check response quality
   - Test loading states

## Performance Optimization

- Map loads dynamically (no SSR)
- Wallet state cached in localStorage
- MongoDB connection pooling
- Optimized Tailwind CSS build
- Image optimization with Next.js

## Security Best Practices

✅ **Implemented:**
- Private keys never exposed
- All transactions signed client-side
- Environment variables for secrets
- Input validation on API routes
- Proximity verification for claims

⚠️ **For Production:**
- Add rate limiting
- Implement CAPTCHA
- Add transaction confirmations
- Use HTTPS only
- Audit smart contracts
- Implement proper error handling

## Hackathon Demo Tips

1. **Prepare Test Data:**
   ```bash
   npm run seed
   ```

2. **Have Testnet XLM Ready:**
   - Get 10,000 XLM from Friendbot
   - Keep some in holding wallet

3. **Demo Flow:**
   - Show wallet connection
   - Create a drop at demo location
   - Show it appears on map
   - "Walk" to drop (mock location)
   - Claim the drop
   - Show AI Trader
   - Explain FAQ

4. **Backup Plan:**
   - Screenshots of working app
   - Video recording of features
   - Local development server ready

## Resources

- [Stellar Docs](https://developers.stellar.org)
- [Soroban Docs](https://soroban.stellar.org/docs)
- [Freighter Wallet](https://freighter.app)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Leaflet Docs](https://leafletjs.com/reference.html)

## Support

For issues or questions:
- Check FAQ page in app
- Review GitHub issues
- Stellar Discord community

## License

MIT License - Built for hackathon purposes

---

**Good luck with your hackathon! 🚀**

