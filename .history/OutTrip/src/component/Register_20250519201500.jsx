import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";

function Register({ onRegisterSuccess }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [favoriteTrip, setFavoriteTrip] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // แก้ validateUsername ให้รับเฉพาะตัวพิมพ์เล็ก a-z, ตัวเลข 0-9, _ และ . ความยาว 3-8
  const validateUsername = (username) => {
    const usernameRegex = /^[a-z0-9_.]{3,8}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLetter && hasNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { email: "", username: "", password: "", confirmPassword: "" };
    let valid = true;

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!validateUsername(username)) {
      newErrors.username = "Username must be 3-8 characters, lowercase letters, numbers, _ or . only";
      valid = false;
    }

    if (!validatePassword(password)) {
      newErrors.password = "Password must contain both letters and numbers";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Confirm Password must match Password";
      valid = false;
    }

    setErrors(newErrors);
    setServerError("");

    if (!valid) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, favoriteTrip }),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        if (onRegisterSuccess) onRegisterSuccess(data);
        navigate("/");
      } else {
        setLoading(false);
        setServerError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setServerError("Server error. Please try again later.");
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (validateEmail(val)) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  // แก้ handleUsernameChange ให้แสดง error ทันทีถ้าไม่ผ่านเงื่อนไขตัวพิมพ์เล็ก
  const handleUsernameChange = (e) => {
    const val = e.target.value;
    setUsername(val);
    if (validateUsername(val)) {
      setErrors((prev) => ({ ...prev, username: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        username: "Username must be 3-8 characters, lowercase letters, numbers, _ or . only",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (validatePassword(val)) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
    if (confirmPassword === val) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (val === password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  return (
    <div className={styles.registerContainer}>
      <header className={styles.registerHeader}>
        <h1>Create an Account</h1>
        <p>Sign up for free to start your trip.</p>
      </header>

      <form className={styles.registerForm} onSubmit={handleSubmit} noValidate>
        <label htmlFor="email" className={styles.label}>Email address</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
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
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={styles.input}
        />
        {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}

        <label htmlFor="favoriteTrip" className={styles.label}>Favorite Trip</label>
        <select
          id="favoriteTrip"
          value={favoriteTrip}
          onChange={(e) => setFavoriteTrip(e.target.value)}
          className={styles.input}
          required
        >
          <option value="" disabled>-- Select your favorite trip --</option>
          <option value="Beach">Beach</option>
          <option value="Mountain">Mountain</option>
          <option value="City">City</option>
          <option value="Adventure">Adventure</option>
        </select>

        {serverError && <div className={styles.error} style={{ marginTop: "1rem" }}>{serverError}</div>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <div className={styles.signInLink}>
          Already have an account? <a href="/">Sign in</a>
        </div>
      </form>
    </div>
  );
}

export default Register;
