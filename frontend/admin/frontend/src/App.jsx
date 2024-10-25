import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Units from "./pages/Units";
import Booking from "./pages/Booking";
import BookingDetail from "./pages/BookingDetail";
import Category from "./pages/Category";
import CategoryForm from "./pages/CategoryForm";
import UnitsForm from "./pages/UnitsForm";
import UnitsDetail from "./pages/UnitsDetail";
import CategoryDetail from "./pages/CategoryDetail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/units" element={<Units />} />
            <Route path="/units/create" element={<UnitsForm />} />
            <Route path="/units/detail/:id" element={<UnitsDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/create" element={<CategoryForm />} />
            <Route path="/category/detail/:id" element={<CategoryDetail />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:id" element={<BookingDetail />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
