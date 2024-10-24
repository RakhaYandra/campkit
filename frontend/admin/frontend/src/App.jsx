import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCategory from "./pages/categories/CreateCategory";
import EditCategory from "./pages/categories/EditCategory";
import Units from "./pages/units/index";
import CreateUnit from "./pages/units/CreateUnit";
import EditUnit from "./pages/units/EditUnit";
import Rentals from "./pages/rentals/index";
import RentalDetail from "./pages/rentals/RentalDetail";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/categories/create" element={<CreateCategory />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />
          <Route path="/units" element={<Units />} />
          <Route path="/units/create" element={<CreateUnit />} />
          <Route path="/units/edit/:id" element={<EditUnit />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/rentals/:id" element={<RentalDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
