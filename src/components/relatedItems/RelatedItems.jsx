import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import RelatedProducts from './RelatedProducts';
import YourOutfit from './YourOutfit';
import './styles.css';

function RelatedItems({ productId, bridge, setProductId, productInfo }) {
  const [relatedItems, setRelatedItems] = useState([]);
  const parentRef = useRef(null);

  useEffect(() => {
    const relatedItemsSet = new Set();
    console.log(`Related Products = ${JSON.stringify(productInfo.relatedProducts)}`);
    const relatedItemsList = [...productInfo.relatedProducts].filter((item) => {
      if (!relatedItemsSet.has(item)) {
        relatedItemsSet.add(item);
        return true;
      }
      return false;
    });
    setRelatedItems(relatedItemsList);
    // bridge.relatedProducts(productId)
    //   .then((results) => {
    //     const resultsSet = new Set();
    //     const result = results.data.filter((item) => {
    //       if (!resultsSet.has(item)) {
    //         resultsSet.add(item);
    //         return true;
    //       }
    //       return false;
    //     });
    //     return setRelatedItems(result);
    //   });
  }, [productId]);

  return (
    <div className="related_items" ref={parentRef}>
      <RelatedProducts
        relatedItems={relatedItems}
        bridge={bridge}
        setProductId={setProductId}
        productId={productId}
        productInfo={productInfo}
      />
      <br />
      <YourOutfit
        productId={productId}
        bridge={bridge}
        setProductId={setProductId}
        productInfo={productInfo}
      />
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
