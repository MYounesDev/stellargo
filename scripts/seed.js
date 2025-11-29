require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stellargo';

// Drop Schema (matching the TypeScript model)
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
  },
  {
    timestamps: true,
  }
);

DropSchema.index({ location: '2dsphere' });

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

// Sample messages for drops
const messages = [
  'Coffee on me! ☕',
  'Found this, enjoy! 🎁',
  'First to find wins! 🏆',
  'Happy treasure hunting! 🗺️',
  'Buy yourself something nice 💰',
  'For the early bird 🐦',
  'Hidden gem alert! 💎',
  'Spread the love ❤️',
  'Random act of kindness 🌟',
  'Fortune favors the brave 🦁',
  'Discover and claim! 🔍',
  'Your lucky day! 🍀',
  'Keep exploring! 🧭',
  'Free money, why not? 🤑',
  'Adventure awaits! ⚡',
  'Istanbul vibes 🌉',
  'Weekend treat! 🎉',
  'Support local explorers 🚶',
  'Crypto treasure hunt! 🏴‍☠️',
  'Find me if you can! 🎯',
];

// Sample wallet addresses (for demo purposes)
const sampleWallets = [
  'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF',
  'GBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBWHF',
  'GCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCWHF',
  'GDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDWHF',
  'GEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEWHF',
];

// Generate drops
function generateDrops(count = 30) {
  const drops = [];

  for (let i = 0; i < count; i++) {
    // Random location around Istanbul
    const latitude = ISTANBUL_CENTER.latitude + randomOffset(0.08);
    const longitude = ISTANBUL_CENTER.longitude + randomOffset(0.1);

    // Random amount between 0.5 and 50 XLM
    const amount = Math.floor(Math.random() * 495) / 10 + 0.5;

    // Random message
    const message = messages[Math.floor(Math.random() * messages.length)];

    // Random creator
    const createdBy = sampleWallets[Math.floor(Math.random() * sampleWallets.length)];

    // 20% chance of being claimed
    const claimed = Math.random() < 0.2;

    const drop = {
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      amount: parseFloat(amount.toFixed(2)),
      message,
      createdBy,
      claimed,
    };

    // If claimed, add claim details
    if (claimed) {
      drop.claimedBy = sampleWallets[Math.floor(Math.random() * sampleWallets.length)];
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

    // Clear existing drops
    console.log('🗑️  Clearing existing drops...');
    await Drop.deleteMany({});
    console.log('✅ Existing drops cleared');

    // Generate and insert drops
    console.log('🎲 Generating drops...');
    const drops = generateDrops(30);
    
    console.log('💾 Inserting drops into database...');
    await Drop.insertMany(drops);

    console.log('\n✨ Seeding completed successfully!');
    console.log(`📊 Created ${drops.length} drops around Istanbul`);
    console.log(`📍 Center: ${ISTANBUL_CENTER.latitude}, ${ISTANBUL_CENTER.longitude}`);
    console.log(`💰 Total value: ${drops.reduce((sum, d) => sum + d.amount, 0).toFixed(2)} XLM`);
    console.log(`🔓 Unclaimed: ${drops.filter(d => !d.claimed).length}`);
    console.log(`🔒 Claimed: ${drops.filter(d => d.claimed).length}`);

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

