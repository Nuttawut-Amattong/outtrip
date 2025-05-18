import { useState } from "react";
import styles from "./login.module.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [error, setError] = useState("");


  const isValidUsername = (value) => {

    const usernameRegex = /^[a-zA-Z0-9_.]{3,30}$/;
    return usernameRegex.test(value);
  };

  const handleUserChange = (e) => {
    const val = e.target.value;
    setUser(val);

    if (val.includes("@")) {
      setError("Please enter username only, not email.");
    } else if (!isValidUsername(val)) {
      setError("Username can only include letters, numbers, _ and . (3-30 chars)");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidUsername(user)) {
      setError("Please enter a valid username before submitting.");
      return;
    }
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
        <label htmlFor="user" className={styles.label}>Username</label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={handleUserChange}
          required
          className={styles.input}
        />
        {error && <div style={{color:"red", fontSize:"0.85rem", marginBottom:"1rem"}}>{error}</div>}

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
            />

            {showForgot && (
              <div className={styles.forgotPasswordLink}>
                <a href="/forgot-password">Forgot password?</a>
              </div>
            )}
          </>
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
