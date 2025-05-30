import React, { useEffect, useState } from "react";
import '../../styles/chatstyles/Chatbody.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams } from "react-router-dom";

const Chatbody = () => {
  const { receiverId } = useParams(); // รับ ID เพื่อนจาก URL
  const [receiverName, setReceiverName] = useState("Loading...");
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");
const currentUserId = localStorage.getItem("userId");
  const senderId = localStorage.getItem("userId");

  const loadMessages = () => {
  fetch("http://localhost:5000/api/messages")
    .then(res => res.json())
    .then(data => {
      const chatOnly = data.filter((msg) =>
        (msg.sender._id === senderId && msg.receiver === receiverId) ||
        (msg.sender === receiverId && msg.receiver._id === senderId) ||
        (msg.sender === senderId && msg.receiver._id === receiverId) ||
        (msg.sender._id === receiverId && msg.receiver === senderId)
      );
      setMessages(chatOnly);
    })
    .catch(console.error);
};

// ✅ ใช้ useEffect เดียว
useEffect(() => {
  if (senderId && receiverId) {
    loadMessages();
  }
}, [senderId, receiverId]);

useEffect(() => {
  const interval = setInterval(() => {
    loadMessages();
  }, 2000);
  return () => clearInterval(interval);
}, [senderId, receiverId]);

useEffect(() => {
  if (!receiverId) return;

  console.log("🔎 GET /api/users/" + receiverId); // ✅ log ตรงนี้

  fetch(`http://localhost:5000/api/users/${receiverId}`)
    .then(res => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
    .then(data => setReceiverName(data.username))
    .catch((err) => {
      console.error("❌ Fetch user error:", err);
      setReceiverName("Error");
    });
}, [receiverId]);

  // ส่งข้อความ
  const handleSend = async () => {
  if (!inputText.trim()) return;

  const payload = {
    sender: currentUserId,
    receiver: receiverId,
    text: inputText,
  };

  try {
    const res = await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setInputText("");
      loadMessages(); // 🔁 โหลดข้อความใหม่
    } else {
      const errText = await res.text();
      console.error("❌ Response not OK:", errText);
      setError("Failed to send.");
    }
  } catch (err) {
    console.error(err);
    setError("❌ Server Error");
  }
};

  return (
    <div className='chatbody'>
      <div className="top">
        <div className="user">
          <AccountCircleIcon fontSize='large' />
          <div className="texts">
            <span>{receiverName}</span>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>

      <div className="center-chat">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender === senderId ? "own" : ""}`}>
            <AccountCircleIcon fontSize='large' />
            <div className="texts">
              <p>{msg.text}</p>
              <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-chat">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="message here."
        />
        <button className="sendButton" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbody;
