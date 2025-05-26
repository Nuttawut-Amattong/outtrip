import React from "react";
import '../styles/chatstyles/ChatPage.css';
import Chatbody from "../component/chatcomponent/Chatbody";
import Detail from "../component/chatcomponent/Chatdetail";
import Chatlist from "../component/chatcomponent/Chatlist";

function ChatPage() {
    return (
        <div className="chat-page">
            <div className="list-container"><Chatlist /></div>
            <div className="chatbody-container"><Chatbody /></div>
            <div className="detail-container"><Detail /></div>
        </div>
    );
}

export default ChatPage;