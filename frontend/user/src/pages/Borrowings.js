import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

const Borrowing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products'); // Ambil daftar produk dari API
        setProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBorrow = async (productId) => {
    const token = localStorage.getItem('token');
    const borrowData = {
      booking_code: `BOOK-${Date.now()}`, // Buat booking code unik
      user_id: JSON.parse(localStorage.getItem('user')).id, // Ambil user ID dari localStorage
      status: 'pending',
      total_price: 20.00, // Ganti dengan logika perhitungan harga total
      borrow_date: new Date().toISOString().split('T')[0], // Tanggal hari ini
      return_date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0], // Tanggal 5 hari ke depan
    };

    try {
      await API.post('/borrowings', borrowData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Product borrowed successfully!');
    } catch (error) {
      alert('Failed to borrow product. Please try again.');
    }
  };

  if (loading) {
    return <p style={styles.loading}>Loading products...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Products</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onBorrow={() => handleBorrow(product.id)} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  loading: {
    fontSize: '18px',
    color: '#666',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
};

export default Borrowing;
