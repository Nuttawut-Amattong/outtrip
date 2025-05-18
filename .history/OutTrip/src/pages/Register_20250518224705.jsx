import React, { useState } from 'react';
import '../CSS/register.css'; 
const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        rePassword: '', 
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
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rePassword">Re-enter Password</label>
                    <input
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        value={formData.rePassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFOr="trip">Trips of interest</label>
                    <select id="trip" name="trip" required>
                        <option value="">Select a trip</option>
                        <option value="trip1">Trip 1</option>
                        <option value="trip2">Trip 2</option>
                        <option value="trip3">Trip 3</option>
                    <select
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}  {/* แสดง error */}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
