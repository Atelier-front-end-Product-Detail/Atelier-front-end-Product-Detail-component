import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import RelatedProducts from './RelatedProducts';
import YourOutfit from './YourOutfit';
import helper from '../helper';
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
      if (!relatedItemsSet.has(item)) {
        relatedItemsSet.add(item);
        return true;
      }
      return false;
    });
    setRelatedItems(relatedItemsList);
  }, [productInfo, productId]);
  // ------------------------------------------
  // FOR TESTING
  // UNCOMMENT THE FOLLOWING LINE TO VIEW THE STRUCTURE OF THE productInfo object

  // useEffect(() => {
  //   console.log(`productInfo.info : ${JSON.stringify(productInfo.info)}`);
  //   console.log(`productInfo.styles : ${JSON.stringify(productInfo.styles)}`);
  //   console.log(`productInfo.relatedProducts : ${JSON.stringify(productInfo.relatedProducts)}`);
  //   console.log(`productInfo.meta : ${JSON.stringify(productInfo.meta)}`);
  //   console.log(`productInfo.reviews : ${JSON.stringify(productInfo.reviews)}`);
  //   console.log(`productInfo.questions : ${JSON.stringify(productInfo.questions)}`);
  // }, [productInfo]);

  // ------------------------------------------

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
        productInfo={productInfo}
      />
    </div>
  );
}

RelatedItems.propTypes = {
  productId: PropTypes.number.isRequired,
  setProductId: PropTypes.func.isRequired,
};

export default RelatedItems;
