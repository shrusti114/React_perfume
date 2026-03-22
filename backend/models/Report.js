const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  type: { type: String, enum: ['Sales', 'User'], required: true },
  data: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
