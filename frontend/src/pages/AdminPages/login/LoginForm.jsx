import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css';  // Importar los estilos

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', formData);
      console.log('User logged in:', response.data);
      localStorage.setItem('token', response.data.user);
      navigate('/admin');  // Redirigir al dashboard o página principal del admin
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="auth-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="auth-input"
        />
        <button type="submit" className="auth-button">Login</button>
      </form>
      <div className="auth-link-container">
        <Link to="/signup" className="auth-link">Regístrate</Link>
      </div>
    </div>
  );
};

export default LoginForm;
