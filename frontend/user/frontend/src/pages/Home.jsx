import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getUnits } from "../services/api"; // Make sure this function calls the API at {{base_url}}/api/units

const Home = () => {
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
                product.Categories.some(
                  (category) => category.name === categoryId
                )
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
      {/* Hero Section */}

      {/* Additional Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Your outdoor escape starts here{" "}
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Explore the great outdoors with our premium camping gear! Rent
              everything you need for your next adventure
            </p>
            <a
              href="products"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:text-white dark:border-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View our products
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://antarestar.com/wp-content/uploads/2021/01/Tenda-Camping-200-x-200-1.png"
              alt="mockup"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;