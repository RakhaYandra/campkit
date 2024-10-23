import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRentals } from '../services/api'

const RentalDetail = () => {
  const { id } = useParams()
  const [rental, setRental] = useState(null)

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const response = await getRentals()
        const foundRental = response.data.find(r => r.id === id)
        setRental(foundRental)
      } catch (error) {
        console.error('Error fetching rental:', error)
      }
    }
    fetchRental()
  }, [id])

  if (!rental) return <div>Loading...</div>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rental Details</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{rental.unitName}</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">Rental Period</p>
            <p className="font-medium">
              {new Date(rental.startDate).toLocaleDateString()} - 
              {new Date(rental.endDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Total Price</p>
            <p className="text-xl font-bold text-blue-600">${rental.totalPrice}</p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <p className="font-medium">{rental.status}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RentalDetail