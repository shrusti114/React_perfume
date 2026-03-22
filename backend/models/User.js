const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'seller', 'user'], default: 'user' },
  isVerified: { type: Boolean, default: false }, // Admin approval for sellers
  isEmailVerified: { type: Boolean, default: false }, // Token-based verification
  verificationToken: { type: String },
  profileImage: { type: String, default: '' },
  bio: { type: String, default: '' },
  address: { type: String, default: '' },
  shopName: { type: String },
  phone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
