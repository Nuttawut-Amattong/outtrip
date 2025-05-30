import express from "express";
import mongoose from "mongoose";
import Message from "../models/Message.js";

const router = express.Router();

router.post("/messages", async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;

    console.log("📥 POST payload:", { sender, receiver, text });

    if (!sender || !receiver || !text) {
      return res.status(400).json({ message: "Missing fields." });
    }

    try {
  const senderObj = new mongoose.Types.ObjectId(sender);
  const receiverObj = new mongoose.Types.ObjectId(receiver);
  
  const newMessage = new Message({ sender: senderObj, receiver: receiverObj, text });
  await newMessage.save();
  res.status(201).json(newMessage);
} catch (err) {
  console.error("❌ Invalid ObjectId:", err.message);
  return res.status(400).json({ message: "Invalid sender or receiver ID." });
}

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("❌ Backend error:", err);
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
