import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.login({ email, password });
      if (response.success) {
        setIsAuthenticated(true);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '0 auto',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '10px',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle} aria-label="Login Form">
      {error && <div style={errorStyle} role="alert">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
        aria-label="Email"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={inputStyle}
        aria-label="Password"
      />
      <button type="submit" style={buttonStyle}>Login</button>
    </form>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;