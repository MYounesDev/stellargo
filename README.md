# StellarGo 🚀

## Crypto on the Streets - Location-Based SocialFi Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-purple)](https://stellar.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

StellarGo is not just a tool—it's a **platform** that brings cryptocurrency to the physical world. Drop crypto at real locations for others to discover and claim, turning your city into an interactive treasure hunt powered by the Stellar blockchain.

---

## 🌟 The Vision

**The Problem:** Crypto is lonely. It's stuck on screens in boring wallet interfaces with no real-world connection.

**The Solution:** We bring crypto to the streets through location-based drops, creating a new category of **Location-Based SocialFi**.

---

## ✨ Key Features

### 🗺️ Geo-Drops
- Drop crypto at physical locations
- Set custom messages and requirements
- Configure who can claim (public, friends, students)
- Set expiry dates for time-limited drops

### 📍 Interactive Map
- Dark-themed custom map interface
- Real-time drop visualization
- Filter drops by type and status
- Claim drops within 50m radius

### 🎯 Gamification
- Achievement badges system
- User leaderboards
- Activity tracking
- Profile customization

### 💸 Dual Transfer System
- **Geo-Drop**: Location-based crypto drops
- **Direct Transfer**: Traditional wallet-to-wallet

### 🏢 Multi-User Types
- **Personal Users**: Hunt for drops while exploring
- **Companies**: Drive foot traffic with marketing campaigns
- **Non-Profits**: Engage communities with event-based distribution

---

## 🔥 Why Stellar?

This business model is **ONLY** viable on Stellar:

| Feature | Ethereum | Stellar |
|---------|----------|---------|
| Transaction Cost | $5.00 | $0.00001 |
| Confirmation Time | 15-60s | 3-5s |
| Scalability | Limited | High |
| Gamification Viable? | ❌ | ✅ |

**Gamification requires speed (3s) and low cost. Only Stellar makes this possible.**

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### Blockchain
- **Stellar Network** - Fast, low-cost transactions
- **Soroban** - Smart contracts for geo-verification
- **Freighter Wallet** - Stellar wallet integration

### Backend
- **MongoDB** - NoSQL database
- **Next.js API Routes** - Serverless functions
- **Mongoose** - ODM for MongoDB

### Mapping
- **Leaflet** - Interactive maps
- **React Leaflet** - React integration

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB
- Freighter Wallet extension

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/stellargo.git
cd stellargo

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

📚 **Detailed guides:**
- [Installation Guide](./INSTALL.md)
- [Running the App](./RUN.md)
- [Deployment Guide](./DEPLOY.md)

---

## 📱 Screenshots

### Landing Page
High-energy hero with animated elements, leaderboard, and Q&A.

### Dashboard
Overview of balance, active drops, and recent activity.

### Map View
Full-screen dark-themed map showing nearby drops with filters.

### Geo-Drop Creation
Interactive map selection with advanced settings.

### Profile
Customizable profile with achievement badges.

---

## 🎨 Design Philosophy

### Dark/Neon Green Aesthetic
- Deep blacks/grays for background
- Neon Green (#00FF41) for primary actions
- Glassmorphism for modern UI
- Animated background with moving blobs

### Responsive Design
- **Desktop**: Floating glass navbar at top
- **Mobile**: Glass tab bar at bottom
- Smooth animations everywhere
- "Hackathon Winner" quality visuals

---

## 🔐 Smart Contracts

### Geo-Drop Contract (Soroban)

```rust
fn create_drop(lat: i64, lng: i64, amount: i128)
fn claim_drop(user_lat: i64, user_lng: i64)
// Verifies user is within 50m radius before allowing claim
```

**Key Features:**
- Latitude/Longitude verification
- Radius-based claiming
- Secure fund escrow
- Anti-double-claim protection

---

## 🎯 Use Cases

### 1. Company Marketing
**Starbucks** drops 5 XLM tokens at each location. Users can claim when they visit, driving foot traffic and creating buzz.

### 2. Event Engagement
**Music Festival** organizers drop tokens at specific stages. Attendees collect them as they explore the venue.

### 3. Educational Rewards
**Universities** drop tokens for students attending lectures or visiting campus locations.

### 4. Social Treasure Hunts
**Friends** create scavenger hunts by dropping crypto at significant locations.

### 5. Tourism Incentives
**Cities** promote tourism by placing drops at historical landmarks.

---

## 📊 Project Structure

```
stellargo/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (home)/            # Landing page
│   │   ├── dashboard/         # Main dashboard
│   │   ├── map/               # Map view
│   │   ├── transfer/          # Create drops/transfers
│   │   ├── history/           # Transaction history
│   │   ├── profile/           # User profile
│   │   └── presentation/      # Hackathon presentation
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── navigation/        # Nav components
│   │   └── ...
│   ├── contexts/              # React contexts
│   ├── lib/                   # Utilities and configs
│   └── types/                 # TypeScript types
├── soroban/                   # Smart contracts
│   └── geo_drop/              # Geo-drop contract
├── public/                    # Static assets
└── docs/                      # Documentation
```

---

## 🔧 Configuration

### Environment Variables

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/stellargo

# Stellar
STELLAR_NETWORK=TESTNET
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Theme Configuration

Edit `src/lib/theme.config.ts` to customize:
- Colors
- Gradients
- Shadows
- Animations
- Spacing

---

## 🎬 Presentation Mode

Access the built-in presentation at `/presentation`:

- Navigate with arrow keys (Left/Right)
- Press 'N' for speaker notes
- Full-screen immersive slides
- QR code for mobile demo

Perfect for hackathon pitches!

---

## 🧪 Testing

```bash
# Run linter
npm run lint

# Seed database with sample data
npm run seed

# Build for production
npm run build
```

---

## 📈 Roadmap

### Phase 1: MVP (Current)
- [x] Basic geo-drop functionality
- [x] Map visualization
- [x] Wallet integration
- [x] User profiles
- [x] Transaction history

### Phase 2: Enhancement
- [ ] Social features (friends, messaging)
- [ ] Advanced filters and search
- [ ] Mobile native apps
- [ ] Real-time notifications
- [ ] Multi-token support

### Phase 3: Scale
- [ ] Mainnet deployment
- [ ] Business dashboard
- [ ] Analytics platform
- [ ] API for third parties
- [ ] Multi-language support

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) for details.

---

## 👥 Team

Built with ❤️ by developers passionate about bringing crypto to the real world.

---

## 🔗 Links

- **Website**: [stellargo.app](https://stellargo.app)
- **Documentation**: [docs.stellargo.app](https://docs.stellargo.app)
- **GitHub**: [github.com/stellargo](https://github.com/stellargo)
- **Twitter**: [@StellarGo](https://twitter.com/stellargo)
- **Discord**: [Join our community](https://discord.gg/stellargo)

---

## 🙏 Acknowledgments

- **Stellar Development Foundation** for the amazing blockchain
- **Soroban Team** for smart contract capabilities
- **Freighter** for wallet integration
- **Vercel** for hosting platform
- **Next.js Team** for the framework

---

## 💬 Support

- 📧 Email: support@stellargo.app
- 💬 Discord: [Join our server](https://discord.gg/stellargo)
- 🐦 Twitter: [@StellarGo](https://twitter.com/stellargo)
- 📖 Docs: [docs.stellargo.app](https://docs.stellargo.app)

---

<div align="center">

**StellarGo** - Crypto on the Streets 🚀

Bringing blockchain to the physical world, one drop at a time.

[Get Started](./INSTALL.md) • [View Demo](https://stellargo.app) • [Join Community](https://discord.gg/stellargo)

</div>
