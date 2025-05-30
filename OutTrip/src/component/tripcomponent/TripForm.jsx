import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/tripstyles/TripForm.css";

const TripForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        date: "",
        tag: [],
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTagChange = (e) => {
        const options = Array.from(e.target.selectedOptions);
        setFormData((prev) => ({
            ...prev,
            tag: options.map((opt) => opt.value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

         const user = localStorage.getItem("username");

        try {
            const res = await fetch("http://localhost:5000/api/trips", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                 body: JSON.stringify({ ...formData, username: user }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Trip created successfully!");
                setFormData({ name: "", description: "", location: "", date: "", tag: [] });
                setTimeout(() => navigate("/home"), 1500);
            } else {
                setMessage(data.message || "Failed to create trip.");
            }
        } catch (err) {
            setMessage("Server error.");
        }
    };

    return (
        <form className="trip-form" onSubmit={handleSubmit}>
            {message && <p style={{ marginBottom: "10px" }}>{message}</p>}
            
            <label>Trip Name:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <label>Description:</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
            />

            <label>Location:</label>
            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
            />

            <label>Date:</label>
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
            />

            <label>Tag:</label>
            <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="trip-tag-select"
                required
            >
                <option value="" disabled>-- Select your favorite trip --</option>
                <option value="Beach">Beach</option>
                <option value="Mountain">Mountain</option>
                <option value="City">City</option>
                <option value="Adventure">Adventure</option>
                <option value="Forest">Forest</option>
                <option value="Desert">Desert</option>
                <option value="Countryside">Countryside</option>
                <option value="Island">Island</option>
                <option value="Historical">Historical</option>
                <option value="Lake">Lake</option>
                <option value="Cruise">Cruise</option>
                <option value="Road Trip">Road Trip</option>
            </select>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="button-back" type="button" onClick={() => navigate("/home")}>
                    ย้อนกลับ
                </button>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default TripForm;