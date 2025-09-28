import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/login', {
      email,
      password,
    })
    .then(response => {
      if (response.status === 200) {
        // Redirect to Home page on successful login
        localStorage.setItem('userDetails', JSON.stringify(response.data));
        localStorage.setItem('selPropertyName', response.data.property_name);
        localStorage.setItem('selProperty', response.data.property_id);
        navigate('/');
      }
    })
    .catch(error => {
      setErrorMessage('Invalid email or password');
    });
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      {/* Logo/Header section */}
      <div className="mb-4 text-center">
        <h1 className="java-terrain-logo">JavaTerrain</h1>
        {/* You can use an image for a logo if you have one */}
         <img  className="mb-4 logo" style={{ width: '200px' }} /> 
      </div>

      {/* Login card */}
      <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
