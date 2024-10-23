import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}><Link to="/" style={styles.navLink}>Home</Link></li>
        {isAuthenticated ? (
          <>
            <li style={styles.navItem}><Link to="/borrowings" style={styles.navLink}>My Borrowings</Link></li>
            <li style={styles.navItem}><Link to="/profile" style={styles.navLink}>Profile</Link></li>
            <li style={styles.navItem}><button onClick={logout} style={styles.logoutButton}>Logout</button></li>
          </>
        ) : (
          <>
            <li style={styles.navItem}><Link to="/login" style={styles.navLink}>Login</Link></li>
            <li style={styles.navItem}><Link to="/register" style={styles.navLink}>Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#007BFF',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'center',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    gap: '20px',
  },
  navItem: {
    margin: '0',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '18px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Navbar;
