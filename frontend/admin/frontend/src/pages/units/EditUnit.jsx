import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const EditUnit = ({ onUpdateSuccess }) => {
  const { id } = useParams();
  const [unitName, setUnitName] = useState('');
  const [unitCode, setUnitCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const response = await api.getUnit(id);
        if (response.success) {
          setUnitName(response.data.name);
          setUnitCode(response.data.code);
        } else {
          setError('Failed to fetch unit details.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };
    fetchUnit();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.updateUnit(id, { name: unitName, code: unitCode });
      if (response.success) {
        onUpdateSuccess();
      } else {
        setError('Failed to update unit. Please try again.');
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
    <div style={{ padding: '20px' }} aria-label="Edit Unit Page">
      <h1>Edit Unit: {id}</h1>
      <form onSubmit={handleSubmit} style={formStyle} aria-label="Edit Unit Form">
        {error && <div style={errorStyle} role="alert">{error}</div>}
        <input
          type="text"
          placeholder="New Unit Name"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          required
          style={inputStyle}
          aria-label="Unit Name"
        />
        <input
          type="text"
          placeholder="New Unit Code"
          value={unitCode}
          onChange={(e) => setUnitCode(e.target.value)}
          required
          style={inputStyle}
          aria-label="Unit Code"
        />
        <button type="submit" style={buttonStyle}>Update</button>
      </form>
    </div>
  );
};

EditUnit.propTypes = {
  onUpdateSuccess: PropTypes.func.isRequired,
};

export default EditUnit;