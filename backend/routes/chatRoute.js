import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// POST /api/messages → ส่งข้อความใหม่
router.post("/messages", async (req, res) => {
  try {
    const { sender, text } = req.body;
    const newMessage = new Message({ sender, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message." });
  }
});

// GET /api/messages → ดึงข้อความทั้งหมด
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }).populate("sender", "username");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages." });
  }
});

export default router;
