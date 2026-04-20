const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
  family: { type: String, enum: ['Floral', 'Woody', 'Fresh', 'Oriental', 'Luxury Collection'], default: 'Floral' },
  gender: { type: String, enum: ['For Men', 'For Women', 'Unisex'], default: 'Unisex' },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  badge: { type: String },
  categoryId: { type: String, ref: 'Category' },
  sellerId: { type: String, ref: 'User', required: true },
  stock: { type: Number, default: 0 },
  volume: { type: String, default: '100ml' },
  notes: {
    top: [String],
    heart: [String],
    base: [String],
  },
  discount_price: { type: Number },
  status: { type: String, enum: ['Active', 'Inactive', 'Out of Stock'], default: 'Active' },
  average_rating: { type: Number, default: 0, min: 0, max: 5 },
  total_reviews: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Product', productSchema);
