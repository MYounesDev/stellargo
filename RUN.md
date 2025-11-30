# StellarGo - Running the Application

This guide covers how to run the StellarGo application in development and production modes.

## Development Mode

### Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at:
- **Main App**: [http://localhost:3000](http://localhost:3000)
- **Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Presentation**: [http://localhost:3000/presentation](http://localhost:3000/presentation)

### Development Features

- ✅ Hot Module Replacement (HMR)
- ✅ Fast Refresh for React components
- ✅ Real-time error reporting
- ✅ TypeScript type checking

### Development Workflow

1. **Start the dev server**
   ```bash
   npm run dev
   ```

2. **Open Freighter Wallet**
   - Click the extension icon
   - Ensure you're on **Testnet**
   - Have some test XLM funded

3. **Connect Wallet**
   - Click "Connect Wallet" in the navbar
   - Approve the connection in Freighter

4. **Test Features**
   - Create a geo-drop
   - View the map
   - Claim drops
   - Check transaction history

## Production Build

### Build the Application

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Preview Production Build Locally

```bash
npm run start
```

The production build will run at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint checker |
| `npm run seed` | Seed database with sample data |

## Environment-Specific Configuration

### Development (.env.local)
```env
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/stellargo
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production (.env.production)
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Testing the Application

### 1. Landing Page
- Visit [http://localhost:3000](http://localhost:3000)
- Should see animated hero section
- Check leaderboard
- Test Q&A modal

### 2. Wallet Connection
- Click "Connect Wallet"
- Approve in Freighter
- Verify balance displays

### 3. Onboarding Flow
- First-time users see onboarding
- Select user type
- Enter username

### 4. Dashboard
- View stats and overview
- Check quick actions
- Recent activity list

### 5. Map View
- See nearby drops
- Filter by type
- Claim drops (must be within range)

### 6. Create Transfer/Drop
- Direct transfer tab
- Geo-drop tab with map
- Advanced settings

### 7. History
- View all transactions
- Filter by type
- Check transaction details

### 8. Profile
- Edit username and bio
- View badges
- Check stats

### 9. Presentation
- Navigate with arrow keys
- Test presenter notes (press 'N')
- Scan QR code

## Performance Monitoring

### Development Tools

1. **React DevTools**
   - Install browser extension
   - Monitor component renders

2. **Network Tab**
   - Check API response times
   - Monitor bundle sizes

3. **Lighthouse**
   - Run performance audit
   - Check accessibility score

## Common Development Issues

### Port Already in Use
```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Hot Reload Not Working
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Windows
net start MongoDB

# macOS
brew services restart mongodb-community

# Linux
sudo systemctl status mongod
```

### Wallet Connection Issues
- Ensure Freighter is on Testnet
- Clear browser cache
- Check console for errors

## Development Tips

### Fast Iteration
1. Keep dev server running
2. Use TypeScript for type safety
3. Check console for errors
4. Use React DevTools

### Code Quality
```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Testing Different Scenarios
1. Test with empty wallet
2. Test without location permission
3. Test on mobile (use ngrok or similar)
4. Test with slow network (Chrome DevTools throttling)

## Next Steps

For deployment instructions, see [DEPLOY.md](./DEPLOY.md).

---
**StellarGo** - Crypto on the Streets 🚀

