import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} /> {/* 👉 เพิ่มอันนี้ */}
  </StrictMode>,
)
