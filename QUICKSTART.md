# StellarGo Quick Start Guide

Get StellarGo running in 5 minutes!

## ⚡ Prerequisites

- Node.js 18+ installed
- MongoDB running (local or Atlas)
- Freighter wallet extension

## 🚀 Installation

```bash
# 1. Clone and install
git clone <your-repo-url>
cd stellargo
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your MongoDB URI and Stellar wallet

# 3. Start MongoDB (if local)
mongod

# 4. Seed database
npm run seed

# 5. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Setup

Edit `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/stellargo
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
NEXT_PUBLIC_HOLDING_WALLET_ADDRESS=GABC...
HOLDING_WALLET_SECRET=SABC...
```

## 📱 Get Started

1. **Install Freighter**: Visit [freighter.app](https://freighter.app)
2. **Get Test XLM**: Use [Friendbot](https://friendbot.stellar.org)
3. **Connect Wallet**: Click "Connect Wallet" in app
4. **Create Drop**: Click map or "Drop Here"
5. **Claim Drop**: Walk near a drop (or mock location)

## 🎯 Key Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run seed     # Seed database with test drops
npm run lint     # Check code quality
```

## 📚 Documentation

- [README.md](README.md) - Project overview
- [SETUP.md](SETUP.md) - Detailed setup guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production
- [HACKATHON_DEMO.md](HACKATHON_DEMO.md) - Demo guide
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Architecture details
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide

## 🆘 Common Issues

### Map not loading
```bash
# Check location permissions in browser
# Refresh the page
```

### Wallet won't connect
```bash
# Install Freighter extension
# Unlock wallet
# Select Stellar Testnet
```

### MongoDB connection failed
```bash
# Check MongoDB is running
mongosh

# Or update MONGODB_URI in .env
```

### No drops visible
```bash
# Re-run seed script
npm run seed

# Check API
curl http://localhost:3000/api/drops
```

## 🎨 Project Structure

```
stellargo/
├── src/
│   ├── app/           # Pages and API routes
│   ├── components/    # React components
│   ├── lib/           # Utilities
│   ├── models/        # Database models
│   └── types/         # TypeScript types
├── soroban/          # Smart contracts
├── scripts/          # Utility scripts
└── public/           # Static assets
```

## 🌟 Features

✅ Freighter wallet integration
✅ Interactive map with Leaflet
✅ Create geo-drops
✅ Claim drops (proximity-based)
✅ AI trading assistant
✅ Comprehensive FAQ
✅ Mobile responsive
✅ Fullscreen mode
✅ Soroban smart contracts

## 🔗 Important Links

- [Stellar Docs](https://developers.stellar.org)
- [Freighter Wallet](https://freighter.app)
- [MongoDB Atlas](https://mongodb.com/cloud/atlas)
- [Vercel Deployment](https://vercel.com)
- [Soroban Docs](https://soroban.stellar.org)

## 📞 Need Help?

1. Check the docs (links above)
2. Review FAQ in app
3. Check GitHub issues
4. Ask in Stellar Discord

## 🎉 Ready to Demo?

See [HACKATHON_DEMO.md](HACKATHON_DEMO.md) for presentation guide!

---

**Happy building! 🚀**

