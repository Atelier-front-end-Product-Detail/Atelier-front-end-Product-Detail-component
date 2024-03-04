import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';

function Overview({ product, styles, reviewsMeta }) {
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
      <AddToCart style={defaultStyle} />
      {/* wip */}
    </div>
  );
}

Overview.propTypes = {
  product: PropTypes.shape({
    // id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  styles: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({
        // id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        // stuff
      }).isRequired,
    ).isRequired,
  }).isRequired,
  reviewsMeta: PropTypes.shape({
    rating: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
};

export default Overview;
