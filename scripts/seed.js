require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stellargo';

// User Schema
const UserSchema = new mongoose.Schema(
  {
    publicKey: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      maxlength: 50,
    },
    bio: {
      type: String,
      maxlength: 200,
    },
    persona: {
      type: String,
      enum: ['personal', 'business', 'nonprofit'],
      required: true,
    },
    badge: {
      type: String,
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
    },
    totalDropsCreated: {
      type: Number,
      default: 0,
    },
    totalDropsClaimed: {
      type: Number,
      default: 0,
    },
    totalAmountSent: {
      type: Number,
      default: 0,
    },
    totalAmountReceived: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Drop Schema
const DropSchema = new mongoose.Schema(
  {
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    amount: {
      type: Number,
      required: true,
      min: 0.1,
    },
    message: {
      type: String,
      required: true,
      maxlength: 200,
    },
    createdBy: {
      type: String,
      required: true,
    },
    claimed: {
      type: Boolean,
      default: false,
    },
    claimedBy: {
      type: String,
    },
    claimedAt: {
      type: Date,
    },
    transactionHash: {
      type: String,
    },
    targetAudience: {
      type: String,
      enum: ['public', 'friends', 'customers'],
      default: 'public',
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

DropSchema.index({ location: '2dsphere' });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Drop = mongoose.models.Drop || mongoose.model('Drop', DropSchema);

// Istanbul center coordinates
const ISTANBUL_CENTER = {
  latitude: 41.0082,
  longitude: 28.9784,
};

// Generate random coordinate offset within radius (in degrees, roughly 5km)
function randomOffset(maxOffset = 0.05) {
  return (Math.random() - 0.5) * maxOffset;
}

// Sample messages for drops by persona
const personalMessages = [
  'Coffee on me! ☕',
  'Found this, enjoy! 🎁',
  'First to find wins! 🏆',
  'Happy treasure hunting! 🗺️',
  'Your lucky day! 🍀',
  'Keep exploring! 🧭',
  'Adventure awaits! ⚡',
  'Crypto treasure hunt! 🏴‍☠️',
  'Find me if you can! 🎯',
  'Random act of kindness 🌟',
];

const businessMessages = [
  'Thanks for being a loyal customer! 💼',
  'Welcome to our store! 🏪',
  'Grand opening special! 🎉',
  'Customer appreciation reward 🌟',
  'Visit us again soon! 🛍️',
  'Thanks for your business! 💰',
  'Exclusive customer offer! ⭐',
  'Come check out our new location! 📍',
];

const nonprofitMessages = [
  'Community support fund 💙',
  'Thank you for making a difference! 🙏',
  'Together we can help more! 🤝',
  'Spreading hope in the community ❤️',
  'Your kindness matters! 💚',
  'Building a better tomorrow 🌈',
  'Charity starts here! ✨',
  'Help us help others! 🌍',
];

// Sample usernames by persona
const personalUsernames = [
  'CryptoExplorer', 'TreasureHunter', 'AdventureSeeker', 'UrbanNomad', 'MapWanderer',
  'CoinCollector', 'DigitalVoyager', 'GeoHunter', 'TokenTracker', 'CryptoNinja'
];

const businessUsernames = [
  'IstanbulCafe', 'TechStartupTR', 'LocalBakery', 'CoffeeCornr', 'BookshopTR',
  'FitnessStudio', 'ArtGalleryIST', 'RestaurantX', 'RetailShop', 'CoWorkingSpace'
];

const nonprofitUsernames = [
  'HelpingHands', 'CommunityFirst', 'HopeFoundation', 'GiveBack', 'CharityTR',
  'SocialGood', 'BetterWorld', 'UnitedCause', 'KindnessProject', 'ChangeMakers'
];

// Generate users
function generateUsers() {
  const users = [];
  
  // 5 Personal users
  for (let i = 0; i < 5; i++) {
    const publicKey = `GPERSONAL${String(i).padStart(48, '0')}WHF`;
    users.push({
      publicKey,
      username: personalUsernames[i],
      bio: 'Love discovering and sharing crypto drops around the city!',
      persona: 'personal',
      level: Math.floor(Math.random() * 10) + 1,
      totalDropsCreated: Math.floor(Math.random() * 20),
      totalDropsClaimed: Math.floor(Math.random() * 30),
      totalAmountSent: Math.random() * 100,
      totalAmountReceived: Math.random() * 80,
    });
  }
  
  // 3 Business users
  for (let i = 0; i < 3; i++) {
    const publicKey = `GBUSINESS${String(i).padStart(48, '0')}WHF`;
    users.push({
      publicKey,
      username: businessUsernames[i],
      bio: 'Using StellarGo to reward our amazing customers!',
      persona: 'business',
      badge: 'Verified Business',
      level: Math.floor(Math.random() * 8) + 2,
      totalDropsCreated: Math.floor(Math.random() * 40) + 10,
      totalDropsClaimed: Math.floor(Math.random() * 10),
      totalAmountSent: Math.random() * 200 + 50,
      totalAmountReceived: Math.random() * 30,
    });
  }
  
  // 2 Non-profit users
  for (let i = 0; i < 2; i++) {
    const publicKey = `GNONPROFIT${String(i).padStart(47, '0')}WHF`;
    users.push({
      publicKey,
      username: nonprofitUsernames[i],
      bio: 'Making a difference, one drop at a time. Join our cause!',
      persona: 'nonprofit',
      badge: 'Verified Non-Profit',
      level: Math.floor(Math.random() * 6) + 3,
      totalDropsCreated: Math.floor(Math.random() * 25) + 5,
      totalDropsClaimed: Math.floor(Math.random() * 15),
      totalAmountSent: Math.random() * 150 + 30,
      totalAmountReceived: Math.random() * 100 + 20,
    });
  }
  
  return users;
}

// Generate drops
function generateDrops(users, count = 50) {
  const drops = [];

  for (let i = 0; i < count; i++) {
    // Random location around Istanbul
    const latitude = ISTANBUL_CENTER.latitude + randomOffset(0.08);
    const longitude = ISTANBUL_CENTER.longitude + randomOffset(0.1);

    // Select random user
    const creator = users[Math.floor(Math.random() * users.length)];
    
    // Select message based on persona
    let messages, targetAudience;
    if (creator.persona === 'personal') {
      messages = personalMessages;
      targetAudience = 'public';
    } else if (creator.persona === 'business') {
      messages = businessMessages;
      targetAudience = Math.random() < 0.7 ? 'customers' : 'public';
    } else {
      messages = nonprofitMessages;
      targetAudience = 'public';
    }

    // Random amount based on persona
    let amount;
    if (creator.persona === 'business') {
      amount = Math.floor(Math.random() * 95) / 10 + 5; // 5-15 XLM
    } else if (creator.persona === 'nonprofit') {
      amount = Math.floor(Math.random() * 195) / 10 + 5; // 5-25 XLM
    } else {
      amount = Math.floor(Math.random() * 495) / 10 + 0.5; // 0.5-50 XLM
    }

    const message = messages[Math.floor(Math.random() * messages.length)];

    // 30% chance of being claimed
    const claimed = Math.random() < 0.3;
    
    // Expiration (some drops expire)
    let expiresAt = null;
    if (Math.random() < 0.3) {
      expiresAt = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000); // Random time in next week
    }

    const drop = {
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      amount: parseFloat(amount.toFixed(2)),
      message,
      createdBy: creator.publicKey,
      claimed,
      targetAudience,
      expiresAt,
    };

    // If claimed, add claim details
    if (claimed) {
      const claimer = users[Math.floor(Math.random() * users.length)];
      drop.claimedBy = claimer.publicKey;
      drop.claimedAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Random time in last week
    }

    drops.push(drop);
  }

  return drops;
}

// Seed function
async function seed() {
  try {
    console.log('🌱 Starting database seeding...');
    console.log(`📡 Connecting to MongoDB: ${MONGODB_URI}`);

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Drop.deleteMany({});
    console.log('✅ Existing data cleared');

    // Generate and insert users
    console.log('👤 Generating users...');
    const users = generateUsers();
    await User.insertMany(users);
    console.log(`✅ Created ${users.length} users`);

    // Generate and insert drops
    console.log('🎲 Generating drops...');
    const drops = generateDrops(users, 50);
    await Drop.insertMany(drops);
    console.log(`✅ Created ${drops.length} drops`);

    console.log('\n✨ Seeding completed successfully!');
    console.log(`\n📊 Statistics:`);
    console.log(`   Users: ${users.length} (${users.filter(u => u.persona === 'personal').length} personal, ${users.filter(u => u.persona === 'business').length} business, ${users.filter(u => u.persona === 'nonprofit').length} nonprofit)`);
    console.log(`   Drops: ${drops.length}`);
    console.log(`   📍 Center: ${ISTANBUL_CENTER.latitude}, ${ISTANBUL_CENTER.longitude}`);
    console.log(`   💰 Total value: ${drops.reduce((sum, d) => sum + d.amount, 0).toFixed(2)} XLM`);
    console.log(`   🔓 Unclaimed: ${drops.filter(d => !d.claimed).length}`);
    console.log(`   🔒 Claimed: ${drops.filter(d => d.claimed).length}`);

    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

// Run seeding
seed();
