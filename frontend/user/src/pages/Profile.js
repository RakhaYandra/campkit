import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await API.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.put('/auth/profile', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully');
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return <p style={styles.loading}>Loading profile...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Profile</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          placeholder="Username"
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Update Profile</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loading: {
    fontSize: '18px',
    color: '#666',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default Profile;
