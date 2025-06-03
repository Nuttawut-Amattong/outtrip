import React from "react";
import "../../styles/tripstyles/TripCard.css"; 
import { useNavigate } from "react-router-dom";

const TripCard = ({ trip }) => {

   const navigate = useNavigate(); 

  const handleReview = () => {
    navigate(`/reviews/${trip._id}`);
  };

  

  return (
    <div className="trip-card">
      <div className="trip-header">
        <div className="user-info">
          <div className="avatar">
            <img src="/Avatar.png" alt="avatar pic" />
          </div>
          <div className="trip-name">
            <h2>{trip.name}</h2>
            <strong>{trip.username || "USERNAME"}</strong>
          </div>
        </div>
        <div className="rating">⭐⭐⭐⭐⭐</div>
      </div>

      <div className="trip-description">{trip.description}</div>

      {/* Show tags if present */}
      {trip.tag && (
        <div className="trip-tags" style={{ margin: "8px 0" }}>
          <strong>Tag:</strong>{" "}
          {Array.isArray(trip.tag)
            ? trip.tag.join(", ")
            : trip.tag}
        </div>
      )}

      <div className="trip-footer">
        <span>📍 {trip.location}</span>
        <span>{trip.date}</span>
        <div className="trip-buttons">
          <button onClick={handleReview}>Review</button>
          <button className="create-btn">Adding Trip</button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
