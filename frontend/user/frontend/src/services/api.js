// src/services/api.js
import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = 'http://localhost:9000/api'

const api = axios.create({ baseURL })

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const bookRental = async (data) => {
  return await axios.post(`${baseURL}/user/rental`, data);
};

export const getProfile = () => api.get('/user/profile')
export const updateProfile = (data) => api.put('/user/profile', data)
export const getRentals = () => api.get('/user/rentals')
export const createRental = (data) => api.post('/user/rental', data)
export const getCategories = () => api.get('/categories')
export const getUnits = () => api.get('/units')