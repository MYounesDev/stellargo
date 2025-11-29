# StellarGo Deployment Guide

Complete deployment instructions for production and hackathon demos.

## Table of Contents
1. [Quick Deploy to Vercel](#quick-deploy-to-vercel)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Stellar Wallet Configuration](#stellar-wallet-configuration)
4. [Environment Variables](#environment-variables)
5. [Pre-Deployment Checklist](#pre-deployment-checklist)
6. [Deployment Steps](#deployment-steps)
7. [Post-Deployment](#post-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Quick Deploy to Vercel

The fastest way to deploy StellarGo for your hackathon demo:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

Follow the prompts and add environment variables (see below).

---

## MongoDB Atlas Setup

### 1. Create Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free tier
3. Choose cloud provider (AWS recommended)
4. Select region closest to users

### 2. Create Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free)
3. Select region
4. Name cluster "stellargo"

### 3. Configure Access
```
Database Access:
- Username: stellargo_admin
- Password: <generate-secure-password>
- Role: Read and write to any database

Network Access:
- Add IP: 0.0.0.0/0 (allow all - for development)
- For production: Add Vercel IPs
```

### 4. Get Connection String
```
Format: mongodb+srv://stellargo_admin:<password>@cluster0.xxxxx.mongodb.net/stellargo?retryWrites=true&w=majority

Replace <password> with your actual password
```

### 5. Seed Database
```bash
# Update .env with Atlas URI
MONGODB_URI="mongodb+srv://stellargo_admin:PASSWORD@cluster0.xxxxx.mongodb.net/stellargo"

# Run seed script
npm run seed
```

---

## Stellar Wallet Configuration

### Create Holding Wallet

The holding wallet stores drops until they're claimed.

#### Option A: Using Stellar Laboratory

1. Visit [laboratory.stellar.org](https://laboratory.stellar.org/#account-creator)
2. Click "Generate keypair"
3. Save both keys securely:
   - **Public Key**: `G...` (share this)
   - **Secret Key**: `S...` (NEVER share!)
4. Click "Get test lumens" to fund account

#### Option B: Using Stellar CLI

```bash
# Install Stellar CLI
npm install -g stellar-cli

# Create account
stellar account create holding --network testnet

# Fund account
stellar account fund holding --network testnet
```

### Best Practices

🔐 **Security:**
- Never commit secret keys to Git
- Use environment variables
- Different wallets for dev/prod
- Keep backups of recovery phrases

💰 **Funding:**
- Testnet: Get free XLM from Friendbot
- Mainnet: Fund with real XLM (minimum 1 XLM)

---

## Environment Variables

### Required Variables

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/stellargo

# Stellar Network
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET

# Holding Wallet (stores drops)
NEXT_PUBLIC_HOLDING_WALLET_ADDRESS=GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
HOLDING_WALLET_SECRET=SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Setting in Vercel

1. Go to your project dashboard
2. Settings → Environment Variables
3. Add each variable:
   - Name: `MONGODB_URI`
   - Value: `your-connection-string`
   - Environment: Production, Preview, Development

### Setting Locally

```bash
# Create .env file (already done)
cp .env.example .env

# Edit with your values
nano .env
```

---

## Pre-Deployment Checklist

### Code
- [ ] All TypeScript errors resolved
- [ ] No console errors in browser
- [ ] Responsive design tested (mobile + desktop)
- [ ] All pages load correctly
- [ ] Wallet connection works
- [ ] Map displays properly
- [ ] Drop creation/claiming works

### Environment
- [ ] MongoDB Atlas cluster created
- [ ] Database seeded with test data
- [ ] Holding wallet created and funded
- [ ] Environment variables configured
- [ ] `.gitignore` includes `.env`

### Testing
- [ ] Test wallet connection
- [ ] Test drop creation
- [ ] Test drop claiming
- [ ] Test on mobile device
- [ ] Test fullscreen mode
- [ ] Test AI Trader
- [ ] Check FAQ page

---

## Deployment Steps

### Step 1: Build Locally

```bash
# Test production build
npm run build

# Test production server
npm start

# Visit http://localhost:3000
```

Fix any build errors before deploying.

### Step 2: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add files
git add .

# Commit
git commit -m "Initial commit - StellarGo hackathon project"

# Add remote
git remote add origin https://github.com/yourusername/stellargo.git

# Push
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Via GitHub Integration (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repo
4. Configure:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variables
6. Click "Deploy"

#### Via CLI

```bash
# Login
vercel login

# Deploy
vercel

# Follow prompts
? Set up and deploy "~/stellargo"? [Y/n] y
? Which scope? Your Account
? Link to existing project? [y/N] n
? What's your project's name? stellargo
? In which directory is your code located? ./

# Deploy to production
vercel --prod
```

### Step 4: Configure Domain (Optional)

```bash
# Add custom domain
vercel domains add stellargo.yourdomain.com

# Or use Vercel domain
# stellargo.vercel.app
```

---

## Post-Deployment

### 1. Verify Deployment

```bash
# Check deployment URL
https://stellargo.vercel.app

# Test features:
✓ Wallet connection
✓ Map loads
✓ Drops visible
✓ Create drop
✓ Claim drop (mock location)
✓ AI Trader
✓ FAQ page
✓ Mobile responsive
✓ Fullscreen mode
```

### 2. Seed Production Database

```bash
# Update local .env with production MongoDB URI
MONGODB_URI="mongodb+srv://..."

# Run seed
npm run seed

# Or connect to production MongoDB directly
```

### 3. Monitor Application

**Vercel Dashboard:**
- Deployment status
- Function logs
- Analytics
- Performance metrics

**MongoDB Atlas:**
- Database size
- Query performance
- Connection count

### 4. Share Demo

```markdown
🎉 StellarGo is live!

📱 Demo: https://stellargo.vercel.app
💻 GitHub: https://github.com/yourusername/stellargo
📖 Docs: https://github.com/yourusername/stellargo#readme

Features:
✅ Location-based crypto drops
✅ Interactive map
✅ AI trading assistant
✅ Built on Stellar Network
```

---

## Troubleshooting

### Build Fails

**Error:** Module not found
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error:** TypeScript errors
```bash
# Solution: Check types
npm run lint
# Fix reported errors
```

### Deployment Fails

**Error:** Environment variables missing
```bash
# Solution: Add in Vercel dashboard
Settings → Environment Variables

# Required:
- MONGODB_URI
- NEXT_PUBLIC_STELLAR_NETWORK
- NEXT_PUBLIC_HOLDING_WALLET_ADDRESS
- HOLDING_WALLET_SECRET
```

**Error:** MongoDB connection failed
```bash
# Solution: Check connection string
# Ensure IP whitelist includes 0.0.0.0/0
# Or add Vercel IPs specifically
```

### Runtime Errors

**Error:** Map not loading
```bash
# Solution: Check browser console
# Ensure Leaflet CSS loaded
# Check if running client-side only
```

**Error:** Wallet won't connect
```bash
# Solution:
- Check Freighter installed
- Verify on correct network (Testnet)
- Check browser console for errors
```

**Error:** Database queries fail
```bash
# Solution:
- Verify MongoDB connection
- Check indexes created
- Review API route logs in Vercel
```

---

## Performance Optimization

### For Production

1. **Enable Caching:**
```javascript
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, must-revalidate',
        },
      ],
    },
  ],
}
```

2. **Optimize Images:**
```bash
# Use Next.js Image component
import Image from 'next/image'
```

3. **Enable MongoDB Indexes:**
```javascript
// Already done in Drop model
DropSchema.index({ location: '2dsphere' });
DropSchema.index({ claimed: 1, createdAt: -1 });
```

---

## Security Hardening

### For Production Launch

1. **API Rate Limiting:**
```bash
npm install express-rate-limit
```

2. **CORS Configuration:**
```javascript
// In API routes
headers: {
  'Access-Control-Allow-Origin': 'https://stellargo.vercel.app',
}
```

3. **Input Validation:**
```bash
npm install joi
# Add validation schemas
```

4. **Smart Contract Audit:**
- Test thoroughly on testnet
- Hire security auditor for mainnet
- Implement emergency pause

---

## Mainnet Migration

When ready for mainnet:

1. **Update Network:**
```env
NEXT_PUBLIC_STELLAR_NETWORK=PUBLIC
```

2. **Create Mainnet Wallets:**
- Fund with real XLM
- Secure private keys in vault

3. **Deploy Smart Contracts:**
```bash
cd soroban/geo_drop
soroban contract deploy --network public
```

4. **Update Frontend:**
- Point to mainnet Horizon
- Update contract addresses

5. **Enable Monitoring:**
- Error tracking (Sentry)
- Analytics (Vercel Analytics)
- Uptime monitoring

---

## Support & Resources

- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Stellar Docs](https://developers.stellar.org)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## License

MIT License - Built for hackathon purposes

**Good luck with your deployment! 🚀**

