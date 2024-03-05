import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ComparisonModalColumn({ productInfo, productId }) {
  let result = 0;
  const reviews = productInfo.meta.ratings;
  const keys = Object.keys(reviews);
  for (let i = 0; i < keys.length; i += 1) {
    result += (parseInt(keys[i], 10) * parseInt(reviews[keys[i]], 10));
  }
  const ratingValues = Object.values(reviews).map((val) => parseInt(val, 10));
  const sumOfRatings = ratingValues.reduce((acc, curVal) => acc + curVal, 10);
  result /= sumOfRatings;

  return (
    <div className={productInfo.id === productId
      ? 'comparison_modal_main_column'
      : 'comparison_modal_column'}
    >
      <p className="cmc_name">{productInfo.name}</p>
      <p className="cmc_category">{productInfo.category}</p>
      <p className="cmc_price">
        price:
        {' '}
        {productInfo.style.sale_price ?
          productInfo.style.sale_price
          : productInfo.style.original_price}
      </p>
      <p className="cmc_reviews">
        Reviews
        {' '}
        {Math.floor(result / (1 / 4)) * (1 / 4)}
      </p>
    </div>
  );
}

export default ComparisonModalColumn;
