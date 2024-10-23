import React from 'react';

const ProductCard = ({ product, onBorrow }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{product.name}</h3>
      <p style={styles.description}>{product.description}</p>
      <p><strong>Available Quantity:</strong> {product.available_quantity}</p>
      <p><strong>Price per Day:</strong> ${product.price_per_day}</p>
      <button style={styles.button} onClick={onBorrow}>Borrow</button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '300px',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#333',
  },
  description: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default ProductCard;
