import express from "express";
import mongoose from "mongoose";
import Message from "../models/Message.js";

const router = express.Router();

router.post("/messages", async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;


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
  return res.status(400).json({ message: "Invalid sender or receiver ID." });
}

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message." });
  }
});



router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }).populate("sender", "username");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages." });
  }
});


router.get("/messages/:userA/:userB", async (req, res) => {
  try {
    const { userA, userB } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: userA, receiver: userB },
        { sender: userB, receiver: userA },
      ]
    })
    .sort({ createdAt: 1 })
    .populate("sender", "username"); 

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error loading messages" });
  }
});



export default router;
