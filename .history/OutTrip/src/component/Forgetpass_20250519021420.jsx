import React, { useState } from 'react';
import styles from './forgetpass.module.css';

const Forgetpass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('If this email is registered, you will receive a password reset link.');
    setIsSubmitted(true);
  };

  return (
    <div className={styles.container} role="main" aria-label="Forgot Password Form">
      <h2 className={styles.heading}>Forgot Password</h2>
      <p>To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</p>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Enter your email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={styles.input}
              aria-required="true"
              aria-describedby="emailHelp"
            />
          </div>
          <button type="submit" className={styles.button}>
            Reset Password
          </button>
        </form>
      ) : (
        <p className={styles.message} role="alert" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
};

export default Forgetpass;
