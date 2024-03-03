import React from 'react';
import PropTypes from 'prop-types';
import RelatedProductCard from './RelatedProductCard';

function RelatedProducts({ relatedItems, bridge, setProductId }) {
  return (
    <div id="related_products">
      {relatedItems.map((productId) => (
        <RelatedProductCard
          productId={productId}
          bridge={bridge}
          key={productId}
          setProductId={setProductId}
        />
      ))}
    </div>
  );
}

RelatedProducts.propTypes = {
  relatedItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  bridge: PropTypes.shape({}).isRequired,
  setProductId: PropTypes.func.isRequired,
};

export default RelatedProducts;
