import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ดึง user ตาม id (แสดง username)
router.get("/user/:id", async (req, res) => {
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
    const users = await User.find().select("id username email");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.post("/messages", async (req, res) => {
  try {
    const { sender, text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Text is required." });
    }

    const newMessage = new Message({ sender, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message." });
  }
});

export default router;
