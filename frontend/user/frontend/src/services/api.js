// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'  // Sesuaikan dengan port backend Anda
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', {
      username: userData.username,
      email: userData.email,
      password: userData.password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/auth/profile', userData);
    // Update stored user data if profile update is successful
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

// Products API
export const getProducts = async (filters = {}) => {
  try {
    const response = await api.get('/products', { params: filters });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product');
  }
};

// Borrowings API
export const createBorrowing = async (borrowingData) => {
  try {
    const response = await api.post('/borrowings', borrowingData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create borrowing');
  }
};

export const getUserBorrowings = async () => {
  try {
    const response = await api.get('/borrowings/user');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch borrowings');
  }
};

export const getActiveBorrowings = async () => {
  try {
    const response = await api.get('/borrowings/active');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch active borrowings');
  }
};

export const getBorrowingStats = async () => {
  try {
    const response = await api.get('/borrowings/stats');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch borrowing stats');
  }
};

export const updateBorrowingStatus = async (borrowingId, status, adminNotes) => {
  try {
    const response = await api.put(`/borrowings/${borrowingId}/status`, {
      status,
      adminNotes
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update borrowing status');
  }
};

// Notifications API
export const getNotifications = async () => {
  try {
    const response = await api.get('/notifications');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
  }
};

export const getUnreadNotificationsCount = async () => {
  try {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch unread notifications count');
  }
};

// Categories API (if needed)
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch categories');
  }
};