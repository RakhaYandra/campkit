import React from 'react';
import PropTypes from 'prop-types';

const Categories = ({ categories }) => {
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
    <div style={containerStyle} aria-label="Categories Page">
      <h1 style={headingStyle}>Categories</h1>
      <ul style={listStyle}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id} style={listItemStyle}>
              {category.name}
            </li>
          ))
        ) : (
          <li style={listItemStyle}>No categories available</li>
        )}
      </ul>
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Categories;