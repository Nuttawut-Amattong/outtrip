import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  tripId: {
     type: String,
    required: true,
    ref: "Trip"
  },
  reviewText: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
