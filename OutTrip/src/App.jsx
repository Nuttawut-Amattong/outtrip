import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginWrapper from "./component/LoginWrapper.jsx";
import Register from "./component/Register.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreateTripPage from "./pages/CreateTripPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import ReviewPage from "./pages/ReviewDetailPage.jsx";
import ReviewDetailPage from "./pages/ReviewDetailPage";




function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<LoginWrapper />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/create-trip" element={<CreateTripPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/chat/:receiverId" element={<ChatPage />} />
      <Route path="/reviews" element={<ReviewPage />} />
      <Route path="/reviews/:tripId" element={<ReviewDetailPage />} />
    </Routes>
  );
}

export default App;
