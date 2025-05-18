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
                    <label htmlFor="username">Username:</label>
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
                    <label htmlFor="email">Email:</label>
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
                    <label htmlFor="password">Password:</label>
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
                    <label htmlFor="rePassword">Re-enter Password:</label>
                    <input
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        value={formData.rePassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}  {/* แสดง error */}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
