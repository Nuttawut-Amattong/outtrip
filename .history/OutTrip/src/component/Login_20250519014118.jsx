import { useState } from "react";
import styles from './login.module.css';

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User:", user);
    console.log("Password:", password);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginHeader}>
        <h1>OutTrip</h1>
        <h2>Log in to your account</h2>
        <div className={styles.registerLink}>
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label htmlFor="user" className={styles.label}>Username</label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Username"
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
          onFocus={() => setShowForgot(true)}
          onBlur={() => setShowForgot(false)}
          className={styles.input}
        />
        {showForgot && (
          <div className={styles.forgotPasswordLink}>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        )}
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
}

export default Login;
