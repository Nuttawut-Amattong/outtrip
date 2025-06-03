import express from "express";
import Review from "../models/Review.js";

const router = express.Router();


router.get("/:tripId", async (req, res) => {
  try {
    const reviews = await Review.find({ tripId: req.params.tripId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews." });
  }
});


router.post("/:tripId", async (req, res) => {
  try {
    const { reviewText, rating } = req.body;

    if (!reviewText || !rating) {
      return res.status(400).json({ message: "Missing review text or rating." });
    }

    const newReview = new Review({
      tripId: req.params.tripId,
      reviewText,
      rating
    });

    await newReview.save();
    res.status(201).json({ message: "Review saved.", review: newReview });
  } catch (err) {
    res.status(500).json({ message: "Error saving review." });
  }
});

export default router;
