import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import RelatedProducts from './RelatedProducts';
import YourOutfit from './YourOutfit';
import './styles.css';

function RelatedItems({ productId, setProductId, productInfo }) {
  const [relatedItems, setRelatedItems] = useState([]);
  const parentRef = useRef(null);

  useEffect(() => {
    const relatedItemsSet = new Set();
    const relatedItemsList = [...productInfo.relatedProducts].filter((item) => {
      if (!relatedItemsSet.has(item)) {
        relatedItemsSet.add(item);
        return true;
      }
      return false;
    });
    setRelatedItems(relatedItemsList);
  }, [productId]);

  return (
    <div className="related_items" ref={parentRef}>
      <RelatedProducts
        relatedItems={relatedItems}
        setProductId={setProductId}
        productInfo={productInfo}
      />
      <br />
      <YourOutfit
        productId={productId}
        setProductId={setProductId}
      />
    </div>
  );
}

RelatedItems.propTypes = {
  productId: PropTypes.number.isRequired,
  setProductId: PropTypes.func.isRequired,
  productInfo: PropTypes.shape({
    relatedProducts: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default RelatedItems;
