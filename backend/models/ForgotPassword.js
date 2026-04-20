const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // acts as reset_id
  email: { type: String, required: true },
  otp: { type: String, required: true },
  otp_expiry: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Used', 'Expired'], default: 'Pending' }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

module.exports = mongoose.model('ForgotPassword', forgotPasswordSchema);
