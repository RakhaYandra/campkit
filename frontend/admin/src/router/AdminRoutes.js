import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminHome from '../pages/AdminHome';
import LoginPage from '../pages/LoginPage';

const AdminRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/home" element={<AdminHome />} />
      </Routes>
    </Router>
  );
};

export default AdminRoutes;
