// Quick debug script to check users in database
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function debug() {
  try {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/perfume');
    console.log('Connected to MongoDB');
    
    // List all users
    const users = await User.find({}).select('email role isEmailVerified password');
    console.log(`\nTotal users in DB: ${users.length}`);
    
    if (users.length === 0) {
      console.log('❌ NO USERS FOUND! The database is empty.');
      console.log('Creating test user right now...');
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash('password123', salt);
      await User.create({
        _id: 'U-TEST-001',
        name: 'Test User',
        email: 'user@test.com',
        password: hashed,
        role: 'user',
        isVerified: true,
        isEmailVerified: true,
      });
      console.log('✅ Created user@test.com / password123');
    } else {
      for (const u of users) {
        // Test if password123 works for each user
        const match = await bcrypt.compare('password123', u.password);
        console.log(`  ${u.email} (${u.role}) | emailVerified: ${u.isEmailVerified} | password123 match: ${match}`);
      }
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}
debug();
