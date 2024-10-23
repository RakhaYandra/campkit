// src/pages/Products/index.jsx
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useState } from "react";

const dummyProducts = [
  {
    id: 1,
    name: "Tent",
    description: "A spacious 4-person tent.",
    price_per_day: 20,
    available_quantity: 5,
    image_urls: ["/images/tent.jpg"],
  },
  {
    id: 2,
    name: "Sleeping Bag",
    description: "A warm and comfortable sleeping bag.",
    price_per_day: 10,
    available_quantity: 10,
    image_urls: ["/images/sleeping_bag.jpg"],
  },
  {
    id: 3,
    name: "Camping Stove",
    description: "A portable camping stove.",
    price_per_day: 15,
    available_quantity: 3,
    image_urls: ["/images/camping_stove.jpg"],
  },
  // Add more dummy products as needed
];

export default function Products() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredProducts = dummyProducts.filter((product) => {
    const searchWords = search.toLowerCase().split(" ");
    return searchWords.every((word) =>
      product.name.toLowerCase().includes(word)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Available Products</h1>
        <div className="w-72">
          <Input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={product.image_urls?.[0] || "/api/placeholder/400/320"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {product.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-medium text-lg">
                  ${product.price_per_day}/day
                </span>
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  disabled={product.available_quantity === 0}
                  className={`px-4 py-2 rounded-md ${
                    product.available_quantity > 0
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.available_quantity > 0 ? "Rent Now" : "Out of Stock"}
                </button>
              </div>
              <div className="mt-2">
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    product.available_quantity > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.available_quantity} available
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">No products found.</div>
      )}
    </div>
  );
}
