const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  tripName: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);