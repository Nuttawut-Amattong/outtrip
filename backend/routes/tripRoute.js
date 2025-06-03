import express from "express";
import Trip from "../models/Trip.js";

const router = express.Router();


router.post("/trips", async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(500).json({ message: "Failed to save trip", error: err.message });
  }
});


router.get("/trips", async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trips", error: err.message });
  }
});


router.get("/trips/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trip", error: err.message });
  }
});





export default router;
