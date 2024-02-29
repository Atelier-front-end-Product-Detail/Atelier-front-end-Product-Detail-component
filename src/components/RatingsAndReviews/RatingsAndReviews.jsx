import React from 'react';
import RatingsBreakdown from './RatingsBreakdown.jsx'
import ReviewsView from './ReviewsView.jsx'
import {useState, useEffect} from 'react';


const RatingsAndReviews= (props) => {
    // console.log(props.product_id)


  const [reviewsMeta, setReviewsMeta] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    // console.log(`api key = ${process.env.GIT_API_KEY}`);
    props.bridge.reviewsMeta(40345)
    .then(results => {
      setReviewsMeta(results.data);
    });
  }, []);

  useEffect(() => {
    // console.log(`api key = ${process.env.GIT_API_KEY}`);
    props.bridge.listReviews(40345, 1, 10)
    .then(results => {
      setReviews(results.data);
    });
  }, []);



  // useEffect(() => console.log((reviewsMeta)), [reviewsMeta]);
  // useEffect(() => console.log((reviews)), [reviews]);


  return (
    <div>
      <h3>Ratings & Reviews </h3>
      {/* <RatingsBreakdown/>
      <ReviewsView/> */}
    </div>


  )

}

export default RatingsAndReviews;