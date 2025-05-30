import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../../styles/Chat.css';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import TourIcon from '@mui/icons-material/Tour';

function Chatlist() {
    const [friends, setFriends] = useState([]);
    const currentUserId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/users")
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(user => user._id !== currentUserId);
                setFriends(filtered);
            })
            .catch(err => {
                console.error("Failed to fetch users", err);
            });
    }, []);

    return (
        <div className='chat'>
            <div className='flex px-4 py-6' style={{ justifyContent: 'space-between' }}>
                <button onClick={() => navigate('/home')}>Home</button>
            </div>

            <div className='body'>
                <p className='font-bold mb-2'>Chat</p>

                 {friends.map(friend => (
                <div
                    key={friend._id}
                    onClick={() => navigate(`/chat/${friend._id}`)}
                    className="chatlist-item"
                >
                    {friend.username}
                </div>
                ))}
            </div>
        </div>
    );
}

export default Chatlist;
