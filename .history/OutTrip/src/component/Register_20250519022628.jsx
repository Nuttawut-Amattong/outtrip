import { useState } from "react";
import styles from "./register.module.css";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [favoriteTrip, setFavoriteTrip] = useState("");
  const [errors, setErrors] = useState({});

  // ฟังก์ชันตรวจสอบ email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ฟังก์ชันตรวจสอบ password (มีตัวเลข+ตัวอักษร)
  const isValidPassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(password);
  };

  // ฟังก์ชันตรวจสอบ username (3-8 ตัว)
  const isValidUsername = (username) => {
    return username.length >= 3 && username.length <= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ตรวจสอบแต่ละฟิลด์
    let tempErrors = {};

    if (!isValidEmail(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!isValidUsername(username)) {
      tempErrors.username = "Username must be 3 to 8 characters long.";
    }

    if (!isValidPassword(password)) {
      tempErrors.password =
        "Password must contain at least one letter and one number.";
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    if (!favoriteTrip) {
      tempErrors.favoriteTrip = "Please select your favorite trip.";
    }

    setErrors(tempErrors);

    // ถ้าไม่มี error
    if (Object.keys(tempErrors).length === 0) {
      console.log("Register:", { email, username, password, favoriteTrip });
      // ทำงานสมัครสมาชิกเพิ่มเติมตรงนี้ได้เลย
    }
  };

  return (
    <div className={styles.registerContainer}>
      <header className={styles.registerHeader}>
        <h1>Create an Account</h1>
        <p>Sign up for free to start your trip.</p>
      </header>

      <form className={styles.registerForm} onSubmit={handleSubmit} noValidate>
        <label htmlFor="email" className={styles.label}>
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}

        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Create username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        {errors.username && <div className={styles.error}>{errors.username}</div>}

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        {errors.password && <div className={styles.error}>{errors.password}</div>}

        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
        {errors.confirmPassword && (
          <div className={styles.error}>{errors.confirmPassword}</div>
        )}

        <label htmlFor="favoriteTrip" className={styles.label}>
          Favorite Trip
        </label>
        <select
          id="favoriteTrip"
          value={favoriteTrip}
          onChange={(e) => setFavoriteTrip(e.target.value)}
          className={styles.input}
        >
          <option value="">-- Select your favorite trip --</option>
          <option value="Beach">Beach</option>
          <option value="Mountain">Mountain</option>
          <option value="City">City</option>
          <option value="Adventure">Adventure</option>
        </select>
        {errors.favoriteTrip && (
          <div className={styles.error}>{errors.favoriteTrip}</div>
        )}

        <button type="submit" className={styles.button}>
          Register
        </button>

        <div className={styles.signInLink}>
          Already have an account? <a href="/">Sign in</a>
        </div>
      </form>
    </div>
  );
}

export default Register;
