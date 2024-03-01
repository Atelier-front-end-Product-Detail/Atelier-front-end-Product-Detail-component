import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const Overview = ({ product, styles, reviewsMeta }) => {
  // Make sure to pass the relevant style. Here, I'm assuming styles.results[0] is the default style.
  return (
    <div>
      <ProductInformation
        product={product}
        style={styles.results[0]}
        reviewsMeta={reviewsMeta}
      />
      {/* ... other components within Overview */}
    </div>
  );
};

export default Overview;