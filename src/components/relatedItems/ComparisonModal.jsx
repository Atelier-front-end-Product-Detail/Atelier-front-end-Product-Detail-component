import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ComparisonModalRow from './ComparisonModalRow';

function ComparisonModal({ bridge, relatedItem, productId }) {
  const [comparisonInfo, setComparisonInfo] = useState([]);

  useEffect(() => {
    if (!relatedItem || !productId) { return; }
    const fetchAllRelatedItemsInfo = async () => {
      const allItems = [productId, relatedItem];
      const fetchPromises = allItems.map(async (item) => {
        const infoResults = await bridge.productInformation(item);

        const combinedResults = {
          ...infoResults.data,
        };

        return combinedResults;
      });

      Promise.all(fetchPromises)
        .then((results) => {
          function constructFeaturesInRows(obj1, obj2) {
            const allFeatures = Array.from(new Set(
              [...obj1.features.map((feature) => feature.feature),
                ...obj2.features.map((feature) => feature.feature)],
            ));
            const obj1Features = new Map(
              obj1.features.map((feature) => [feature.feature, feature.value]),
            );
            const obj2Features = new Map(
              obj2.features.map((feature) => [feature.feature, feature.value]),
            );
            const newComparisonInfo = [[obj1.name, 'to', obj2.name]];
            allFeatures.forEach((feature) => {
              const value1 = obj1Features.get(feature) || '';
              const value2 = obj2Features.get(feature) || '';
              newComparisonInfo.push([value1, feature, value2]);
            });

            setComparisonInfo(newComparisonInfo);
          }
          const [obj1, obj2] = results;
          constructFeaturesInRows(obj1, obj2);
        });
    };

    fetchAllRelatedItemsInfo();
  }, [relatedItem]);

  return comparisonInfo.length ? (
    <div className="comparison_modal_outer_div">
      Comparing:
      {/* {' '}
      {JSON.stringify(comparisonRatings)} */}
      <div className="comparison_modal">
        {comparisonInfo.map((row) => (
          <ComparisonModalRow productInfo={row} key={row.join(',')} />
        ))}
      </div>
    </div>
  )
    : null;
}

ComparisonModal.propTypes = {
  productId: PropTypes.number.isRequired,
  bridge: PropTypes.shape({
    productInformation: PropTypes.func.isRequired,
    productStyles: PropTypes.func.isRequired,
    reviewsMeta: PropTypes.func.isRequired,
  }).isRequired,
  relatedItem: PropTypes.number.isRequired,
};

export default ComparisonModal;
