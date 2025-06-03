import React, { useEffect, useState } from "react";
import TripCard from "../component/tripcomponent/TripCard";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [trips, setTrips] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showOnlyInterests, setShowOnlyInterests] = useState(false);
  const userId = localStorage.getItem("userId");
  const userInterests = JSON.parse(localStorage.getItem("interests") || "[]");

  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "USERNAME";

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/trips");
        const data = await res.json();
        setTrips(data);
      } catch (err) {
        console.error("Failed to fetch trips:", err);
      }
    };

    const fetchUsers = async () => {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      const others = data.filter((u) => u._id !== userId);
      setFriends(others);
    };

    fetchTrips();
    fetchUsers();
  }, [userId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const filteredTrips = trips.filter((trip) => {
    const keyword = searchTerm.toLowerCase();
    const matchesSearch =
      trip.name?.toLowerCase().includes(keyword) ||
      trip.description?.toLowerCase().includes(keyword) ||
      trip.location?.toLowerCase().includes(keyword) ||
      trip.username?.toLowerCase().includes(keyword);

    if (!showOnlyInterests) return matchesSearch;

   
    if (typeof trip.tag === "string") {
      return matchesSearch && userInterests.includes(trip.tag);
    }
   
    if (Array.isArray(trip.tag)) {
      return matchesSearch && trip.tag.some((tag) => userInterests.includes(tag));
    }
    return false;
  });

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div>
          <h2>OutTrip</h2>
          <ul>
            <li>🏠 HOME</li>
            <li>🗺️ MY TRIP</li>
          </ul>
        </div>
        <div className="bottom-user">
          <h3>{username || "USERNAME"}</h3>
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mainContent">
        <div className="header">
          <input
            className="searchBox"
            placeholder="Search for Trip"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => navigate("/create-trip")}>Create Trip</button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setShowOnlyInterests((prev) => !prev)}
          >
            {showOnlyInterests ? "Show All Trips" : "Show My Interests"}
          </button>
        </div>
        <div className="trip-list">
          {filteredTrips.length === 0 ? (
            <p>No trips found. Please create one!</p>
          ) : (
            filteredTrips.map((trip) => <TripCard key={trip._id} trip={trip} />)
          )}
        </div>
      </div>

      <div className="rightPanel">
        <div className="chat-section">
          <h4>Chat</h4>
          {friends.map((friend) => (
            <div
              key={friend._id}
              className="chat-item"
              onClick={() => navigate(`/chat/${friend._id}`)}
              style={{ cursor: "pointer" }}
            >
              💬 {friend.username}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
