import React from "react";
import { useParams } from "react-router-dom";
import '../styles/chatstyles/ChatPage.css';
import Chatbody from "../component/chatcomponent/Chatbody";
import Detail from "../component/chatcomponent/Chatdetail";
import Chatlist from "../component/chatcomponent/Chatlist";

function ChatPage() {
    const { receiverId } = useParams();

    return (
        <div className="chat-page">
            <div className="list-container"><Chatlist /></div>
            <div className="chatbody-container"><Chatbody receiverId={receiverId} /></div>
        </div>
    );
}

export default ChatPage;
