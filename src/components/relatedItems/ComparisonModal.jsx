import React, { useState } from 'react';

function ComparisonModal({ relatedItemsInfo }) {
  return (
    <div className="comparison_modal">
      Related Items Info
    </div>
  );
}

const relatedItemsInfoPropType = {
  id: PropTypes.number,
  campus: PropTypes.string,
  name: PropTypes.string,
  slogan: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  default_price: PropTypes.string,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      feature: PropTypes.string.isRequired,
      value: PropTypes.string,
    }),
  ).isRequired,
};

export default ComparisonModal;
