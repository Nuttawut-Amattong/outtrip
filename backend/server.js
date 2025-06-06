import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import tripRoute from "./routes/tripRoute.js";
import reviewRoute from "./routes/reviewRoute.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", chatRoute);
app.use("/api", tripRoute);       
app.use("/api/reviews", reviewRoute); 




app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
