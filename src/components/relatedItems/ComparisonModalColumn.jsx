import React from 'react';
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
  result = Math.floor(result / (1 / 4)) * (1 / 4);

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
        {productInfo.style.sale_price
          ? productInfo.style.sale_price
          : productInfo.style.original_price}
      </p>
      <p className="cmc_reviews">
        Reviews
        {' '}
        {result}
      </p>
    </div>
  );
}

ComparisonModalColumn.propTypes = {
  productId: PropTypes.number.isRequired,
  productInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    style: PropTypes.shape({
      original_price: PropTypes.string.isRequired,
      sale_price: PropTypes.string,
    }),
    meta: PropTypes.shape({
      ratings: PropTypes.shape({
        1: PropTypes.string.isRequired,
        2: PropTypes.string.isRequired,
        3: PropTypes.string.isRequired,
        4: PropTypes.string.isRequired,
        5: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ComparisonModalColumn;
