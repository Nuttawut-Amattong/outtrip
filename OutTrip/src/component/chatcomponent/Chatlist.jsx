import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../../styles/Chat.css';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import TourIcon from '@mui/icons-material/Tour';

function Chatlist() {
    return (
        <div className='chat'>
            <div className='flex px-4 py-6' style={{ justifyContent: 'space-between' }}>
                <AccountCircleIcon fontSize='large' />
                <HomeFilledIcon fontSize='large' />
                <TourIcon fontSize='large' />
                <NotificationsNoneOutlinedIcon fontSize='large' />
            </div>
            <div className='body'>
                <p>Chat</p>
                <div className='flex gap-2 pt-2'>
                    <AccountCircleIcon fontSize='large' />
                    <p className='pt-1 text-lg'>Hi there.</p>
                </div>
                <div className='flex gap-2 pt-2'>
                    <AccountCircleIcon fontSize='large' />
                    <p className='pt-1 text-lg'>Hi there.</p>
                </div>
            </div>
        </div>
    )
}

export default Chatlist