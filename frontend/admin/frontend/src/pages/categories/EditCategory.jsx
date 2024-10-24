import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const EditCategory = ({ onUpdateSuccess }) => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.getCategory(id);
        if (response.success) {
          setCategoryName(response.data.name);
        } else {
          setError('Failed to fetch category details.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.updateCategory(id, { name: categoryName });
      if (response.success) {
        onUpdateSuccess();
      } else {
        setError('Failed to update category. Please try again.');
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
      <h1>Edit Category: {id}</h1>
      <form onSubmit={handleSubmit} style={formStyle} aria-label="Edit Category Form">
        {error && <div style={errorStyle} role="alert">{error}</div>}
        <input
          type="text"
          placeholder="New Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          style={inputStyle}
          aria-label="Category Name"
        />
        <button type="submit" style={buttonStyle}>Update</button>
      </form>
    </div>
  );
};

EditCategory.propTypes = {
  onUpdateSuccess: PropTypes.func.isRequired,
};

export default EditCategory;