# 🚀 Quick Start Guide

Get StellarGo running in **5 minutes**!

## Step 1: Install Dependencies

```bash
npm install
```

If you get any errors, try:
```bash
npm install --legacy-peer-deps
```

## Step 2: Create Environment File

Create `.env.local` in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/stellargo
STELLAR_NETWORK=TESTNET
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### MongoDB Options

**Option 1: Skip MongoDB (for testing UI only)**
The app will work without MongoDB for viewing UI/design.

**Option 2: Use MongoDB Atlas (Free Cloud)**
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Replace `MONGODB_URI` above

**Option 3: Install MongoDB Locally**
- Windows: Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- macOS: `brew install mongodb-community`
- Linux: Follow [docs.mongodb.com/manual/installation](https://docs.mongodb.com/manual/installation/)

## Step 3: Install Freighter Wallet

1. Visit [freighter.app](https://www.freighter.app/)
2. Install browser extension
3. Create/import wallet
4. Switch to **Testnet** in settings
5. Fund your account at [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)

## Step 4: Start Development Server

```bash
npm run dev
```

## Step 5: Open in Browser

🌐 **Landing Page**: [http://localhost:3000](http://localhost:3000)

### Try These Pages:
- 📊 **Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- 🗺️ **Map View**: [http://localhost:3000/map](http://localhost:3000/map)
- 💸 **Transfer**: [http://localhost:3000/transfer](http://localhost:3000/transfer)
- 📜 **History**: [http://localhost:3000/history](http://localhost:3000/history)
- 👤 **Profile**: [http://localhost:3000/profile](http://localhost:3000/profile)
- 🎬 **Presentation**: [http://localhost:3000/presentation](http://localhost:3000/presentation)

---

## 🎯 First-Time User Flow

### 1. Landing Page
- See animated hero
- Check out leaderboard
- Click floating Q&A button
- Click "Launch App"

### 2. Connect Wallet
- Click "Connect Wallet" in navbar
- Approve in Freighter extension
- See balance display

### 3. Onboarding
- Select user type (Personal/Company/Non-Profit)
- Enter username
- Click "Get Started"

### 4. Explore Dashboard
- View stats overview
- Check quick actions
- See recent activity

### 5. Create First Drop
- Go to Transfer page
- Select "Geo-Drop" tab
- Click on map to select location
- Enter amount and message
- Click "Create Drop"

### 6. View on Map
- Go to Map View
- See your drop marked
- Try filters

---

## 🎨 Design Preview

### Color Scheme
The app uses a **Dark/Neon Green** theme:
- Background: Deep black (#0a0a0a)
- Primary: Neon Green (#00FF41)
- Text: Light gray (#fafafa)

### Key Visual Features
- **Animated Background**: Moving colored blobs
- **Glassmorphism**: Frosted glass effect on cards
- **Neon Glow**: Glowing buttons and effects
- **Smooth Animations**: Framer Motion throughout

---

## 📱 Responsive Design

### Desktop (>768px)
- Floating glass navbar at top
- Full sidebar layouts
- Large interactive map

### Mobile (<768px)
- Glass tab bar at bottom
- Simplified layouts
- Touch-optimized controls

---

## 🎬 Presentation Mode

Perfect for demos and pitches!

1. Go to [http://localhost:3000/presentation](http://localhost:3000/presentation)
2. Use **Arrow Keys** to navigate (Left/Right)
3. Press **N** to toggle speaker notes
4. Click dots to jump to slides

### Presentation Includes:
- Slide 1: Title & Hook
- Slide 2: The Problem
- Slide 3: The Solution
- Slide 4: Why Stellar (cost comparison)
- Slide 5: Business Model
- Slide 6: Smart Contracts
- Slide 7: Tech Stack
- Slide 8: QR Code Demo

---

## ⌨️ Keyboard Shortcuts

### Presentation Mode
- `←` Left Arrow: Previous slide
- `→` Right Arrow: Next slide
- `N`: Toggle speaker notes
- `Space`: Next slide

### General
- `Ctrl/Cmd + K`: Quick search (future feature)

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
npm install --force
```

### MongoDB connection error
- Skip MongoDB for UI testing
- Or use free MongoDB Atlas

### Freighter not detected
- Refresh page
- Check extension is installed
- Verify you're on Testnet

### Port 3000 already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

---

## 📚 Documentation

For detailed guides:
- 📖 [INSTALL.md](./INSTALL.md) - Full installation guide
- 🏃 [RUN.md](./RUN.md) - Running and testing
- 🚀 [DEPLOY.md](./DEPLOY.md) - Deployment to production
- 📝 [README.md](./README.md) - Project overview
- ✅ [CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md) - What's been built

---

## 🎯 What to Test

### Must-Try Features:
1. ✨ **Animated Landing** - See the moving blobs
2. 🔐 **Wallet Modal** - Modern wallet connection
3. 🎮 **Onboarding** - Choose user type
4. 📊 **Dashboard** - View stats
5. 🗺️ **Map** - Dark-themed interactive map
6. 💸 **Geo-Drop** - Create location-based drop
7. 🏆 **Badges** - Achievement system
8. 🎬 **Presentation** - Full-screen slides

---

## 💡 Pro Tips

### For Best Experience:
1. **Use Testnet** - Free XLM for testing
2. **Enable Location** - For geo-drop features
3. **Use Chrome/Firefox** - Best Freighter support
4. **Open DevTools** - See animations in slow-mo
5. **Try Mobile** - Open on phone for full experience

### For Demos:
1. **Pre-fund wallet** - Have test XLM ready
2. **Bookmark presentation** - Quick access
3. **Test geo-drops** - Create before demo
4. **Show mobile** - Use presentation QR code

---

## ⚡ Performance Notes

The app is optimized for:
- ✅ Fast page loads (<2s)
- ✅ Smooth 60fps animations
- ✅ Efficient re-renders
- ✅ Small bundle size
- ✅ Lazy-loaded maps

---

## 🎉 You're Ready!

Open [http://localhost:3000](http://localhost:3000) and start exploring!

**Questions?** Check the documentation files or the codebase comments.

**Having fun?** Share screenshots! This is "Hackathon Winner" quality design. 🏆

---

**StellarGo** - Crypto on the Streets 🚀

Built with Next.js, Stellar, and ❤️

