import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx'
import ReviewView from './ReviewView.jsx'
import {useState, useEffect} from 'react';


const RatingsAndReviews= (props) => {
    // console.log(props.product_id)


  const [reviewMeta, setReviewMeta] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    console.log(`api key = ${process.env.GIT_API_KEY}`);
    props.bridge.reviewsMeta(40355)
    .then(results => {
      setReviewMeta(results.data);
    });
  }, []);

  useEffect(() => {
    console.log(`api key = ${process.env.GIT_API_KEY}`);
    props.bridge.listReviews(40355, 1, 10)
    .then(results => {
      setReviews(results.data);
    });
  }, []);



  useEffect(() => console.log((reviewMeta)), [reviewMeta]);
  useEffect(() => console.log((reviews)), [reviews]);


  return (
    <div>
      <h3>Ratings & Reviews </h3>
      {/* <RatingBreakdown/>
      <ReviewView/> */}
    </div>


  )

}

export default RatingsAndReviews;