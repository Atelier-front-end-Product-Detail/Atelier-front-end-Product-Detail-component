import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import RelatedProducts from './RelatedProducts';
import YourOutfit from './YourOutfit';
import helper from './helper';
import './styles.css';

function RelatedItems({ productId, setProductId }) {
  const parentRef = useRef(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) { return; }
      const results = await helper.getProductInfo(productId);
      setProductInfo(results);
    };

    fetchData();
  }, [productId]);

  if (JSON.stringify(productInfo) === '{}');

  useEffect(() => {
    if (!productInfo.relatedProducts) return;

    const relatedItemsSet = new Set();
    const relatedItemsList = [...productInfo.relatedProducts].filter((item) => {
      if (!relatedItemsSet.has(item) && item !== productId) {
        relatedItemsSet.add(item);
        return true;
      }
      return false;
    });
    setRelatedItems(relatedItemsList);
  }, [productInfo, productId]);

  return (
    relatedItems
      ? (
        <div className="related_items" ref={parentRef} data-testid="related items div">
          <RelatedProducts
            relatedItems={relatedItems}
            setProductId={setProductId}
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
          <br />
          <YourOutfit
            productId={productId}
            setProductId={setProductId}
            productInfo={productInfo}
          />
        </div>
      )
      : null
  );
}

RelatedItems.propTypes = {
  productId: PropTypes.number.isRequired,
  setProductId: PropTypes.func.isRequired,
};

export default RelatedItems;
