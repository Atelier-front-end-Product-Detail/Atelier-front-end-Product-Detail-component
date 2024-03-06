import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ComparisonModalColumn from './ComparisonModalColumn';

function ComparisonModal({ bridge, relatedItems, productId }) {
  const [comparisonInfo, setComparisonInfo] = useState([]);

  useEffect(() => {
    const fetchAllRelatedItemsInfo = async () => {
      let allItems = productId ? [productId, ...relatedItems] : [...relatedItems];
      const allItemsSet = new Set(allItems);
      allItemsSet.delete(productId);
      allItems = [productId, ...allItemsSet];
      const fetchPromises = allItems.map(async (item) => {
        const infoResults = await bridge.productInformation(item);
        const stylesResults = await bridge.productStyles(item);
        const reviewsResults = await bridge.reviewsMeta(item);

        const combinedResults = {
          ...infoResults.data,
          styles: stylesResults.data,
          reviews: reviewsResults.data,
        };

        return combinedResults;
      });

      Promise.all(fetchPromises)
        .then((results) => {
          const result = results.map((item) => {
            const defaultStyle = item.styles.results.reduce((acc, style) => (
              style['default?'] ? style : acc
            ), null);
            const thisStyle = defaultStyle || item.styles.results[0];
            return {
              name: item.name,
              category: item.category,
              id: item.id,
              style: thisStyle,
              meta: item.reviews,
            };
          });
          setComparisonInfo(result);
        });
    };

    fetchAllRelatedItemsInfo();
  }, [relatedItems]);

  return (
    <div className="comparison_modal_outer_div">
      Comparing:
      {/* {' '}
      {JSON.stringify(comparisonInfo)} */}
      <div className="comparison_modal">
        {comparisonInfo.map((productInfo) => (
          <ComparisonModalColumn
            productInfo={productInfo}
            key={`cmc ${productInfo.id}`}
            productId={productId}
          />
        ))}
      </div>
    </div>
  );
}

ComparisonModal.propTypes = {
  productId: PropTypes.number.isRequired,
  bridge: PropTypes.shape({
    productInformation: PropTypes.func.isRequired,
    productStyles: PropTypes.func.isRequired,
    reviewsMeta: PropTypes.func.isRequired,
  }).isRequired,
  relatedItems: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ComparisonModal;
