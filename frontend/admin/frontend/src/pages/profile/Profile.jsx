import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ user }) => {
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

  return (
    <div style={containerStyle} aria-label="Admin Profile Page">
      <h1 style={headingStyle}>Admin Profile</h1>
      {user ? (
        <div>
          <div style={detailStyle}><strong>Name:</strong> {user.name}</div>
          <div style={detailStyle}><strong>Email:</strong> {user.email}</div>
          {/* Add more user details here */}
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default Profile;