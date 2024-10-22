import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext(null);

const ROUTES = {
  HOME: 'HOME',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  ADMIN_DASHBOARD: 'ADMIN_DASHBOARD',
  USER_DASHBOARD: 'USER_DASHBOARD'
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(ROUTES.HOME);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setCurrentUser(data.user);
        localStorage.setItem('token', data.token);
        setCurrentRoute(data.user.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD);
        return data.user.role;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setCurrentRoute(ROUTES.LOGIN);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    setCurrentRoute(ROUTES.HOME);
  };

  const authValue = {
    user: currentUser,
    login,
    register,
    logout,
    setCurrentRoute
  };

  return (
    <AuthContext.Provider value={authValue}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        {currentRoute === ROUTES.HOME && <HomePage />}
        {currentRoute === ROUTES.LOGIN && <LoginPage />}
        {currentRoute === ROUTES.REGISTER && <RegisterPage />}
        {currentRoute === ROUTES.ADMIN_DASHBOARD && <AdminDashboard />}
        {/* {currentRoute === ROUTES.USER_DASHBOARD && <UserDashboard />} */}
      </div>
    </AuthContext.Provider>
  );
}

const Navbar = () => {
  const { user, logout, setCurrentRoute } = useContext(AuthContext);
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold cursor-pointer" onClick={() => setCurrentRoute('HOME')}>
              CampKit
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <button
                  onClick={() => setCurrentRoute('LOGIN')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentRoute('REGISTER')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CampKit
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your one-stop solution for camping equipment rentals
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Browse Equipment</h3>
            <p className="text-gray-600">
              Explore our wide range of camping gear and equipment
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Simple and secure booking process
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-gray-600">
              All equipment is thoroughly checked and maintained
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-lg text-blue-600 mt-2">
              Welcome back, Admin {user?.username}!
            </p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md">
            Role: Administrator
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Admin Privileges</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Manage User Accounts
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              View All Orders
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Manage Products
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              View Analytics
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800">Total Users</h4>
            <p className="text-2xl font-bold text-green-900">150</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800">Active Orders</h4>
            <p className="text-2xl font-bold text-blue-900">25</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800">Total Products</h4>
            <p className="text-2xl font-bold text-purple-900">75</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
          <p className="text-sm text-gray-600">
            Last login: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

// User Dashboard untuk perbandingan
const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Dashboard</h2>
            <p className="text-lg text-gray-600 mt-2">
              Welcome back, {user?.username}!
            </p>
          </div>
          <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md">
            Role: Regular User
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Available Actions</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              View Products
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Place Orders
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              View Order History
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={logout}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Logout
          </button>
          <p className="text-sm text-gray-600">
            Last login: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, setCurrentRoute } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign in
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setCurrentRoute('REGISTER')}
              className="text-blue-600 hover:text-blue-700"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, setCurrentRoute } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      setCurrentRoute('LOGIN');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create an account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setCurrentRoute('LOGIN')}
              className="text-blue-600 hover:text-blue-700"
            >
              Sign in here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};