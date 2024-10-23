// src/services/api.js
import axios from 'axios'

const baseURL = 'http://localhost:9000/api'

const api = axios.create({ baseURL })

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getProfile = () => api.get('/user/profile')
export const updateProfile = (data) => api.put('/user/profile', data)
export const getRentals = () => api.get('/user/rentals')
export const createRental = (data) => api.post('/user/rental', data)
export const getCategories = () => api.get('/categories')
export const getUnits = () => api.get('/units')