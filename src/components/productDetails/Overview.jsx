import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import './StyleSelector.css';
import './Holistic.css';
import './Star.css';
import AddToCart from './AddToCart';
import bridge from '../bridge';

function Overview({ productId }) {
  const [productInfo, setProductInfo] = useState(null);
  const [productStyles, setProductStyles] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [reviewsMeta, setReviewsMeta] = useState(null);

  useEffect(() => {
    if (productId) {
      bridge.productInformation(productId)
        .then((response) => {
          setProductInfo(response.data);
        });

      bridge.productStyles(productId)
        .then((response) => {
          setProductStyles(response.data);
          setSelectedStyle(response.data.results[0]);
        });

      bridge.reviewsMeta(productId)
        .then((response) => {
          setReviewsMeta(response.data);
        });
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
        <div className="image-gallery-wrapper">
          <ImageGallery style={selectedStyle} />
        </div>
        <div className="slogan-description-wrapper">
          <div className="slogan-description-container">
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

Overview.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Overview;
