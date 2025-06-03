import express from "express";
import User from "../models/User.js";

const router = express.Router();


router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("username");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("username email");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});



export default router;
