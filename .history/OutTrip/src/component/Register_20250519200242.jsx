import { useState } from "react";
import { useNavigate } from "react-router-dom";  // <-- import useNavigate
import styles from "./register.module.css";

function Register({ onRegisterSuccess }) {
  const navigate = useNavigate();  // <-- เรียกใช้งาน useNavigate

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

  // ... (โค้ด validate ต่าง ๆ เหมือนเดิม)

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { email: "", username: "", password: "", confirmPassword: "" };
    let valid = true;

    // ... (validation เหมือนเดิม)

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

        // Redirect ไป path "/"
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

  // ... (handler เปลี่ยน input เหมือนเดิม)

  return (
    <div className={styles.registerContainer}>
      <header className={styles.registerHeader}>
        <h1>Create an Account</h1>
        <p>Sign up for free to start your trip.</p>
      </header>

      <form className={styles.registerForm} onSubmit={handleSubmit} noValidate>
        {/* ... ฟอร์มเหมือนเดิม */}
      </form>
    </div>
  );
}

export default Register;
