import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUnits } from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [rentalDate, setRentalDate] = useState("");
  const [maxReturnDate, setMaxReturnDate] = useState("");

  // Search handler
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Sorting toggle
  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    console.log("Rental Date : ", rentalDate, "Return Date : ", maxReturnDate);
  }, [rentalDate, maxReturnDate]);

  // Product selection handler
  const handleProductSelect = (product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.some((p) => p.id === product.id)) {
        return prevSelected.filter((p) => p.id !== product.id);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, product];
      } else {
        alert("You can only select up to 2 products.");
        return prevSelected;
      }
    });
  };

  // Booking handler
  const handleBooking = async () => {
    if (!rentalDate || !maxReturnDate) {
      alert("Please select rental and return dates.");
      return;
    }

    const rentalStartDate = new Date(rentalDate);
    const rentalEndDate = new Date(maxReturnDate);
    const rentalPeriod = (rentalEndDate - rentalStartDate) / (1000 * 60 * 60 * 24);

    if (rentalPeriod > 5) {
      alert("The rental period cannot exceed 5 days.");
      return;
    }

    const token = localStorage.getItem("jwtToken"); // Replace with actual token

    try {
      const response = await fetch("http://localhost:9000/api/user/rental", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          units: selectedProducts.map((product) => product.id),
          rentalDate,
          maxReturnDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Booking successful:", responseData);
      setSelectedProducts([]); // Clear selected products after booking
      setRentalDate(""); // Clear rental date
      setMaxReturnDate(""); // Clear return date
    } catch (error) {
      console.error("Error booking products:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getUnits();
        if (response && response.data && Array.isArray(response.data.data)) {
          let fetchedProducts = response.data.data;

          // Apply search filtering
          if (searchQuery) {
            fetchedProducts = fetchedProducts.filter((product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }

          // Sort products by name or price
          fetchedProducts.sort((a, b) => {
            if (sortOrder === "asc") {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          });

          setProducts(fetchedProducts);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchQuery, sortOrder]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search and Sort Section */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-gray-700"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Sort Button */}
        <button
          type="button"
          onClick={handleSortToggle}
          className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Sort {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${
                selectedProducts.some((p) => p.id === product.id)
                  ? "border-blue-500"
                  : ""
              }`}
              onClick={() => handleProductSelect(product)}
            >
              <div className="h-56 w-full">
                <img
                  className="mx-auto h-full"
                  src={`/images/${product.image}`}
                  alt={product.name}
                />
              </div>
              <div className="pt-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                    {product.discount
                      ? `Up to ${product.discount}% off`
                      : "No Discount"}
                  </span>
                </div>

                <div className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
                  {product.name}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    ${product.price}/day
                  </span>
                  <span className="text-gray-500">
                    {product.isAvailable ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* Selected Products List */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Selected Products</h2>
        {selectedProducts.length > 0 ? (
          <ul className="space-y-4">
            {selectedProducts.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    ${product.price}/day
                  </p>
                </div>
                <button
                  onClick={() => handleProductSelect(product)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products selected.</p>
        )}
      </div>

      {/* Rental and Return Date Inputs */}
      <div className="mt-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Rental Date
        </label>
        <input
          type="date"
          className="block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          value={rentalDate}
          onChange={(e) => setRentalDate(e.target.value)}
        />
      </div>
      <div className="mt-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Return Date
        </label>
        <input
          type="date"
          className="block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          value={maxReturnDate}
          onChange={(e) => setMaxReturnDate(e.target.value)}
        />
      </div>

      {/* Booking Button */}
      <div className="mt-6">
        <button
          onClick={handleBooking}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Products;