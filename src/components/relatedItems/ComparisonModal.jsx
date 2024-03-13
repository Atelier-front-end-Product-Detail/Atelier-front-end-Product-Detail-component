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

    const mainProduct = productInfo.info;
    const comparisonProduct = relatedItem.info;
    constructFeaturesInRows(mainProduct, comparisonProduct);
  }, [relatedItem]);

  return comparisonInfo.length ? (
    <div className="comparison_modal_outer_div">
      <p>
        Comparing:
      </p>
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
  relatedItem: PropTypes.shape({
    info: PropTypes.shape({
      features: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
  productInfo: PropTypes.shape({
    info: PropTypes.shape({
      features: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

ComparisonModal.defaultProps = {
  relatedItem: {
    info: {
      features: [],
    },
  },
  productInfo: {
    info: {
      features: [{}],
    },
  },
};

export default ComparisonModal;
