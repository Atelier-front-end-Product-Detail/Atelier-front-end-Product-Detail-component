import React, { useState, useEffect } from 'react';
import './RatingsAndReviews.css';

import PropTypes from 'prop-types';
import RatingsBreakdown from './RatingsBreakdown';
import ReviewsView from './ReviewsView';

function RatingsAndReviews({ bridge, productId, productName }) {
  const [reviewsMeta, setReviewsMeta] = useState({});
  const [starFilters, setStarFilters] = useState({
    5: false,
    4: false,
    3: false,
    2: false,
    1: false,
  });
  const removeAllFilters = () => {
    setStarFilters({
      5: false,
      4: false,
      3: false,
      2: false,
      1: false,
    });
  };

  const updateStarFilter = (filter) => {
    setStarFilters((prevStarFilters) => (
      { ...prevStarFilters, [filter]: !prevStarFilters[filter] }
    ));
  };

  useEffect(() => {
    bridge.reviewsMeta(productId)
      .then((results) => {
        setReviewsMeta(results.data);
      });
  }, [productId]);

  return (
    <div className="rrContainer" id="ratings-reviews">
      <div className="rrHeader">Ratings & Reviews</div>
      <div style={{ display: 'flex' }}>
        <RatingsBreakdown
          reviewsMeta={reviewsMeta}
          updateStarFilter={updateStarFilter}
          starFilters={starFilters}
          removeAllFilters={removeAllFilters}
        />
        <ReviewsView
          bridge={bridge}
          productId={productId}
          starFilters={starFilters}
          reviewsMeta={reviewsMeta}
          removeAllFilters={removeAllFilters}
          productName={productName}
        />
      </div>
    </div>

  );
}

RatingsAndReviews.propTypes = {
  productName: PropTypes.string.isRequired,
  productId: PropTypes.number.isRequired,
  bridge: PropTypes.shape({
    reviewsMeta: PropTypes.func.isRequired,
  }).isRequired,
};

export default RatingsAndReviews;
