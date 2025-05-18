import React, { useState } from 'react';
import '../CSS/register.model.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: '', 
    trip: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      setError('Passwords do not match');
      return;
    }

    console.log('Registering user:', formData);

  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>OutTrip</h1>
        <h2>Create your account</h2>
        <div className="forgot-password-link">
          Have an account?  
          <a href="/"> login now!</a>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="rePassword">Re-enter Password</label>
        <input
          type="password"
          id="rePassword"
          name="rePassword"
          value={formData.rePassword}
          onChange={handleChange}
          required
        />

        <label htmlFor="trip">Trips of interest</label>
        <input
          type="text"
          id="trip"
          name="trip"
          value={formData.trip}
          onChange={handleChange}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
