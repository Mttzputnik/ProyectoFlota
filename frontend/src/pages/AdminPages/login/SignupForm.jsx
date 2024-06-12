import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css';  // Importar los estilos

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    first_surname: '',
    second_surname: '',
    identification: '',
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
      const response = await axios.post('http://localhost:3001/auth/signup', formData);
      console.log('User registered:', response.data);
      navigate('/login');  // Redirigir a la página de login
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          className="auth-input"
        />
        <input
          type="text"
          name="first_surname"
          placeholder="First Surname"
          value={formData.first_surname}
          onChange={handleChange}
          className="auth-input"
        />
        <input
          type="text"
          name="second_surname"
          placeholder="Second Surname"
          value={formData.second_surname}
          onChange={handleChange}
          className="auth-input"
        />
        <input
          type="text"
          name="identification"
          placeholder="Identification"
          value={formData.identification}
          onChange={handleChange}
          className="auth-input"
        />
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
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <div className="auth-link-container">
        <Link to="/" className="auth-link">Iniciar sesión</Link>
      </div>
    </div>
  );
};

export default SignupForm;
