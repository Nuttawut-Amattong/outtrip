import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../styles/chatstyles/Chatdetail.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Chatdetail = () => {
  const { receiverId } = useParams(); 
  const [receiverName, setReceiverName] = useState("Loading...");

  useEffect(() => {
    if (!receiverId) return;

    fetch(`http://localhost:5000/api/users/${receiverId}`)
      .then(res => res.json())
      .then(data => setReceiverName(data.username))
      .catch(() => setReceiverName("Error"));
  }, [receiverId]);

  return (
    <div className='detail'>
      <div className="user">
        <AccountCircleIcon fontSize='large' />
        <div className="texts">
          <span>{receiverName}</span>
        </div>
      </div>

      <div className="star">
        {[...Array(5)].map((_, i) => <StarOutlineIcon key={i} fontSize='large' />)}
      </div>

      
    </div>
  );
};

export default Chatdetail;
