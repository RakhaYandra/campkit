import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const mainStyle = {
    flex: "1",
    padding: "20px",
  };

  return (
    <div style={layoutStyle}>
      <Navbar />
      <main style={mainStyle} role="main">
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
