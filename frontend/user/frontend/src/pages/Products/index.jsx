// src/pages/Products/index.jsx
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../services/api';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { useState } from 'react';

export default function Products() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', search],
    queryFn: () => getProducts({ search }),
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

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
        {products.map((product) => (
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
              <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-medium text-lg">
                  ${product.price_per_day}/day
                </span>
                <button
                  onClick={() => navigate(`/products/${product.id}`)}
                  disabled={product.available_quantity === 0}
                  className={`px-4 py-2 rounded-md ${
                    product.available_quantity > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.available_quantity > 0 ? 'Rent Now' : 'Out of Stock'}
                </button>
              </div>
              <div className="mt-2">
                <span className={`text-sm px-2 py-1 rounded-full ${
                  product.available_quantity > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.available_quantity} available
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found.
        </div>
      )}
    </div>
  );
}