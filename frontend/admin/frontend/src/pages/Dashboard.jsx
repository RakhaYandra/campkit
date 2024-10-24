import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ user }) => {
  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const welcomeStyle = {
    fontSize: '18px',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle} aria-label="Dashboard Page">
      <h1 style={headingStyle}>Dashboard</h1>
      <p style={welcomeStyle}>Welcome to the admin dashboard, {user.name}!</p>
      {/* Add future dashboard widgets or components here */}
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Dashboard;