import React, { useEffect, useState } from "react";
import '../../styles/chatstyles/Chatbody.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams } from "react-router-dom";

const Chatbody = () => {
  const { receiverId } = useParams();
  const [receiverName, setReceiverName] = useState("Loading...");
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");
  const currentUserId = localStorage.getItem("userId");
  const senderId = localStorage.getItem("userId");

  const loadMessages = () => {
    fetch(`http://localhost:5000/api/messages/${senderId}/${receiverId}`)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(console.error);
  };




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


    fetch(`http://localhost:5000/api/users/${receiverId}`)
      .then(res => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then(data => setReceiverName(data.username))
      .catch((err) => {

        setReceiverName("Error");
      });
  }, [receiverId]);


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
        loadMessages();
      } else {
        const errText = await res.text();

        setError("Failed to send.");
      }
    } catch (err) {
      console.error(err);
      setError("Server Error");
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
          <div
            key={idx}
            className={`message ${String(msg.sender) === senderId || msg.sender?._id === senderId ? "own" : ""
              }`}
          >

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
