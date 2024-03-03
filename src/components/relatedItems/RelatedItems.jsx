import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RelatedProducts from './RelatedProducts';
import './styles.css';

function RelatedItems({ productId, bridge, setProductId }) {
  const [relatedItems, setRelatedItems] = useState([]);
  useEffect(() => {
    bridge.relatedProducts(productId)
      .then((results) => {
        const resultsSet = new Set();
        const result = results.data.filter((item) => {
          if (!resultsSet.has(item)) {
            resultsSet.add(item);
            return true;
          }
          return false;
        });
        return setRelatedItems(result);
      });
  }, [productId]);

  return (
    <div>
      <RelatedProducts relatedItems={relatedItems} bridge={bridge} setProductId={setProductId} />
    </div>
  );
}

RelatedItems.propTypes = {
  productId: PropTypes.number.isRequired,
  bridge: PropTypes.shape({
    relatedProducts: PropTypes.func.isRequired,
  }).isRequired,
  setProductId: PropTypes.func.isRequired,
};

export default RelatedItems;
