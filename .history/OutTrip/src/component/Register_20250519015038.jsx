import { useState } from "react";
import styles from "./register.module.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    // ทำงานเพิ่ม เช่น เรียก API สมัครสมาชิก
    console.log("Register:", { email, password });
  };

  return (
    <div className={styles.registerContainer}>
      <header className={styles.registerHeader}>
        <h1>Create an Account</h1>
        <p>Sign up for free to st.</p>
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
