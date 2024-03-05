import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RatingsBreakdown from './RatingsBreakdown';
import ReviewsView from './ReviewsView';

function RatingsAndReviews({ bridge, productId }) {
  // console.log(props.product_id)

  const [reviewsMeta, setReviewsMeta] = useState({});
  // const [reviews, setReviews] = useState({});
  const [fiveStarFilter, setFiveStarFilter] = useState(false);
  const [fourStarFilter, setFourStarFilter] = useState(false);
  const [threeStarFilter, setThreeStarFilter] = useState(false);
  const [twoStarFilter, setTwoStarFilter] = useState(false);
  const [oneStarFilter, setOneStarFilter] = useState(false);

  useEffect(() => {
    // console.log(`api key = ${process.env.GIT_API_KEY}`);
    bridge.reviewsMeta(productId)
      .then((results) => {
        setReviewsMeta(results.data);
      });
  }, []);

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
    <div>
      <h3>Ratings & Reviews </h3>
      <div style={{ display: 'flex' }}>
        <RatingsBreakdown reviewsMeta={reviewsMeta} />
        <ReviewsView bridge={bridge} />
      </div>
    </div>

  );
}

RatingsAndReviews.propTypes = {
  productId: PropTypes.number.isRequired,
  bridge: PropTypes.shape({
    reviewsMeta: PropTypes.func.isRequired,
  }).isRequired,
  // setProductId: PropTypes.func.isRequired,
};
export default RatingsAndReviews;
