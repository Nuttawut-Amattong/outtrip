import { useState } from "react";
import '../CSS/login.css';

function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User:", user);
        console.log("Password:", password);
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">User Name:</label>
                <input
                    type="text"
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <div className="login-links">
                    <div className="register-link">
                        Don't have an account? <a href="/register">Register</a>
                    </div>
                    <div className="forgot-password-link">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
