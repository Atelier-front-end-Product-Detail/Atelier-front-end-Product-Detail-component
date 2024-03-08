import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ComparisonModalRow from './ComparisonModalRow';

function ComparisonModal({ relatedItem, productInfo }) {
  const [comparisonInfo, setComparisonInfo] = useState([]);

  useEffect(() => {
    if (!relatedItem
        || !productInfo
        || !relatedItem.info
        || !productInfo.info
        || !relatedItem.info.features
        || !productInfo.info.features) { return; }

    function constructFeaturesInRows(obj1, obj2) {
      console.log(`obj1: ${JSON.stringify(obj1)}`);
      console.log(`obj2: ${JSON.stringify(obj2)}`);
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

    const obj1 = productInfo.info;
    const obj2 = relatedItem;
    constructFeaturesInRows(obj1, obj2);
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
  relatedItem: PropTypes.number.isRequired,
  productInfo: PropTypes.shape({
    info: PropTypes.shape({
      features: PropTypes.arrayOf().isRequired,
    }).isRequired,
  }).isRequired,
};

export default ComparisonModal;
