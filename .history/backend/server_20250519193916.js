require('dotenv').config();    // โหลดค่าจาก .env
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

// เชื่อมต่อ MongoDB
connectDB();

// ตั้งค่าให้ Express รับ JSON request
app.use(express.json());

// ตั้ง route สำหรับ auth (register, login)
app.use('/api/auth', authRoutes);

// เริ่ม server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
