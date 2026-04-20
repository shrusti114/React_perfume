/**
 * Seed script — creates test users for all 3 roles so you can log in immediately.
 * Run:  node seedUsers.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/perfume';

const seedUsers = [
  {
    _id: 'U-0001',
    name: 'Test User',
    email: 'user@test.com',
    password: 'password123',
    role: 'user',
    isVerified: true,
    isEmailVerified: true,
  },
  {
    _id: 'S-0001',
    name: 'Test Seller',
    email: 'seller@test.com',
    password: 'password123',
    role: 'seller',
    isVerified: true,
    isEmailVerified: true,
    shopName: 'Velvora Boutique',
  },
  {
    _id: 'A-0001',
    name: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin@123',
    role: 'admin',
    isVerified: true,
    isEmailVerified: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB');

    for (const u of seedUsers) {
      const exists = await User.findOne({ email: u.email });
      if (exists) {
        console.log(`⏭  ${u.email} already exists, skipping.`);
        continue;
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(u.password, salt);
      await User.create({ ...u, password: hashed });
      console.log(`✅ Created ${u.role}: ${u.email} / password123`);
    }

    console.log('\nDone! You can now log in with any of the above accounts.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
