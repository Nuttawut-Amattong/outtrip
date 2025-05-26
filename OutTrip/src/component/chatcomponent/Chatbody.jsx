import React, { useEffect, useState } from "react";
import '../../styles/chatstyles/Chatbody.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Chatbody = () => {
  const [otherUser, setOtherUser] = useState("Loading...");
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUserId = localStorage.getItem("userId");
    if (!currentUserId) {
      setOtherUser("Guest");
      return;
    }

    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        const others = data.filter(user => user.id !== currentUserId);
        if (others.length > 0) {
          setOtherUser(others[0].username);
        } else {
          setOtherUser("No other users");
        }
      })
      .catch((err) => {
        console.error(err);
        setOtherUser("Error");
        setError("Cannot load other users.");
      });
  }, []);

  return (
    <div className='chatbody'>
      <div className="top">
        <div className="user">
          <AccountCircleIcon fontSize='large' />
          <div className="texts">
            <span>{otherUser}</span> {/* ✅ เปลี่ยนตรงนี้ */}
            {error && <p style={{ color: 'red', fontSize: '0.75rem' }}>{error}</p>}
          </div>
        </div>
      </div>

      <div className="center-chat">
        <div className="message own">
          <AccountCircleIcon fontSize='large' />
          <div className="texts">
            <p>Hi There</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <AccountCircleIcon fontSize='large' />
          <div className="texts">
            <p>Hello!</p>
            <span>Just now</span>
          </div>
        </div>
      </div>

      <div className="bottom-chat">
        <input type="text" placeholder="message here." />
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chatbody;
