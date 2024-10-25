import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
      setUser(response.data.data);
      console.log("User Logged In:", response.data.data.token);
    localStorage.setItem("jwtToken", response.data.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("jwtToken");
    window.location.href = "/login";
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
