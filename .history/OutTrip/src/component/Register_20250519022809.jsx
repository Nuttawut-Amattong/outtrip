import { useState } from "react";
import styles from "./register.module.css";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [favoriteTrip, setFavoriteTrip] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateUsername = (username) => {
    return username.length >= 3 && username.length <= 8;
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (!validateEmail(email)) {
      tempErrors.email = "Invalid email format.";
    }

    if (!validateUsername(username)) {
      tempErrors.username = "Username must be between 3 and 8 characters.";
    }

    if (!validatePassword(password)) {
      tempErrors.password = "Password must contain letters and numbers.";
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password must match Password.";
    }

    if (!favoriteTrip) {
      tempErrors.favoriteTrip = "Please select your favorite trip.";
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      console.log("Register:", { email, username, password, favoriteTrip });
      // ทำอย่างอื่นต่อ...
    }
  };

  // ฟังก์ชันช่วยเช็คและลบ error ที่ถูกแก้ไข
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email && validateEmail(e.target.value)) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errors.username && validateUsername(e.target.value)) {
      setErrors(prev => ({ ...prev, username: undefined }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password && validatePassword(e.target.value)) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
    // ลบ error confirmPassword ด้วยถ้ารหัสสองช่องตรงกัน
    if (errors.confirmPassword && e.target.value === confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword && e.target.value === password) {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleFavoriteTripChange = (e) => {
    setFavoriteTrip(e.target.value);
    if (errors.favoriteTrip) {
      setErrors(prev => ({ ...prev, favoriteTrip: undefined }));
    }
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
          onChange={handleEmailChange}
          className={styles.input}
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}

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
        {errors.username && <div className={styles.error}>{errors.username}</div>}

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
        {errors.password && <div className={styles.error}>{errors.password}</div>}

        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={styles.input}
        />
        {errors.confirmPassword && (
          <div className={styles.error}>{errors.confirmPassword}</div>
        )}

        <label htmlFor="favoriteTrip" className={styles.label}>Favorite Trip</label>
        <select
          id="favoriteTrip"
          value={favoriteTrip}
          onChange={handleFavoriteTripChange}
          required
          className={styles.input}
        >
          <option value="" disabled>-- Select your favorite trip --</option>
          <option value="Beach">Beach</option>
          <option value="Mountain">Mountain</option>
          <option value="City">City</option>
          <option value="Adventure">Adventure</option>
        </select>
        {errors.favoriteTrip && <div className={styles.error}>{errors.favoriteTrip}</div>}

        <button type="submit" className={styles.button}>Register</button>

        <div className={styles.signInLink}>
          Already have an account? <a href="/">Sign in</a>
        </div>
      </form>
    </div>
  );
}

export default Register;
