# StellarGo Project Structure

Complete overview of the project architecture, file organization, and technical stack.

## 📁 Directory Structure

```
stellargo/
│
├── src/                           # Source code
│   ├── app/                       # Next.js App Router
│   │   ├── page.tsx              # Dashboard (/)
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── api/                  # API routes
│   │   │   └── drops/
│   │   │       ├── route.ts      # GET/POST drops
│   │   │       └── [id]/
│   │   │           └── claim/
│   │   │               └── route.ts  # POST claim drop
│   │   ├── ai-trader/
│   │   │   └── page.tsx          # AI Trader UI
│   │   └── faq/
│   │       └── page.tsx          # FAQ page
│   │
│   ├── components/                # React components
│   │   ├── Button.tsx            # Reusable button
│   │   ├── Card.tsx              # Card container
│   │   ├── Modal.tsx             # Modal dialog
│   │   ├── DropModal.tsx         # Drop creation modal
│   │   ├── MapView.tsx           # Leaflet map component
│   │   ├── Navbar.tsx            # Navigation bar
│   │   └── FullscreenButton.tsx  # Mobile fullscreen toggle
│   │
│   ├── lib/                       # Utilities and configs
│   │   ├── mongodb.ts            # MongoDB connection
│   │   ├── stellar.ts            # Stellar utilities
│   │   └── freighter.ts          # Wallet integration
│   │
│   ├── models/                    # Database models
│   │   └── Drop.ts               # Drop schema
│   │
│   └── types/                     # TypeScript types
│       └── index.ts              # Type definitions
│
├── soroban/                       # Smart contracts
│   ├── geo_drop/                 # Main contract
│   │   ├── src/
│   │   │   └── lib.rs           # Contract logic
│   │   └── Cargo.toml           # Rust dependencies
│   └── README.md                 # Contract docs
│
├── scripts/                       # Utility scripts
│   └── seed.js                   # Database seeding
│
├── public/                        # Static assets
│   └── favicon.ico               # Favicon
│
├── Configuration Files
├── package.json                   # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
├── next.config.js                # Next.js config
├── postcss.config.js             # PostCSS config
├── .gitignore                    # Git ignore rules
├── .env.example                  # Environment template
│
└── Documentation
    ├── README.md                  # Project overview
    ├── SETUP.md                   # Setup guide
    ├── DEPLOYMENT.md              # Deployment guide
    ├── CONTRIBUTING.md            # Contribution guide
    └── PROJECT_STRUCTURE.md       # This file
```

## 🏗️ Architecture Overview

### Frontend Architecture

```
┌─────────────────────────────────────────┐
│           User Interface                 │
│  (Next.js + React + Tailwind CSS)       │
├─────────────────────────────────────────┤
│                                          │
│  ┌─────────────┐  ┌─────────────┐      │
│  │  Dashboard  │  │ AI Trader   │      │
│  │  + Map      │  │             │      │
│  └─────────────┘  └─────────────┘      │
│                                          │
│  ┌─────────────┐  ┌─────────────┐      │
│  │   Wallet    │  │     FAQ     │      │
│  │ Integration │  │             │      │
│  └─────────────┘  └─────────────┘      │
│                                          │
└─────────────────────────────────────────┘
           │                    │
           ▼                    ▼
┌──────────────────┐  ┌──────────────────┐
│   API Routes     │  │  Freighter API   │
│   (Next.js)      │  │  (Wallet)        │
└──────────────────┘  └──────────────────┘
           │                    │
           ▼                    ▼
┌──────────────────┐  ┌──────────────────┐
│    MongoDB       │  │  Stellar Network │
│   (Database)     │  │   (Blockchain)   │
└──────────────────┘  └──────────────────┘
```

### Data Flow

#### Creating a Drop

```
User clicks map
    ↓
DropModal opens
    ↓
User enters amount + message
    ↓
Submit → API /api/drops (POST)
    ↓
├─ Save to MongoDB
└─ (Future: Transfer XLM to holding wallet)
    ↓
Return success
    ↓
Refresh map with new drop
```

#### Claiming a Drop

```
User near drop location
    ↓
"Claim" button activates
    ↓
User clicks claim
    ↓
API /api/drops/[id]/claim (POST)
    ↓
├─ Verify proximity (50m)
├─ Check if unclaimed
├─ (Future: Transfer XLM to user)
└─ Mark as claimed in DB
    ↓
Return success
    ↓
Update drop status on map
```

## 🔧 Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.0.4 | React framework with App Router |
| React | 18.2.0 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.3.0 | Styling |
| Leaflet | 1.9.4 | Interactive maps |
| React-Leaflet | 4.2.1 | React bindings for Leaflet |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js API Routes | 14.0.4 | RESTful API |
| MongoDB | 8.0.3 | Database |
| Mongoose | 8.0.3 | ODM for MongoDB |

### Blockchain

| Technology | Version | Purpose |
|------------|---------|---------|
| Stellar SDK | 11.3.0 | Stellar blockchain interaction |
| Freighter API | 1.7.1 | Wallet connection |
| Soroban | 20.0.0 | Smart contracts |

### Development

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| TypeScript | Type checking |
| Git | Version control |
| Vercel | Deployment |

## 📊 Database Schema

### Drop Collection

```typescript
{
  _id: ObjectId,
  location: {
    type: "Point",
    coordinates: [longitude, latitude]  // GeoJSON format
  },
  amount: Number,              // XLM amount
  message: String,             // User message (max 200 chars)
  createdBy: String,          // Creator wallet address
  claimed: Boolean,            // Claim status
  claimedBy?: String,         // Claimer wallet address
  claimedAt?: Date,           // Claim timestamp
  transactionHash?: String,   // Blockchain transaction hash
  createdAt: Date,            // Auto-generated
  updatedAt: Date             // Auto-generated
}

// Indexes
- location: 2dsphere (for geospatial queries)
- claimed + createdAt (for querying unclaimed drops)
```

### Geospatial Queries

```javascript
// Find drops within 5km of a point
db.drops.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
      $maxDistance: 5000  // meters
    }
  }
})
```

## 🎨 Component Hierarchy

```
App Layout
├── Navbar
│   ├── Logo
│   ├── Navigation Links
│   └── Wallet Connection
│       ├── Connect Button
│       └── Wallet Info (balance, address)
│
├── Page: Dashboard (/)
│   ├── Sidebar
│   │   ├── Stats Cards
│   │   └── Instructions
│   └── MapView
│       ├── TileLayer (OpenStreetMap)
│       ├── User Marker
│       ├── Proximity Circle (50m)
│       └── Drop Markers
│           └── Popup
│               ├── Drop Info
│               └── Claim Button
│
├── Page: AI Trader (/ai-trader)
│   └── Card
│       ├── Message List
│       └── Input Area
│
├── Page: FAQ (/faq)
│   └── FAQ Sections
│       └── Cards (questions)
│
├── Modals
│   └── DropModal
│       ├── Location Display
│       ├── Amount Input
│       ├── Message Input
│       └── Action Buttons
│
└── FullscreenButton (mobile only)
```

## 🔌 API Endpoints

### Drops API

#### GET /api/drops
**Description:** Fetch all drops or drops near a location

**Query Parameters:**
- `latitude` (optional): User latitude
- `longitude` (optional): User longitude
- `radius` (optional): Search radius in meters (default: 5000)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "location": {
        "type": "Point",
        "coordinates": [28.9784, 41.0082]
      },
      "amount": 10.5,
      "message": "Coffee on me!",
      "createdBy": "GABC...",
      "claimed": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/drops
**Description:** Create a new drop

**Request Body:**
```json
{
  "latitude": 41.0082,
  "longitude": 28.9784,
  "amount": 10.5,
  "message": "Coffee on me!",
  "createdBy": "GABC...",
  "transactionHash": "abc123..."
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* drop object */ },
  "message": "Drop created successfully"
}
```

#### POST /api/drops/[id]/claim
**Description:** Claim a drop

**Request Body:**
```json
{
  "userPublicKey": "GXYZ...",
  "userLatitude": 41.0082,
  "userLongitude": 28.9784,
  "transactionHash": "def456..."
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* updated drop */ },
  "message": "Drop claimed successfully"
}
```

## 🎯 Key Features Implementation

### 1. Wallet Connection

**Files:**
- `src/lib/freighter.ts` - Freighter integration
- `src/components/Navbar.tsx` - UI for connection

**Flow:**
1. User clicks "Connect Wallet"
2. Freighter popup appears
3. User approves connection
4. Public key stored in localStorage
5. Balance fetched from Stellar

### 2. Interactive Map

**Files:**
- `src/components/MapView.tsx` - Map component
- `src/app/page.tsx` - Dashboard integration

**Features:**
- Click to create drop
- User location marker
- Drop markers with popups
- 50m proximity circle
- Claim button when in range

### 3. Geo-Drop Creation

**Files:**
- `src/components/DropModal.tsx` - Creation UI
- `src/app/api/drops/route.ts` - API handler

**Validation:**
- Amount ≥ 0.1 XLM
- Message ≤ 200 characters
- Valid coordinates
- Wallet connected

### 4. Proximity-Based Claiming

**Files:**
- `src/lib/stellar.ts` - Distance calculation
- `src/app/api/drops/[id]/claim/route.ts` - Claim handler

**Logic:**
```typescript
function isWithinRange(
  userLat: number,
  userLon: number,
  dropLat: number,
  dropLon: number,
  rangeMeters: number = 50
): boolean {
  const distance = haversineDistance(...);
  return distance <= rangeMeters;
}
```

### 5. Responsive Design

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile Features:**
- Collapsible navigation
- Fullscreen mode button
- Touch-optimized map
- Stack layout

### 6. AI Trader (Mock)

**Files:**
- `src/app/ai-trader/page.tsx`

**Features:**
- Chat interface
- Predefined responses
- Token analysis mockups
- Buy/Sell recommendations

## 🔐 Security Considerations

### Current Implementation

✅ **Implemented:**
- Private keys never leave user device
- All transactions signed client-side
- Environment variables for secrets
- Input validation
- Proximity verification
- MongoDB injection prevention (Mongoose)

⚠️ **MVP Limitations:**
- Location verification client-side only
- No rate limiting
- No CAPTCHA
- Simplified transaction flow

### Production Recommendations

- [ ] Add server-side location verification
- [ ] Implement rate limiting (express-rate-limit)
- [ ] Add CAPTCHA for claims
- [ ] Smart contract audit
- [ ] Implement HTTPS only
- [ ] Add transaction confirmations
- [ ] Set up error monitoring (Sentry)
- [ ] Add database backups
- [ ] Implement proper logging

## 📈 Performance Optimization

### Current Optimizations

1. **Code Splitting:**
   - MapView loaded dynamically
   - Reduces initial bundle size

2. **MongoDB Indexes:**
   - 2dsphere for location queries
   - Compound index for claims

3. **Client-Side Caching:**
   - Wallet address in localStorage
   - Drop data cached during session

4. **Optimized Builds:**
   - Next.js automatic optimization
   - Tailwind CSS purging

### Future Optimizations

- [ ] Implement Redis caching
- [ ] Add CDN for static assets
- [ ] Enable Next.js ISR
- [ ] Optimize images
- [ ] Implement service workers
- [ ] Add database query optimization

## 🧪 Testing Strategy

### Unit Tests
- Component rendering
- Utility functions
- API route handlers
- Smart contract functions

### Integration Tests
- Wallet connection flow
- Drop creation flow
- Claim flow
- API endpoint interactions

### E2E Tests
- Complete user journeys
- Cross-browser testing
- Mobile device testing

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Stellar Developers Guide](https://developers.stellar.org)
- [MongoDB Manual](https://docs.mongodb.com/manual)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

Last Updated: 2024
Version: 0.1.0 (MVP)

