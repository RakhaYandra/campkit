import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUnits } from '../services/api'
import { useAuth } from '../context/AuthContext'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getUnits()
        // Ensure you are accessing the correct array
        const foundProduct = response.data.data.find(p => p.id === parseInt(id))
        setProduct(foundProduct)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }
    fetchProduct()
  }, [id])

  const handleRentClick = () => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate('/rental/book', { state: { productId: id } })
  }

  if (!product) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="mb-4">
          <p className="text-xl font-bold text-blue-600">${product.price}/day</p>
        </div>
        <button
          onClick={handleRentClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Rent Now
        </button>
      </div>
    </div>
  )
}

export default ProductDetail