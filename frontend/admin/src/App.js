import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Borrowings from './pages/Borrowings';
import Profile from './pages/Profile';
import { MyContextProvider } from './MyContext'; // Import the context provider

function App() {
  return (
    <Router>
      <MyContextProvider> {/* Wrap the component tree with the context provider */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/borrowings" element={<Borrowings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MyContextProvider>
    </Router>
  );
}

export default App;