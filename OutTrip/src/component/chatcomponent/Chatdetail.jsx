import React, { useEffect, useState } from "react";
import '../../styles/chatstyles/Chatdetail.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Chatdetail = () => {
    const [otherUser, setOtherUser] = useState("Loading...");

useEffect(() => {
    const currentUserId = localStorage.getItem("userId");
    if (!currentUserId) {
        setOtherUser("Guest");
        return;
    }

    fetch("http://localhost:5000/api/users")
        .then(res => res.json())
        .then(data => {
            const others = data.filter(user => user.id !== currentUserId);
            if (others.length > 0) {
                setOtherUser(others[0].username); // ดึงคนแรกที่ไม่ใช่ตัวเอง
            } else {
                setOtherUser("No other users");
            }
        })
        .catch(err => {
            console.error(err);
            setOtherUser("Error");
        });
}, []);

    return (
        <div className='detail'>
            <div className="user">
                <AccountCircleIcon fontSize='large' />
                <div className="texts">
                    <span>{otherUser}</span> {/* ✅ เปลี่ยนตรงนี้ */}
                </div>
            </div>

            <div className="star">
                <StarOutlineIcon fontSize='large' />
                <StarOutlineIcon fontSize='large' />
                <StarOutlineIcon fontSize='large' />
                <StarOutlineIcon fontSize='large' />
                <StarOutlineIcon fontSize='large' />
            </div>

            <div className="Menu-detail">
                <div className="Profile">
                    <AccountBoxIcon fontSize='large' />
                    <div className="texts">
                        <span>Profile</span>
                    </div>
                </div>
                <div className="Posttrip">
                    <AccountBoxIcon fontSize='large' />
                    <div className="texts">
                        <span>Post Trip</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatdetail;
