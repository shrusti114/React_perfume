const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // acts as order_item_id
  order_id: { type: String, ref: 'Order', required: true },
  product_id: { type: String, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, { timestamps: false });

module.exports = mongoose.model('OrderItem', orderItemSchema);
