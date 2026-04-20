const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // acts as feedback_id
  user_id: { type: String, ref: 'User', required: true },
  product_id: { type: String, ref: 'Product', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

module.exports = mongoose.model('Feedback', feedbackSchema);
