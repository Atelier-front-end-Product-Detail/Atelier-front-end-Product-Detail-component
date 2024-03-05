import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function AddToCart({ style }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [availableSizes, setAvailableSizes] = useState([]);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [message, setMessage] = useState('');
  const sizeSelectRef = useRef(null);

  // find sizes for that type of style/sku
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
    // clears Please Select Size message when size selected
    setMessage('');
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };

  const addToCart = () => {
    if (!selectedSize) {
      sizeSelectRef.current.focus();
      setMessage('Please select size');
    } else {
      // add cart... here later
      console.log(`Added ${selectedQuantity} of size ${selectedSize} to cart`);
    }
  };

  return (
    <div className="add-to-cart">
      {message && <div className="message">{message}</div>}

      <select
        ref={sizeSelectRef}
        value={selectedSize}
        onChange={handleSizeChange}
        disabled={availableSizes.length === 0}
      >
        <option value="">Select Size</option>
        {availableSizes.map(({ size }) => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>

      <select
        value={selectedQuantity}
        onChange={handleQuantityChange}
        disabled={!selectedSize || maxQuantity === 0}
      >
        <option value="">-</option>
        {[...Array(maxQuantity).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>{num + 1}</option>
        ))}
      </select>

      {availableSizes.length > 0 ? (
        <button type="button" onClick={addToCart}>Add to Cart</button>
      ) : (
        <button type="button" disabled>Out of Stock</button>
      )}
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
