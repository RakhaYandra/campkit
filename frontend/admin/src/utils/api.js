import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Sesuaikan dengan URL backend
});

export default api;
