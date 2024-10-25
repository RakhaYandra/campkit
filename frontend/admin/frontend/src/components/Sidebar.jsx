import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  console.log("User:", user);

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
    >
      <div className="overflow-y-auto py-5 px-3 h-full">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Campkit
          </h1>
          {user && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.superAdmin.fullName}
            </span>
          )}
        </div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a8 8 0 108 8 8.013 8.013 0 00-8-8zm1 11H9v-2h2zm0-4H9V5h2z"></path>
              </svg>
              <span className="ml-3">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/booking"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a8 8 0 108 8 8.013 8.013 0 00-8-8zm1 11H9v-2h2zm0-4H9V5h2z"></path>
              </svg>
              <span className="ml-3">Booking</span>
            </Link>
          </li>
          <li>
            <Link
              to="/units"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a8 8 0 108 8 8.013 8.013 0 00-8-8zm1 11H9v-2h2zm0-4H9V5h2z"></path>
              </svg>
              <span className="ml-3">Units</span>
            </Link>
          </li>
          <li>
            <Link
              to="/category"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a8 8 0 108 8 8.013 8.013 0 00-8-8zm1 11H9v-2h2zm0-4H9V5h2z"></path>
              </svg>
              <span className="ml-3">Category</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a8 8 0 108 8 8.013 8.013 0 00-8-8zm1 11H9v-2h2zm0-4H9V5h2z"></path>
              </svg>
              <span className="ml-3">Profile</span>
            </Link>
          </li>
        </ul>

        <div className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          {user ? (
            <button
              onClick={logout}
              className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-3">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5 4a3 3 0 016 0v2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h2V4zm4 4V4a1 1 0 00-2 0v4H5v8h10V8h-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-3">Login</span>
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
