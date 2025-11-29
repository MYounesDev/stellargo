# StellarGo 🌍💰

**A location-based cryptocurrency platform built on the Stellar Network**

Drop crypto at physical locations for others to discover and claim - like a real-world treasure hunt powered by blockchain!

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Stellar](https://img.shields.io/badge/Stellar-Network-purple)](https://stellar.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

### 🗺️ Core Features
- **Geo-Drop Creation**: Drop crypto at any GPS location with a message
- **Interactive Map**: Leaflet-powered map showing all drops in real-time
- **Proximity Claiming**: Claim drops only when within 50 meters
- **Wallet Integration**: Secure Freighter wallet connection
- **Real-time Balance**: Live XLM balance display

### 🎨 User Experience
- **Modern FinTech Design**: Clean, professional aesthetic (Stripe/Revolut inspired)
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Mobile Fullscreen**: App-like experience on mobile devices
- **Smooth Animations**: Polished interactions throughout
- **Dark/Light UI**: High contrast, accessible design

### 🤖 Additional Features
- **AI Trading Assistant**: Mock AI chatbot for token analysis
- **Comprehensive FAQ**: Detailed Q&A covering all aspects
- **Dashboard Analytics**: Track drops, claims, and statistics
- **Smart Contracts**: Soroban contracts for secure transactions

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Freighter Wallet

### Installation

```bash
# 1. Clone and install
git clone https://github.com/yourusername/stellargo.git
cd stellargo
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your MongoDB URI and Stellar wallet

# 3. Seed database
npm run seed

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

**📚 For detailed setup:** See [QUICKSTART.md](QUICKSTART.md) or [SETUP.md](SETUP.md)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript 5 |
| **Styling** | Tailwind CSS 3, Custom Design System |
| **Maps** | Leaflet, React-Leaflet |
| **Backend** | Next.js API Routes, Node.js |
| **Database** | MongoDB, Mongoose (with geospatial indexes) |
| **Blockchain** | Stellar Network (Testnet), Stellar SDK |
| **Wallet** | Freighter API |
| **Smart Contracts** | Soroban (Rust) |
| **Deployment** | Vercel, MongoDB Atlas |

---

## 📸 Screenshots

### Dashboard
![Dashboard with interactive map showing drops]

### Create Drop
![Modal for creating a new geo-drop]

### AI Trader
![AI trading assistant interface]

### Mobile View
![Responsive mobile design with fullscreen mode]

---

## 📁 Project Structure

```
stellargo/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── page.tsx               # Dashboard (main page)
│   │   ├── layout.tsx             # Root layout
│   │   ├── globals.css            # Global styles
│   │   ├── api/drops/             # REST API endpoints
│   │   ├── ai-trader/             # AI trading UI
│   │   └── faq/                   # FAQ page
│   ├── components/                # Reusable components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── DropModal.tsx
│   │   ├── MapView.tsx
│   │   ├── Navbar.tsx
│   │   └── FullscreenButton.tsx
│   ├── lib/                       # Utilities
│   │   ├── mongodb.ts
│   │   ├── stellar.ts
│   │   └── freighter.ts
│   ├── models/                    # Database schemas
│   │   └── Drop.ts
│   └── types/                     # TypeScript definitions
│       └── index.ts
├── soroban/                       # Smart contracts
│   └── geo_drop/
│       ├── src/lib.rs
│       └── Cargo.toml
├── scripts/
│   └── seed.js                    # Database seeding
├── public/                        # Static assets
└── Documentation/                 # 8 comprehensive guides
    ├── README.md
    ├── QUICKSTART.md
    ├── SETUP.md
    ├── DEPLOYMENT.md
    ├── HACKATHON_DEMO.md
    ├── PROJECT_STRUCTURE.md
    ├── CONTRIBUTING.md
    └── PROJECT_SUMMARY.md
```

**Total:** 25+ source files, 7 components, 3 pages, 3 API routes, 8 documentation files

## 🎯 How It Works

### Creating a Drop
1. 🔗 **Connect** your Freighter wallet
2. 🗺️ **Click** any location on the map (or "Drop Here")
3. 💰 **Enter** amount (XLM) and a message
4. ✅ **Submit** - Drop created instantly
5. 📍 **Appears** on map for others to find

### Claiming a Drop
1. 👀 **See** drops on the map as blue markers
2. 🚶 **Walk** within 50 meters of a drop
3. 🔵 **Click** the now-active "Claim" button
4. 💸 **Receive** XLM transferred to your wallet
5. ✨ **Success** - Drop marked as claimed

### Security & Verification
- **Location**: Server-side proximity verification (50m radius)
- **Wallet**: Private keys never leave your device (Freighter)
- **Transactions**: All signed client-side
- **Blockchain**: Immutable record on Stellar Network

## 📚 Documentation

We've created **8 comprehensive guides** to help you:

| Document | Description |
|----------|-------------|
| 📖 [QUICKSTART.md](QUICKSTART.md) | Get running in 5 minutes |
| 🔧 [SETUP.md](SETUP.md) | Detailed setup instructions |
| 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) | Deploy to production (Vercel) |
| 🎤 [HACKATHON_DEMO.md](HACKATHON_DEMO.md) | 5-minute demo script & tips |
| 🏗️ [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Architecture deep dive |
| 🤝 [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| 📊 [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Complete project overview |
| ❓ **FAQ in app** | User-facing Q&A |

---

## 🧪 Development Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run seed     # Seed database with 30 test drops
npm run lint     # Check code quality
```

---

## 🌐 API Endpoints

### Drops API

**GET /api/drops**
- Fetch all drops or drops near a location
- Query params: `latitude`, `longitude`, `radius`

**POST /api/drops**
- Create a new drop
- Body: `latitude`, `longitude`, `amount`, `message`, `createdBy`

**POST /api/drops/[id]/claim**
- Claim a drop
- Body: `userPublicKey`, `userLatitude`, `userLongitude`

---

## 🎨 Design System

**Color Palette:**
- Primary Blue: `#0284c7` (Actions, emphasis)
- Accent Gray: `#f4f4f5` - `#18181b` (Text, backgrounds)
- Semantic: Green (success), Red (error), Yellow (warning)

**Typography:**
- Font: Inter (Google Fonts)
- Sizes: Responsive scale (mobile-optimized)

**Components:**
- Button: 4 variants × 3 sizes
- Card: Hover effects, flexible padding
- Modal: Responsive, backdrop blur

---

## 🔐 Security

### Implemented
✅ Private keys never exposed
✅ Client-side transaction signing
✅ Environment variables for secrets
✅ Input validation
✅ Proximity verification
✅ MongoDB injection prevention

### For Production
- [ ] Rate limiting
- [ ] CAPTCHA for claims
- [ ] Smart contract audit
- [ ] Error monitoring (Sentry)
- [ ] Database backups

---

## 🚀 Deployment

### Quick Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Add environment variables in Vercel dashboard:
- `MONGODB_URI`
- `NEXT_PUBLIC_STELLAR_NETWORK`
- `NEXT_PUBLIC_HOLDING_WALLET_ADDRESS`
- `HOLDING_WALLET_SECRET`

**Full guide:** [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🌟 Why Stellar?

- ⚡ **Fast**: 5-second transaction finality
- 💰 **Cheap**: ~$0.00001 per transaction
- 🌍 **Global**: Cross-border by design
- 🔒 **Secure**: Proven consensus protocol
- 🏦 **DEX**: Built-in decentralized exchange
- 🌱 **Eco-Friendly**: Minimal energy consumption

Perfect for micro-transactions and real-world use cases like StellarGo!

---

## 💡 Use Cases

🎉 **Events** - Drop crypto at conferences for attendees
☕ **Tipping** - Leave tips at local businesses
🏙️ **Tourism** - City-wide scavenger hunts
🎓 **Education** - Campus treasure hunts
🏪 **Retail** - Location-based loyalty rewards
🎮 **Gaming** - Real-world crypto games

---

## 🗺️ Roadmap

### Phase 1 (Current - MVP)
- ✅ Core features complete
- ✅ Smart contracts deployed
- ✅ Testnet functional

### Phase 2 (Next)
- [ ] Security audit
- [ ] Mainnet deployment
- [ ] Mobile apps (iOS/Android)
- [ ] Social features

### Phase 3 (Future)
- [ ] NFT drops
- [ ] Multi-token support
- [ ] Merchant integrations
- [ ] Analytics dashboard

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Coding standards
- Git workflow
- PR process
- Testing guidelines

---

## 📞 Support

- 📖 **Documentation**: Check our comprehensive guides
- 💬 **Issues**: [GitHub Issues](https://github.com/yourusername/stellargo/issues)
- 🌟 **Stellar Discord**: Join the community
- ❓ **FAQ**: In-app FAQ page

---

## 🙏 Acknowledgments

Built with amazing tools:
- [Stellar Development Foundation](https://stellar.org)
- [Freighter Wallet](https://freighter.app)
- [Next.js](https://nextjs.org) by Vercel
- [MongoDB](https://mongodb.com)
- [Leaflet](https://leafletjs.com)
- [OpenStreetMap](https://openstreetmap.org)

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

Built for hackathon purposes, ready for production! 🚀

---

## 🌐 Links

- 🌍 **Live Demo**: [stellargo.vercel.app](https://stellargo.vercel.app)
- 💻 **GitHub**: [github.com/yourusername/stellargo](https://github.com/yourusername/stellargo)
- 📱 **Stellar**: [stellar.org](https://stellar.org)
- 🔗 **Soroban**: [soroban.stellar.org](https://soroban.stellar.org)

---

<div align="center">

**Made with ❤️ for the Stellar Network**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/yourusername/stellargo/issues) · [Request Feature](https://github.com/yourusername/stellargo/issues) · [Documentation](QUICKSTART.md)

</div>
