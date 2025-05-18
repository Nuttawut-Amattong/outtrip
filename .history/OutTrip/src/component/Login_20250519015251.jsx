import { useState } from "react";
import styles from "./login.module.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false); // เริ่ม false

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User:", user);
    console.log("Password:", password);
  };

  return (
    <div className={styles.loginContainer}>
      <header className={styles.loginHeader}>
        <h1>OutTrip</h1>
        <p>Log in to your account</p>
      </header>

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label htmlFor="user" className={styles.label}>Username or Email</label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Username or Email"
          required
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
          onFocus={() => setShowForgot(true)}  // เมื่อกดให้โชว์ลิงก์ตลอด
          // ลบ onBlur ออก ไม่ต้องปิดลิงก์
        />

        {showForgot && (
          <div className={styles.forgotPasswordLink}>
            <a href="/forgot-password">Forgot password?</a>
          </div>
        )}

        <button type="submit" className={styles.button}>Sign In</button>

        <div className={styles.registerLink}>
          Don't have an account? <a href="/register">Create an account</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
