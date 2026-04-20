const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, ref: 'User' }, // Optional for guests
  guestInfo: {
    email: String,
    name: String,
    phone: String,
    address: String
  },
  products: [
    {
      productId: { type: String, ref: 'Product', required: true }, // String ref
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
  statusHistory: [
    {
      status: { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  paymentMethod: { type: String, default: 'COD' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  transactionId: { type: String },
  paymentId: { type: String, ref: 'Payment' },
}, { timestamps: { createdAt: 'order_date', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Order', orderSchema);
