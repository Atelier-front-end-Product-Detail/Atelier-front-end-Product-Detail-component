import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductInformation = ({ productId }) => {

  const [product, setProduct] = useState(null);

  const bridge = {
    productInformation: (product_id) => axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product_id}/`,
      headers: {'Authorization': process.env.GIT_API_KEY}
    }),
    // ... (other methods from your bridge object)
  };

  useEffect(() => {
    if (productId) {
      bridge.productInformation(productId)
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error("Error fetching product information:", error);
        });
    }
  }, [productId]); // Only re-run the effect if productId changes

  if (!product) {
    return <p>Loading product information...</p>;
  }

  return (
    <div className="product-information">
      <h2>{product.name}</h2>
      <p className="product-slogan">{product.slogan}</p>
      <p className="product-description">{product.description}</p>
      <p className="product-category">{product.category}</p>
      <p className="product-price">${product.default_price}</p>
      {/* ... other product details */}
    </div>
  );
};

export default ProductInformation;