import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  username: { type: String }, // เผื่อเก็บชื่อผู้สร้างทริป
}, { timestamps: true });

export default mongoose.model("Trip", tripSchema);
