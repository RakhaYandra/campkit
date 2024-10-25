// src/services/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:9000/api';

const api = axios.create({ baseURL });

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = Cookies.get('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Category endpoints
export const createCategory = (data) => api.post('/superadmin/category', data);
export const getCategories = () => api.get('/superadmin/categories');
export const getCategoryById = (id) => api.get(`/superadmin/category/${id}`);
export const updateCategory = (id, data) => api.put(`/superadmin/category/${id}`, data);
export const deleteCategory = (id) => api.delete(`/superadmin/category/${id}`);

// Profile endpoints
export const getSuperAdminProfile = () => api.get('/superadmin/profile');
export const updateSuperAdminProfile = (data) => api.put('/superadmin/profile', data);

// Rental endpoints
export const getSuperAdminRentals = () => api.get('/superadmin/rentals');
export const updateRental = (id, data) => api.put(`/superadmin/rental/${id}`, data);

// Unit endpoints
export const createUnit = (data) => api.post('/superadmin/unit', data);
export const getUnits = () => api.get('/superadmin/units');
export const getUnitById = (id) => api.get(`/superadmin/unit/${id}`);
export const updateUnit = (id, data) => api.put(`/superadmin/unit/${id}`, data);
export const deleteUnit = (id) => api.delete(`/superadmin/unit/${id}`);