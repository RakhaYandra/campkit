import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/register">Register</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/categories">Categories</Link>
      <Link to="/units">Units</Link>
      <Link to="/rentals">Rentals</Link>
    </nav>
  );
};

export default Navbar;
