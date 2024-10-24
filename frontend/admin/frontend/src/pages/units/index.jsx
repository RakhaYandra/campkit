import React from 'react';
import PropTypes from 'prop-types';

const Units = ({ units }) => {
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
    <div style={containerStyle} aria-label="Units Page">
      <h1 style={headingStyle}>Units</h1>
      <ul style={listStyle}>
        {units.length > 0 ? (
          units.map((unit) => (
            <li key={unit.id} style={listItemStyle}>
              {unit.name}
            </li>
          ))
        ) : (
          <li style={listItemStyle}>No units available</li>
        )}
      </ul>
    </div>
  );
};

Units.propTypes = {
  units: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Units;