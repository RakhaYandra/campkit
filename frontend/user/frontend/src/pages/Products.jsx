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

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleSortToggle = () =>
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));

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

  const handleBooking = async () => {
    if (!rentalDate || !maxReturnDate) {
      alert("Please select rental and return dates.");
      return;
    }

    const rentalStartDate = new Date(rentalDate);
    const rentalEndDate = new Date(maxReturnDate);
    const rentalPeriod =
      (rentalEndDate - rentalStartDate) / (1000 * 60 * 60 * 24);

    if (rentalPeriod > 5) {
      alert("The rental period cannot exceed 5 days.");
      return;
    }

    const token = localStorage.getItem("jwtToken");

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

      if (!response.ok) throw new Error("Network response was not ok");

      const responseData = await response.json();
      console.log("Booking successful:", responseData);
      setSelectedProducts([]);
      setRentalDate("");
      setMaxReturnDate("");
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

          if (searchQuery) {
            fetchedProducts = fetchedProducts.filter((product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }

          fetchedProducts.sort((a, b) =>
            sortOrder === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          );

          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchQuery, sortOrder]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Search and Sort Section */}
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          onClick={handleSortToggle}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductSelect(product)}
              className={`cursor-pointer p-4 rounded-lg border ${
                selectedProducts.some((p) => p.id === product.id)
                  ? "border-blue-600"
                  : "border-gray-200"
              } transition-transform transform hover:scale-105`}
            >
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.name}
                className="h-40 w-full object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">${product.price}/day</p>
              <span
                className={`text-xs font-medium mt-1 ${
                  product.isAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.isAvailable ? "Available" : "Not Available"}
              </span>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* Selected Products and Booking Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Selected Products</h2>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div>
            {selectedProducts.length > 0 ? (
              <ul className="space-y-2">
                {selectedProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between space-x-2"
                  >
                    <span className="font-medium">{product.name}</span>
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
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Rental Date
              </label>
              <input
                type="date"
                value={rentalDate}
                onChange={(e) => setRentalDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Return Date
              </label>
              <input
                type="date"
                value={maxReturnDate}
                onChange={(e) => setMaxReturnDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <div className="mt-6 text-right">
          <button
            onClick={handleBooking}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
