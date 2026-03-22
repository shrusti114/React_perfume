const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const seedSeller = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/perfume-db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const email = 'seller@test.com';
    const password = 'password123';
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists, updating to verified');
      existingUser.isVerified = true;
      existingUser.role = 'seller';
      await existingUser.save();
      console.log('User updated');
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const newSeller = new User({
        _id: 'S-TEST-001',
        name: 'Test Seller',
        email,
        password: hashedPassword,
        role: 'seller',
        isVerified: true,
        shopName: 'Westion Fragrance House'
      });
      
      await newSeller.save();
      console.log('New verified seller created');
    }

    process.exit();
  } catch (error) {
    console.error('Error seeding seller:', error);
    process.exit(1);
  }
};

seedSeller();
