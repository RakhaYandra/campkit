import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
  };

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/auth/login", label: "Login" },
    { to: "/auth/register", label: "Register" },
    { to: "/profile", label: "Profile" },
    { to: "/categories", label: "Categories" },
    { to: "/units", label: "Units" },
    { to: "/rentals", label: "Rentals" },
  ];

  return (
    <nav style={navStyle} aria-label="Main Navigation">
      {links.map((link) => (
        <Link key={link.to} to={link.to} style={linkStyle}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default Navbar;
