import React, { useState, useEffect } from 'react';
import './RatingsAndReviews.css';

import PropTypes from 'prop-types';
import RatingsBreakdown from './RatingsBreakdown';
import ReviewsView from './ReviewsView';

function RatingsAndReviews({ bridge, productId, productName }) {
  // console.log(props.product_id)

  const [reviewsMeta, setReviewsMeta] = useState({});
  // const [reviews, setReviews] = useState({});
  const [starFilters, setStarFilters] = useState({
    5: false,
    4: false,
    3: false,
    2: false,
    1: false,
  });

  // console.log("FILTERS: ", starFilters);

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
    // console.log(`api key = ${process.env.GIT_API_KEY}`);
    bridge.reviewsMeta(productId)
      .then((results) => {
        setReviewsMeta(results.data);
      });
  }, [productId]);

  // useEffect(() => {
  //   // console.log(`api key = ${process.env.GIT_API_KEY}`);
  //   props.bridge.listReviews(40345, 1, 10)
  //   .then(results => {
  //     setReviews(results.data);
  //   });
  // }, []);

  // console.log('reviewsMeta: ', reviewsMeta);

  // useEffect(() => console.log("reviewsMeta: ",reviewsMeta), [reviewsMeta]);
  // useEffect(() => console.log((reviews)), [reviews]);

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
  // starFilters: PropTypes.shape({
  //   1: PropTypes.bool,
  //   2: PropTypes.bool,
  //   3: PropTypes.bool,
  //   4: PropTypes.bool,
  //   5: PropTypes.bool,
  // }).isRequired,
};

export default RatingsAndReviews;
