import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

const CreateCategory = ({ onCreateSuccess }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.createCategory({ name: categoryName });
      if (response.success) {
        onCreateSuccess();
      } else {
        setError('Failed to create category. Please try again.');
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
    <div>
      <h1>Create Category</h1>
      <form onSubmit={handleSubmit} style={formStyle} aria-label="Create Category Form">
        {error && <div style={errorStyle} role="alert">{error}</div>}
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          style={inputStyle}
          aria-label="Category Name"
        />
        <button type="submit" style={buttonStyle}>Create</button>
      </form>
    </div>
  );
};

CreateCategory.propTypes = {
  onCreateSuccess: PropTypes.func.isRequired,
};

export default CreateCategory;