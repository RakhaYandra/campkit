import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/api",
});

export const getCategories = async () => {
  return api.get("/categories");
};

export const getCategoryById = async (id) => {
  return api.get(`/category/${id}`);
};

// Similarly, you can define other API requests for units, rentals, etc.

export default api;
