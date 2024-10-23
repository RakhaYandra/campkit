import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Camping Equipment</h2>
      <div style={styles.productList}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
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
};

export default Home;
