import React, { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import './StyleSelector.css';
import './Holistic.css';
import AddToCart from './AddToCart';
import bridge from '../bridge';

function Overview() {
  const [productId, setProductId] = useState(0);
  const [productInfo, setProductInfo] = useState(null);
  const [productStyles, setProductStyles] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [reviewsMeta, setReviewsMeta] = useState(null);

  useEffect(() => {
    bridge.listProducts()
      .then((results) => setProductId(results.data[0].id))
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  useEffect(() => {
    if (productId) {
      bridge.productInformation(productId)
        .then((response) => setProductInfo(response.data))
        .catch((error) => console.error('error fetching product information:', error));

      bridge.productStyles(productId)
        .then((response) => {
          setProductStyles(response.data);
          setSelectedStyle(response.data.results[0]);
        })
        .catch((error) => console.error('error fetching product styles:', error));

      bridge.reviewsMeta(productId)
        .then((response) => setReviewsMeta(response.data))
        .catch((error) => console.error('error fetching reviews metadata:', error));
    }
  }, [productId]);

  if (!productInfo || !productStyles || !reviewsMeta || !selectedStyle) {
    return <p>Loading...</p>;
  }

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
  };

  return (
    <div className="overview">
      <div className="left-section">
        <ImageGallery style={selectedStyle} />

        <div className="slogan-description-container">
          <div className="slogan-description">
            <div className="slogan">{productInfo.slogan}</div>
            <div className="description">{productInfo.description}</div>
          </div>
          <div className="vertical-divider" />
          <div className="filler-text">
            <p>
              ✓ No pesticides
              <br />
              ✓ GMO free
              <br />
              ✓ Organic Living Soil
            </p>
          </div>
        </div>
      </div>
      <div className="right-section">
        <ProductInformation
          product={productInfo}
          style={selectedStyle}
          reviewsMeta={reviewsMeta}
        />
        <StyleSelector
          styles={productStyles.results}
          selectedStyle={selectedStyle}
          onStyleSelect={handleStyleSelect}
        />
        <AddToCart style={selectedStyle} />
      </div>
    </div>
  );
}

export default Overview;
