import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import bridge from '../bridge';

function AddToCart({ style }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [availableSizes, setAvailableSizes] = useState([]);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [message, setMessage] = useState('');
  const sizeSelectRef = useRef(null);

  useEffect(() => {
    if (style && style.skus) {
      const sizes = Object.values(style.skus).reduce((acc, { size, quantity }) => {
        if (quantity > 0 && !acc.some((item) => item.size === size)) {
          acc.push({ size, quantity });
        }
        return acc;
      }, []);
      setAvailableSizes(sizes);
    }
  }, [style]);

  const handleSizeChange = (event) => {
    const size = event.target.value;
    setSelectedSize(size);
    const sizeObj = availableSizes.find((s) => s.size === size);
    setMaxQuantity(Math.min(15, sizeObj ? sizeObj.quantity : 0));
    setSelectedQuantity(1);
    setMessage('');
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };

  const addToCart = () => {
    if (!selectedSize) {
      sizeSelectRef.current.focus();
      setMessage('Please select size');
      return;
    }

    const skuId = Object.keys(style.skus).find((key) => style.skus[key].size === selectedSize);

    if (skuId) {
      for (let i = 0; i < selectedQuantity; i + 1) {
        bridge.addToCart(parseInt(skuId, 10)).then(() => {
          console.log(`Added size ${selectedSize} to cart`);
        }).catch((error) => {
          console.error('Error adding to cart:', error);
        });
      }
    }
  };

  return (
    <div className="add-to-cart">
      {message && <div className="message">{message}</div>}

      <div className="selectors-container">
        <select
          ref={sizeSelectRef}
          value={selectedSize}
          onChange={handleSizeChange}
          disabled={availableSizes.length === 0}
          className="size-selector"
        >
          <option value="">Select Size XS S M L XL</option>
          {availableSizes.map(({ size }) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <select
          value={selectedQuantity}
          onChange={handleQuantityChange}
          disabled={!selectedSize || maxQuantity === 0}
          className="quantity-selector"
        >
          <option value="">Quantity</option>
          {[...Array(maxQuantity).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>{num + 1}</option>
          ))}
        </select>
      </div>

      <div className="add-to-cart-button-container">
        {availableSizes.length > 0 ? (
          <button type="button" onClick={addToCart} className="add-to-cart-button">Add to Cart</button>
        ) : (
          <button type="button" disabled className="add-to-cart-button">Out of Stock</button>
        )}
      </div>
    </div>
  );
}

AddToCart.propTypes = {
  style: PropTypes.shape({
    skus: PropTypes.objectOf(
      PropTypes.shape({
        size: PropTypes.string,
        quantity: PropTypes.number,
      }),
    ),
  }).isRequired,
};

export default AddToCart;
