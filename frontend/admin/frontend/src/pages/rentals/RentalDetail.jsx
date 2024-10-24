import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const RentalDetail = () => {
  const { id } = useParams();
  const [rental, setRental] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const response = await api.getRental(id);
        if (response.success) {
          setRental(response.data);
        } else {
          setError('Failed to fetch rental details.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };
    fetchRental();
  }, [id]);

  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const detailStyle = {
    marginBottom: '10px',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle} aria-label="Rental Detail Page">
      <h1 style={headingStyle}>Rental Detail: {id}</h1>
      {error && <div style={errorStyle} role="alert">{error}</div>}
      {rental ? (
        <div>
          <div style={detailStyle}><strong>Name:</strong> {rental.name}</div>
          <div style={detailStyle}><strong>Description:</strong> {rental.description}</div>
          <div style={detailStyle}><strong>Price:</strong> ${rental.price}</div>
          {/* Add more rental details here */}
        </div>
      ) : (
        <p>Loading rental details...</p>
      )}
    </div>
  );
};

RentalDetail.propTypes = {
  id: PropTypes.string,
};

export default RentalDetail;