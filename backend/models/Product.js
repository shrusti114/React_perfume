const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
  categoryId: { type: String, ref: 'Category' }, // String ref
  sellerId: { type: String, ref: 'User', required: true }, // String ref
  stock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
