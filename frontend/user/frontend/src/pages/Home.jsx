import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log('Fetched categories:', response); // Log the entire response
        // Extract the data array from the response
        if (response && response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data); // response.data.data contains the categories array
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to Rental App</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.isArray(categories) &&
            categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-medium">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
