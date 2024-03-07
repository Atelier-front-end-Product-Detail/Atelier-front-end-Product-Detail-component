import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ComparisonModalRow from './ComparisonModalRow';

function ComparisonModal({ bridge, relatedItems, productId }) {
  const [comparisonNames, setComparisonNames] = useState([]);
  const [comparisonCats, setComparisonCats] = useState([]);
  const [comparisonPrices, setComparisonPrices] = useState([]);
  const [comparisonRatings, setComparisonRatings] = useState([]);

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
          setComparisonNames(result.map((item) => item.name));
          setComparisonCats(result.map((item) => item.category));
          setComparisonPrices(result.map((item) => item.style.original_price));
          setComparisonRatings(result.map((item) => {
            let rating = 0;
            const reviews = item.meta.ratings;
            const keys = Object.keys(reviews);
            for (let i = 0; i < keys.length; i += 1) {
              rating += (parseInt(keys[i], 10) * parseInt(reviews[keys[i]], 10));
            }
            const ratingValues = Object.values(reviews).map((val) => parseInt(val, 10));
            const sumOfRatings = ratingValues.reduce((acc, curVal) => acc + curVal, 0);
            rating /= sumOfRatings;
            rating = Math.floor(rating / (1 / 4)) * (1 / 4);
            return rating;
          }));
        });
    };

    fetchAllRelatedItemsInfo();
  }, [relatedItems]);

  return (
    <div className="comparison_modal_outer_div">
      Comparing:
      {/* {' '}
      {JSON.stringify(comparisonRatings)} */}
      <div className="comparison_modal">
        <ComparisonModalRow productInfo={comparisonNames} />
        <ComparisonModalRow productInfo={comparisonCats} />
        <ComparisonModalRow productInfo={comparisonPrices} />
        <ComparisonModalRow productInfo={comparisonRatings} />
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
