import React from 'react';
import RatingsBreakdown from './RatingsBreakdown.jsx'
import ReviewsView from './ReviewsView.jsx'
import {useState, useEffect} from 'react';


const RatingsAndReviews= (props) => {
    // console.log(props.product_id)


  const [reviewsMeta, setReviewsMeta] = useState({});
  // const [reviews, setReviews] = useState({});

  useEffect(() => {
    // console.log(`api key = ${process.env.GIT_API_KEY}`);
    props.bridge.reviewsMeta(props.product_id)
    .then(results => {
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



  // console.log("reviewsMeta: ",reviewsMeta)

  // useEffect(() => console.log("reviewsMeta: ",reviewsMeta), [reviewsMeta]);
  // useEffect(() => console.log((reviews)), [reviews]);


  return (
    <div>
      <h3>Ratings & Reviews </h3>
      <RatingsBreakdown reviewsMeta={reviewsMeta}/>
      <ReviewsView bridge={props.bridge}/>
    </div>


  )

}

export default RatingsAndReviews;