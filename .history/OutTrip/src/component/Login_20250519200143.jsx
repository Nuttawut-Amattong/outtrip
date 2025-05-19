import { useState } from "react";
import styles from "./login.module.css";

function Login({ onLoginSuccess }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // <-- เพิ่ม state นี้

  // กำหนด pattern ตรวจสอบ username
  const isValidUsername = (value) => {
    const usernameRegex = /^[a-zA-Z0-9_.]{3,8}$/;
    return usernameRegex.test(value);
  };

  // อัพเดต user input พร้อมเช็ค error
  const handleUserChange = (e) => {
    const val = e.target.value;
    setUser(val);

    // เคลียร์ข้อความเตือนทุกครั้งเมื่อพิมพ์ใหม่
    setSuccessMessage("");

    if (val.includes("@")) {
      setError("Please enter username only, not email.");
    } else if (!isValidUsername(val)) {
      setError("Username can only include letters, numbers, _ and . (3-8 chars)");
    } else {
      setError("");
    }
  };

  // ส่งข้อมูล login ไป backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUsername(user)) {
      setError("Please enter a valid username before submitting.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage(""); // เคลียร์ข้อความเตือนก่อนเริ่มส่ง

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setError("");
        setLoading(false);

        // แสดงข้อความเตือนตอน login ผ่าน
        setSuccessMessage(`Welcome back, ${data.user?.username || user}!`);

        if (onLoginSuccess) onLoginSuccess(data);
      } else {
        setLoading(false);
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <header className={styles.loginHeader}>
        <h1>OutTrip</h1>
        <p>Log in to your account</p>
      </header>

      <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
        <label htmlFor="user" className={styles.label}>Username</label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={handleUserChange}
          required
          className={styles.input}
          autoComplete="username"
        />
        {/* แสดง error */}
        {error && <div style={{ color: "red", fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</div>}

        {/* แสดง success message */}
        {successMessage && (
          <div style={{ color: "green", fontSize: "0.85rem", marginBottom: "1rem" }}>
            {successMessage}
          </div>
        )}

        {user.trim() !== "" && error === "" && (
          <>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={styles.input}
              onFocus={() => setShowForgot(true)}
              autoComplete="current-password"
            />

            {showForgot && (
              <div className={styles.forgotPasswordLink}>
                <a href="/forgot-password">Forgot password?</a>
              </div>
            )}
          </>
        )}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className={styles.registerLink}>
          Don't have an account? <a href="/register">Create an account</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
