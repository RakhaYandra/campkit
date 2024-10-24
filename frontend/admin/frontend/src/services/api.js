import axios from 'axios'

const baseURL = 'http://localhost:9000/api/superadmin'

// Create an instance of axios with default settings
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add the token to the request headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle unauthorized (401) responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      window.location.href = '/auth/login' // Redirect to the login page
    }
    return Promise.reject(error)
  }
)

// Auth Endpoints
export const register = (data) => api.post('/auth/register', data)
export const login = (data) => api.post('/auth/login', data)
export const updateAdminAccount = (data) => api.put('/auth/update-superadmin-account', data)

// Profile Endpoints
export const getProfile = () => api.get('/profile')
export const updateProfile = (data) => api.put('/profile', data)

// Category Endpoints
export const getCategories = () => api.get('/categories')
export const getCategoryById = (id) => api.get(`/category/${id}`)
export const createCategory = (data) => api.post('/category', data)
export const updateCategory = (id, data) => api.put(`/category/${id}`, data)
export const deleteCategory = (id) => api.delete(`/category/${id}`)

// Unit Endpoints
export const getUnits = () => api.get('/units')
export const getUnitById = (id) => api.get(`/unit/${id}`)
export const createUnit = (data) => api.post('/unit', data)
export const updateUnit = (id, data) => api.put(`/units/${id}`, data)
export const deleteUnit = (id) => api.delete(`/units/${id}`)

// Rental Endpoints
export const getRentals = () => api.get('/rentals')
export const returnItem = (id) => api.put(`/rental/${id}`)

export default api
