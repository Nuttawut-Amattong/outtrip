const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST: Create review
router.post('/', async (req, res) => {
  try {
    const { tripName, reviewText, rating } = req.body;
    const newReview = new Review({ tripName, reviewText, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: All reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
