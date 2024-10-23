import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHome from '../pages/UserHome';
import LoginPage from '../pages/LoginPage';

const UserRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/home" element={<UserHome />} />
      </Routes>
    </Router>
  );
};

export default UserRoutes;
