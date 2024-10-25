import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";

const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-64 p-8 z-40">
      <div className="max-w-6xl mx-auto py-16">
        <h1 className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          Welcome, {user ? user.superAdmin.fullName : "Guest"}!
        </h1>
      </div>
    </div>
  );
};

export default Home;
