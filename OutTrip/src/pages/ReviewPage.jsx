import React, { useState, useEffect } from "react";
import "../styles/Reviewstyles/ReviewPage.css";
import Menu from "../components/Menu";
import Chat from "../components/Chat";
import SearchBar from "../components/SearchBar";

function ReviewPage() {
  const [tripName, setTripName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch reviews
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      setMessage("เกิดข้อผิดพลาดในการโหลดรีวิว");
    }
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handlePostReview = async () => {
    if (!tripName || !reviewText || !rating) {
      setMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripName, reviewText, rating }),
      });
      if (res.ok) {
        setMessage("โพสต์รีวิวสำเร็จ!");
        setTripName("");
        setReviewText("");
        setRating(0);
        fetchReviews();
      } else {
        setMessage("เกิดข้อผิดพลาดในการโพสต์รีวิว");
      }
    } catch (err) {
      setMessage("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  return (
    <div className="review-page">
      {/* Sidebar */}
      <div className="menu-container"><Menu /></div>

      {/* Main Content */}
      <div className="body-container">
        {/* Search Bar and Create Trip Button */}
        <div className="header">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>

        {/* แจ้งเตือน */}
        {message && (
          <div style={{ color: message.includes("สำเร็จ") ? "green" : "red", margin: "10px 0" }}>
            {message}
          </div>
        )}

        {/* Review Box */}
        <div className="trips">
          <div className="review-box">
            <h2>Review Trip</h2>
            <input
              type="text"
              placeholder="Trip Name"
              value={tripName}
              onChange={e => setTripName(e.target.value)}
              style={{ margin: "1rem", padding: "0.5rem", fontSize: "1rem", borderRadius: "4px", border: "1px solid #ccc", width: "90%" }}
            />
            <textarea
              placeholder="Enter text review here."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? "star selected" : "star"}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <button className="post-review-btn" onClick={handlePostReview}>
              Post Review
            </button>
          </div>

          {/* แสดงรีวิวทั้งหมด */}
          <div style={{ width: "100%", marginTop: "2rem" }}>
            <h3>All Reviews</h3>
            {reviews.length === 0 ? (
              <div style={{ color: "#888" }}>ยังไม่มีรีวิว</div>
            ) : (
              reviews.map((r) => (
                <div key={r._id} className="review-box" style={{ minHeight: "unset", marginTop: "1rem" }}>
                  <h4 style={{ marginLeft: "1rem" }}>{r.tripName}</h4>
                  <div style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <span key={i} style={{ color: "#ff9800", fontSize: "1.2rem" }}>★</span>
                    ))}
                  </div>
                  <div style={{ marginLeft: "1rem", marginBottom: "1rem" }}>{r.reviewText}</div>
                  <div style={{ marginLeft: "1rem", fontSize: "0.8rem", color: "#888" }}>
                    {new Date(r.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Chat Section */}
      <div className="chat-container"><Chat /></div>
    </div>
  );
}

export default ReviewPage;