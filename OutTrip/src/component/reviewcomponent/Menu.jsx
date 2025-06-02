import React from "react";

function Menu() {
  return (
    <div style={{ padding: "1rem", background: "#f5f5f5" }}>
      <h2>📋 Menu</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><a href="/home">🏠 Home</a></li>
        <li><a href="/create-trip">🧳 Create Trip</a></li>
        <li><a href="/reviews">📝 Reviews</a></li>
        <li><a href="/chat">💬 Chat</a></li>
      </ul>
    </div>
  );
}

export default Menu;
