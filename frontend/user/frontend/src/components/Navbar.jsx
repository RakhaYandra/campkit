import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link>
            <Link to="/products" className="text-gray-800 hover:text-gray-600">Products</Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/rentals" className="text-gray-800 hover:text-gray-600">My Rentals</Link>
                <Link to="/profile" className="text-gray-800 hover:text-gray-600">Profile</Link>
                <button onClick={logout} className="text-gray-800 hover:text-gray-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-800 hover:text-gray-600">Login</Link>
                <Link to="/register" className="text-gray-800 hover:text-gray-600">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar