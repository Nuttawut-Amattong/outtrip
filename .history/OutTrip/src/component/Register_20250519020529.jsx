import { useState } from "react";
import styles from "./register.module.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [favoriteTrip, setFavoriteTrip] = useState(""); // เพิ่ม state ใหม่
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    // ทำงานเพิ่ม เช่น เรียก API สมัครสมาชิก พร้อมข้อมูล trip
    console.log("Register:", { email, password, favoriteTrip });
  };

  return (
    <div className={styles.registerContainer}>
      <header className={styles.registerHeader}>
        <h1>Create an Account</h1>
        <p>Sign up for free to start your trip.</p>
      </header>

      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <label htmlFor="email" className={styles.label}>Email address</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="username" className={styles.label}>Username</label>
        <input
          id="username"
          type="text"
          placeholder="Create username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          

        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Create password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="favoriteTrip" className={styles.label}>Favorite Trip</label>
        <select
          id="favoriteTrip"
          value={favoriteTrip}
          onChange={(e) => setFavoriteTrip(e.target.value)}
          required
          className={styles.input}
        >
          <option value="" disabled>-- Select your favorite trip --</option>
          <option value="Beach">Beach</option>
          <option value="Mountain">Mountain</option>
          <option value="City">City</option>
          <option value="Adventure">Adventure</option>
        </select>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.button}>Register</button>

        <div className={styles.signInLink}>
          Already have an account? <a href="/">Sign in</a>
        </div>
      </form>
    </div>
  );
}

export default Register;
