const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'seller', 'user'], default: 'user' },
  isVerified: { type: Boolean, default: false },       // Admin approval for sellers
  isEmailVerified: { type: Boolean, default: false },  // OTP-based verification
  verificationToken: { type: String },                  // Legacy token-based (kept for compat)
  // OTP fields
  otp: { type: String },
  otpExpiry: { type: Date },
  // Profile
  profileImage: { type: String, default: '' },
  bio: { type: String, default: '' },
  address: { type: String, default: '' },
  // General
  username: { type: String, unique: true, sparse: true, trim: true },
  gender: { type: String, enum: ['male', 'female', 'non-binary', 'other', 'prefer not to say'] },
  dob: { type: Date },
  phone: { type: String },
  wishlist: [{ type: String, ref: 'Product' }],
  status: { type: String, enum: ['active', 'inactive', 'suspended', 'pending'], default: 'active' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: 'users' });

module.exports = mongoose.model('User', userSchema);
