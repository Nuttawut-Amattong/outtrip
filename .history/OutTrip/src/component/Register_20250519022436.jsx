import { useState } from "react";
import styles from "./register.module.css";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [favoriteTrip, setFavoriteTrip] = useState("");
  const [error, setError] = useState(""); // สำหรับ error จากการ submit

  // error แยกสำหรับ username, password realtime
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) => /\d/.test(password) && /[a-zA-Z]/.test(password);
  const isValidUsername = (username) => username.length >= 3 && username.length <= 8;

  // handle username onChange + validate
  const handleUsernameChange = (e) => {
    const val = e.target.value;
    setUsername(val);

    if (val.length < 3) {
      setUsernameError("Username must be at least 3 characters.");
    } else if (val.length > 8) {
      setUsernameError("Username must be no more than 8 characters.");
    } else {
      setUsernameError("");
    }
  };

  // handle password onChange + validate
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);

    if (!isValidPassword(val)) {
      setPasswordError("Password must contain both letters and numbers.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidUsername(username)) {
      setError("Username must be between 3 and 8 characters.");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must contain both letters and numbers.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    // เรียก API หรือทำงานต่อ
    console.log("Register:", { email, username, password, favoriteTrip });
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
          value={username}
          onChange={handleUsernameChange}
          className={styles.input}
        />
        {usernameError && <div className={styles.error}>{usernameError}</div>}

        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Create password"
          required
          value={password}
          onChange={handlePasswordChange}
          className={styles.input}
        />
        {passwordError && <div className={styles.error}>{passwordError}</div>}

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
