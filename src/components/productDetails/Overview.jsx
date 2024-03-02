import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const Overview = ({ product, styles, reviewsMeta }) => {
  // Assuming 'styles' is an object with a 'results' property that is an array of style objects
  const defaultStyle = styles.results[0];

  return (
    <div className="overview">
      <ImageGallery style={defaultStyle} />
      <ProductInformation
        product={product}
        style={defaultStyle}
        reviewsMeta={reviewsMeta}
      />
      <StyleSelector
        styles={styles.results}
        selectedStyle={defaultStyle}
      />
      <AddToCart
        style={defaultStyle}
      />
      {/* wip */}
    </div>
  );
};

export default Overview;