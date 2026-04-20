const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  role: { type: String, enum: ['admin', 'seller', 'user'], default: 'user' },
  phone: { type: String },
  shopName: { type: String },
  otp: { type: String, required: true },
  otpExpiry: { type: Date, required: true },
}, { timestamps: true });

// TTL Index to automatically delete expired pending users
pendingUserSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('PendingUser', pendingUserSchema);
