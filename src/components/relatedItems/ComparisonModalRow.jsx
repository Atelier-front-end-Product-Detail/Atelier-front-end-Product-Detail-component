import React from 'react';
import PropTypes from 'prop-types';

function ComparisonModalRow({ productInfo }) {
  return (
    <div className="comparison_modal_row">
      {productInfo.map((item, index) => <div className="comparison_modal_column" key={`cmr ${index * 2}${item}`}>{item}</div>)}
    </div>
  );
}

ComparisonModalRow.propTypes = {
  productInfo: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ).isRequired,
};

export default ComparisonModalRow;
