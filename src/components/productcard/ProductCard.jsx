import React, { useState } from 'react';
import './productcard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    try {
      const response = await fetch('https://demotestmern.azurewebsites.net/api/users/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      if (response.status === 401) {
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      const data = await response.json();
      console.log('Product added to cart:', data);
      setMessage('Added to cart');
      setButtonVisible(false);

      setTimeout(() => {
        setMessage('');
        setButtonVisible(true);
      }, 6000);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setMessage('Failed to add to cart');
    }
  };

  return (
    <div className="home-product-item">
      <Link to={`/products/${product._id}`} target="_blank" rel="noopener noreferrer" key={product._id}>
        <div className="home-product-img">
          <img src={product.images[0]} alt={product.name} />
        </div>
      </Link>
      <div className="home-product-details">
        <Link to={`/products/${product._id}`} key={product._id}>
          <div className="h-product-title">
            {product.name}         
          </div>
        </Link>
        <div className="h-product-subtitle">
          {product.description}
        </div>
        <hr className='pc-divider' />
        <div className="h-product-price-cart">
          <div className="h-product-prices">
            <div className="h-p-price">
              ${product.price}
            </div>
          </div>
          <div className="h-p-cart-btn">
            {message ? (
              <span>{message}</span> // Display plain text message
            ) : (
              <button onClick={handleAddToCart}>
                <span>Add to Cart</span>
                <i className="fas fa-shopping-cart"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
