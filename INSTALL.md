# Complete Installation Guide for StellarGo

Step-by-step instructions to get StellarGo running on your machine.

---

## System Requirements

- **Operating System**: Windows, macOS, or Linux
- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **RAM**: Minimum 4GB
- **Disk Space**: 500MB for dependencies

---

## Installation Steps

### 1. Install Node.js

**Check if already installed:**
```bash
node --version
npm --version
```

If not installed:
- **Windows/Mac**: Download from [nodejs.org](https://nodejs.org)
- **Linux (Ubuntu/Debian)**:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

### 2. Install MongoDB

#### Option A: Local MongoDB (Recommended for Development)

**macOS:**
```bash
# Install via Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**Windows:**
1. Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run installer (choose Complete installation)
3. Install as a Service (check option during install)
4. MongoDB starts automatically

**Linux (Ubuntu):**
```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start service
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Verify MongoDB is running:**
```bash
mongosh
# Should connect successfully
```

#### Option B: MongoDB Atlas (Cloud - No Installation)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free
3. Create a new cluster (M0 Free tier)
4. Set up database access (username/password)
5. Add IP to whitelist: `0.0.0.0/0` (for development)
6. Get connection string
7. Skip local MongoDB setup

### 3. Install Freighter Wallet

**Browser Extension:**
1. Visit [freighter.app](https://www.freighter.app)
2. Click "Add to Chrome" (or your browser)
3. Install extension
4. Create new wallet
5. **IMPORTANT**: Save your 12-word recovery phrase securely!

**Get Test XLM:**
```bash
# After wallet is created, visit:
https://laboratory.stellar.org/#account-creator

# Or use curl:
curl "https://friendbot.stellar.org/?addr=YOUR_PUBLIC_KEY"
```

### 4. Clone StellarGo Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/stellargo.git
cd stellargo

# Or download ZIP and extract
```

### 5. Install Dependencies

```bash
# Install all npm packages
npm install

# This will take 2-5 minutes
# Expected: ~1500 packages installed
```

If you see any warnings about peer dependencies, they're usually safe to ignore.

### 6. Configure Environment Variables

```bash
# Copy example environment file
cp .env.example .env

# Edit .env file
# Windows: notepad .env
# Mac/Linux: nano .env
```

**Required Configuration:**

```env
# MongoDB (choose one)
# Local:
MONGODB_URI=mongodb://localhost:27017/stellargo
# OR Atlas:
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/stellargo

# Stellar Network (use TESTNET for development)
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET

# Holding Wallet
# Create a second wallet in Freighter for this
NEXT_PUBLIC_HOLDING_WALLET_ADDRESS=GXXXX...
HOLDING_WALLET_SECRET=SXXXX...
```

**How to get holding wallet credentials:**
1. Open Freighter
2. Create or import a second account
3. Copy public key → `NEXT_PUBLIC_HOLDING_WALLET_ADDRESS`
4. Export private key → `HOLDING_WALLET_SECRET`
5. Get test XLM from Friendbot

### 7. Seed Database

```bash
npm run seed
```

**Expected output:**
```
🌱 Starting database seeding...
✅ Connected to MongoDB
🗑️  Clearing existing drops...
🎲 Generating drops...
💾 Inserting drops into database...
✨ Seeding completed successfully!
📊 Created 30 drops around Istanbul
💰 Total value: 245.50 XLM
🔓 Unclaimed: 24
🔒 Claimed: 6
```

If this fails:
- Check MongoDB is running (`mongosh`)
- Verify `MONGODB_URI` in `.env`
- Check database permissions

### 8. Start Development Server

```bash
npm run dev
```

**Expected output:**
```
> stellargo@0.1.0 dev
> next dev

  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Ready in 3.2s
```

### 9. Open in Browser

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the StellarGo dashboard
3. Click "Connect Wallet" in top right
4. Approve connection in Freighter popup
5. You're ready to use StellarGo!

---

## Verification Checklist

After installation, verify everything works:

- [ ] Website loads at `localhost:3000`
- [ ] Map displays correctly
- [ ] Drops visible on map (30 markers)
- [ ] Wallet connects successfully
- [ ] Balance displays in navbar
- [ ] Can click map to create drop
- [ ] Can open drop modal
- [ ] Can navigate to AI Trader
- [ ] Can navigate to FAQ
- [ ] Mobile view works (DevTools → Toggle device toolbar)
- [ ] No console errors (F12 → Console tab)

---

## Common Installation Issues

### Issue 1: "npm install" fails

**Error:** `ERESOLVE unable to resolve dependency tree`

**Solution:**
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Issue 2: MongoDB connection fails

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not running:
# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod

# Windows: Start MongoDB service from Services app
```

### Issue 3: Port 3000 already in use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Option 1: Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Option 2: Use different port
PORT=3001 npm run dev
```

### Issue 4: Freighter not found

**Error:** `Freighter wallet is not installed`

**Solution:**
1. Install Freighter extension
2. Refresh browser page
3. Click connect again
4. Make sure extension is enabled

### Issue 5: Seeding fails

**Error:** `MongooseError: buffering timed out`

**Solution:**
```bash
# Check MongoDB connection string
echo $MONGODB_URI  # Mac/Linux
echo %MONGODB_URI%  # Windows

# Test connection
mongosh "$MONGODB_URI"

# If using Atlas, check:
# - IP whitelist (0.0.0.0/0 for dev)
# - Username/password correct
# - Network restrictions
```

---

## Development Workflow

### Daily Startup
```bash
# 1. Start MongoDB (if local)
brew services start mongodb-community  # or equivalent

# 2. Navigate to project
cd stellargo

# 3. Start dev server
npm run dev

# 4. Open browser to localhost:3000
```

### Making Changes
```bash
# Files auto-reload on save
# Just edit and refresh browser
# No need to restart server
```

### Stopping
```bash
# Press Ctrl+C in terminal to stop server
# MongoDB can keep running
```

---

## Building for Production

```bash
# 1. Build optimized version
npm run build

# 2. Test production build locally
npm start

# 3. Deploy (see DEPLOYMENT.md)
vercel --prod
```

---

## Uninstallation

If you need to remove StellarGo:

```bash
# 1. Stop development server (Ctrl+C)

# 2. Remove project directory
rm -rf stellargo

# 3. (Optional) Uninstall MongoDB
# macOS:
brew services stop mongodb-community
brew uninstall mongodb-community

# Windows: Uninstall from Control Panel

# 4. (Optional) Remove Freighter extension
# Browser → Extensions → Remove Freighter
```

---

## Next Steps

After successful installation:

1. 📖 **Read Documentation**
   - [QUICKSTART.md](QUICKSTART.md) - Quick reference
   - [SETUP.md](SETUP.md) - Detailed features guide
   - [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Architecture

2. 🎮 **Try Features**
   - Create a drop
   - Claim a drop (mock your location)
   - Try AI Trader
   - Test mobile view

3. 🚀 **Deploy**
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to Vercel
   - [HACKATHON_DEMO.md](HACKATHON_DEMO.md) - Demo guide

4. 🤝 **Contribute**
   - [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide
   - Open issues or PRs on GitHub

---

## Getting Help

**Installation Issues:**
1. Check this guide's Common Issues section
2. Review [SETUP.md](SETUP.md) for more details
3. Open GitHub issue with error details
4. Ask in Stellar Discord

**Development Questions:**
- Check [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- Review code comments
- See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## System Check Script

Create a file `check-setup.js`:

```javascript
// Run with: node check-setup.js
const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔍 Checking StellarGo setup...\n');

const checks = {
  'Node.js': () => execSync('node --version').toString().trim(),
  'npm': () => execSync('npm --version').toString().trim(),
  '.env file': () => fs.existsSync('.env') ? '✓ Found' : '✗ Missing',
  'node_modules': () => fs.existsSync('node_modules') ? '✓ Installed' : '✗ Run npm install',
};

for (const [name, check] of Object.entries(checks)) {
  try {
    console.log(`${name}: ${check()}`);
  } catch (error) {
    console.log(`${name}: ✗ Not found`);
  }
}

console.log('\n✅ Setup check complete!');
```

Run: `node check-setup.js`

---

**Installation complete! Happy coding! 🚀**

For questions or issues, see our [documentation](README.md) or open a [GitHub issue](https://github.com/yourusername/stellargo/issues).

