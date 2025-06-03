import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/reviewstyles/ReviewDetailPage.css";

function ReviewDetailPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTripAndReviews = async () => {
      try {
        const tripRes = await fetch(`/api/trips/${tripId}`);
        if (!tripRes.ok) throw new Error("ไม่พบ trip");
        const tripData = await tripRes.json();
        setTrip(tripData);
      } catch (err) {
        setMessage("โหลดทริปล้มเหลว");
      }

      try {
        const reviewsRes = await fetch(`/api/reviews/${tripId}`);
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
      } catch (err) {
        setMessage("โหลดรีวิวไม่สำเร็จ");
      }
    };

    fetchTripAndReviews();
  }, [tripId]);

  const handleSubmit = async () => {
    if (!reviewText || !rating) {
      setMessage("กรุณากรอกรีวิวและให้ดาว");
      return;
    }

    const res = await fetch(`/api/reviews/${tripId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewText, rating }),
    });

    if (res.ok) {
      setReviewText("");
      setRating(0);
      const newReviews = await fetch(`/api/reviews/${tripId}`).then(r => r.json());
      setReviews(newReviews);
      setMessage(""); 
    } else {
      setMessage("เกิดข้อผิดพลาด");
    }
  };

  if (!trip) return <div className="loading">Loading trip...</div>;
  if (message) return <div className="error">{message}</div>;

  return (
    <div className="review-detail-page">
      <div className="review-card">
        <h2>{trip.name}</h2>
        <p><strong>สถานที่:</strong> {trip.location}</p>
        <p><strong>วันที่:</strong> {trip.date}</p>
        <p><strong>คำอธิบาย:</strong> {trip.description}</p>

        <hr />

        <h3>ให้คะแนน & รีวิว</h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="พิมพ์รีวิวของคุณที่นี่..."
          rows={3}
        />
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={rating >= star ? "star active" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <button className="review" onClick={handleSubmit}>โพสต์รีวิว</button>

        <button className="home-btn" onClick={() => navigate("/home")}>
          กลับหน้า Home
        </button>

        <h3>รีวิวทั้งหมด</h3>
        {reviews.length === 0 ? (
          <p>ยังไม่มีรีวิว</p>
        ) : (
          reviews.map((r) => (
            <div key={r._id} className="review-item">
              <div className="review-stars">
                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
              </div>
              <p>{r.reviewText}</p>
              <small>{new Date(r.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewDetailPage;
