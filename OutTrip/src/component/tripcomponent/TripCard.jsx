import React from "react";
import "../../styles/tripstyles/TripCard.css"; 

const TripCard = ({ trip }) => {
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

      <div className="trip-footer">
        <span>📍 {trip.location}</span>
        <span>{trip.date}</span>
        <div className="trip-buttons">
          <button>Review</button>
          <button className="create-btn">Adding Trip</button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
