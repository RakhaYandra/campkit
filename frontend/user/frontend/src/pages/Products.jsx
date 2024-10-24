import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getUnits } from "../services/api"; // Make sure this function calls the API at {{base_url}}/api/units

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category"); // Get categoryId from query string

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getUnits(); // Fetch products (units) from backend
        if (response && response.data && Array.isArray(response.data.data)) {
          // Filter products based on categoryId, if provided
          const filteredProducts = categoryId
            ? response.data.data.filter((product) =>
                product.Categories.some((category) => category.name === categoryId)
              )
            : response.data.data;

          setProducts(filteredProducts);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryId]); // Re-run effect when categoryId changes

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={`/images/${product.image}`} // Assuming you serve images from the /images directory
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">${product.price}/day</p>
                <p className="text-gray-500">
                  {product.isAvailable ? "Available" : "Not Available"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Products;