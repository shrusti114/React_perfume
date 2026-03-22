const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, ref: 'User', required: true, unique: true }, // String ref
  items: [
    {
      productId: { type: String, ref: 'Product', required: true }, // String ref
      quantity: { type: Number, required: true, min: 1 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
