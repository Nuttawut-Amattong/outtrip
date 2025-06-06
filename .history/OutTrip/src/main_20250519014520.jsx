import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/Login.jsx';
import Register from './component/Register.jsx';
import Forgetpass from './component/Forgetpass.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgetpass />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
