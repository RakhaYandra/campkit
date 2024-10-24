import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/user/auth/login",
        {
          email,
          password,
        }
      );
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/user/auth/register",
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};