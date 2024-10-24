import React from 'react';
import PropTypes from 'prop-types';

const Rentals = ({ rentals }) => {
  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const listItemStyle = {
    padding: '10px',
    borderBottom: '1px solid #ccc',
  };

  return (
    <div style={containerStyle} aria-label="Rentals Page">
      <h1 style={headingStyle}>Rentals</h1>
      <p>Here is the list of rentals...</p>
      <ul style={listStyle}>
        {rentals.length > 0 ? (
          rentals.map((rental) => (
            <li key={rental.id} style={listItemStyle}>
              {rental.name}
            </li>
          ))
        ) : (
          <li style={listItemStyle}>No rentals available</li>
        )}
      </ul>
    </div>
  );
};

Rentals.propTypes = {
  rentals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Rentals;