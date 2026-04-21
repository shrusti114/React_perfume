const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

async function fixAdmin() {
  try {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/velvora_perfume';
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB:', mongoUrl);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin@123', salt);

    const admin = await User.findOneAndUpdate(
      { email: 'admin@gmail.com' },
      { 
        password: hashedPassword,
        role: 'admin',
        isVerified: true,
        isEmailVerified: true,
        name: 'Velvora Admin'
      },
      { upsert: true, new: true }
    );

    console.log('Admin user fixed/created:', admin.email);
    process.exit(0);
  } catch (error) {
    console.error('Error fixing admin:', error);
    process.exit(1);
  }
}

fixAdmin();
