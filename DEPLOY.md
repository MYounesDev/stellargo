# StellarGo - Deployment Guide

This guide covers deploying StellarGo to production on Vercel and configuring the Stellar Network.

## Prerequisites

- Vercel account ([vercel.com](https://vercel.com))
- GitHub repository
- MongoDB Atlas account (or MongoDB hosting)
- Domain name (optional)

## Deployment Steps

### 1. Prepare for Production

#### Update Environment Variables

Create `.env.production`:

```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
STELLAR_NETWORK=TESTNET
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
```

#### Build and Test Locally

```bash
npm run build
npm run start
```

Verify everything works on [http://localhost:3000](http://localhost:3000).

### 2. Deploy to Vercel

#### Option A: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

#### Option B: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variables**
   
   Add these in Vercel dashboard:
   
   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | Your MongoDB connection string |
   | `STELLAR_NETWORK` | `TESTNET` or `PUBLIC` |
   | `STELLAR_HORIZON_URL` | Horizon URL |
   | `NEXT_PUBLIC_APP_URL` | Your Vercel URL |

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live! 🎉

### 3. Configure MongoDB Atlas

#### Create Production Database

1. **Sign in to MongoDB Atlas**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)

2. **Create Cluster**
   - Choose cloud provider (AWS, GCP, Azure)
   - Select region (closest to your users)
   - Choose tier (M0 Free is fine for MVP)

3. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add Vercel's IP ranges

4. **Create Database User**
   - Go to "Database Access"
   - Create new user with password
   - Grant read/write permissions

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Add to Vercel environment variables

### 4. Stellar Network Configuration

#### Using Testnet (Recommended for Development)

- Horizon URL: `https://horizon-testnet.stellar.org`
- Network Passphrase: `Test SDF Network ; September 2015`
- Fund accounts: [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)

#### Switching to Mainnet (Production)

⚠️ **Warning**: Only use mainnet when ready for real transactions with real XLM.

1. **Update Environment Variables**
   ```env
   STELLAR_NETWORK=PUBLIC
   STELLAR_HORIZON_URL=https://horizon.stellar.org
   ```

2. **Deploy Smart Contracts to Mainnet**
   ```bash
   cd soroban/geo_drop
   
   soroban contract deploy \
     --wasm target/wasm32-unknown-unknown/release/geo_drop.wasm \
     --source YOUR_MAINNET_SECRET_KEY \
     --network mainnet
   ```

3. **Update Contract ID**
   - Note the deployed contract ID
   - Update in your application configuration

4. **Test Thoroughly**
   - Test with small amounts first
   - Verify all transactions
   - Monitor error logs

### 5. Custom Domain (Optional)

#### Add Custom Domain in Vercel

1. Go to your project settings
2. Click "Domains"
3. Add your domain
4. Configure DNS records as shown

#### DNS Configuration

Add these records to your DNS provider:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### 6. Post-Deployment Configuration

#### Enable Analytics

1. In Vercel dashboard, go to "Analytics"
2. Enable Web Analytics
3. Monitor performance metrics

#### Set Up Monitoring

1. **Vercel Logs**
   - View real-time logs in dashboard
   - Set up log drains for production

2. **Error Tracking** (Optional)
   - Integrate Sentry or similar
   - Track errors in production

3. **Uptime Monitoring**
   - Use services like UptimeRobot
   - Monitor API endpoints

### 7. Continuous Deployment

With GitHub integration, Vercel automatically:

- **Deploys** every push to `main` branch
- **Creates previews** for pull requests
- **Runs builds** with your configuration

#### Branch Configuration

- `main` → Production deployment
- `develop` → Preview deployment
- Feature branches → Preview deployments

### 8. Performance Optimization

#### Enable Caching

Vercel automatically caches:
- Static assets
- API responses (with proper headers)
- Image optimization

#### Image Optimization

Next.js Image component is automatically optimized:
```tsx
import Image from 'next/image';

<Image src="/logo.png" alt="Logo" width={200} height={200} />
```

#### Enable Compression

Add to `next.config.js`:
```javascript
module.exports = {
  compress: true,
  // ... other config
}
```

## Security Checklist

- [ ] Environment variables are set correctly
- [ ] MongoDB has proper authentication
- [ ] API routes have rate limiting
- [ ] CORS is configured properly
- [ ] Sensitive data is not exposed
- [ ] HTTPS is enforced
- [ ] CSP headers are set

## Troubleshooting

### Build Fails

1. Check build logs in Vercel
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`

### Environment Variables Not Working

1. Ensure they're added in Vercel dashboard
2. Redeploy after adding variables
3. Check variable names match exactly

### MongoDB Connection Issues

1. Verify connection string
2. Check network access in Atlas
3. Ensure database user has permissions

### Stellar Network Issues

1. Verify Horizon URL is correct
2. Check network passphrase
3. Ensure accounts are funded (testnet)

## Rollback

If something goes wrong:

1. Go to Vercel dashboard
2. Click "Deployments"
3. Find previous working deployment
4. Click "Promote to Production"

## Monitoring & Maintenance

### Regular Tasks

- Monitor error rates
- Check database performance
- Review user feedback
- Update dependencies
- Scale MongoDB cluster as needed

### Scaling

Vercel automatically scales:
- Serverless functions
- Static assets
- Edge network

For MongoDB:
- Upgrade cluster tier in Atlas
- Enable auto-scaling
- Add read replicas for high traffic

## Cost Estimation

### Free Tier

- Vercel: Free for personal projects
- MongoDB Atlas: M0 Free (512MB)
- Stellar: Transactions cost ~$0.00001

### Production (Estimated Monthly)

- Vercel Pro: $20/month
- MongoDB Atlas M10: $57/month
- Domain: $10-15/year
- Total: ~$80/month

## Next Steps

After deployment:

1. Test all features in production
2. Set up monitoring and alerts
3. Configure backup strategy
4. Prepare user documentation
5. Plan marketing and user acquisition

## Support

For deployment issues:
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- MongoDB Docs: [docs.mongodb.com](https://docs.mongodb.com)
- Stellar Docs: [developers.stellar.org](https://developers.stellar.org)

---
**StellarGo** - Crypto on the Streets 🚀

