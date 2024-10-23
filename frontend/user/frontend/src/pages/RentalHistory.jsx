import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRentals } from '../services/api'

const RentalHistory = () => {
  const [rentals, setRentals] = useState([])

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await getRentals()
        setRentals(response.data)
      } catch (error) {
        console.error('Error fetching rentals:', error)
      }
    }
    fetchRentals()
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rental History</h1>
      <div className="space-y-4">
        {rentals.map((rental) => (
          <Link
            key={rental.id}
            to={`/rental/${rental.id}`}
            className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{rental.unitName}</h2>
                <p className="text-gray-600">
                  {new Date(rental.startDate).toLocaleDateString()} - 
                  {new Date(rental.endDate).toLocaleDateString()}
                </p>
              </div>
              <p className="text-lg font-bold text-blue-600">
                ${rental.totalPrice}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RentalHistory