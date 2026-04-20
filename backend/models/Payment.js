const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // acts as payment_id
  order_id: { type: String, ref: 'Order', required: true },
  payment_mode: { type: String, enum: ['Card', 'PayPal', 'Stripe', 'Cash'], required: true },
  amount: { type: Number, required: true },
  transaction_id: { type: String, unique: true }
}, { timestamps: { createdAt: 'payment_date', updatedAt: false } });

module.exports = mongoose.model('Payment', paymentSchema);
