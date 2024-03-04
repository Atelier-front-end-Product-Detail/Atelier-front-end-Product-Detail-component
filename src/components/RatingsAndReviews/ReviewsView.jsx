import React from 'react';
import { useState, useEffect } from 'react';

const ReviewsView = (props) => {

  const [reviews, setReviews] = useState([]);
  const [nextReviews, setNextReviews] = useState([]);
  const [selectedValue, setSelectedValue] = useState('Relevant');
  const [page, setPage] = useState(2)

  console.log("reviews: ", reviews)
  console.log("SORT selected: ", selectedValue)

  useEffect(() => {
    // console.log(`api key = ${process.env.GIT_API_KEY}`);
    props.bridge.listReviews(40345, 1, 2)
    .then(results => {
      setReviews(results.data.results);
    });
  }, []);

  const onAddReviewsClick = () => {
    props.bridge.listReviews(40345, page, 2)
    .then(results => {
      setReviews([...reviews, ...results.data.results]);
      setPage(page+1);
    });

  }






  const handleSelectionChange = (event) => {
    setSelectedValue(event.target.value);
  };



  return (
    <div>
      ReviewsView
      <SortReviews handleSelectionChange={handleSelectionChange} selectedValue={selectedValue}/>
      <ReviewsList reviews={reviews}/>
      <AddReview onAddReviewsClick={onAddReviewsClick}/>
    </div>
  )
}

const SortReviews = (props) => {


  return (
    <div>
      <label htmlFor="dropdown">Sort by:</label>
      <select name="dropdown" value={props.selectedValue} onChange={props.handleSelectionChange}>
        <option value="Relevant">Relevant</option>
        <option value="Newest">Newest</option>
        <option value="Helpful">Helpful</option>
      </select>
    </div>
  )
}

const ReviewsList = (props) => {

  console.log("props.reviews: ", props.reviews)

  return (
    <div>
      {props.reviews.length > 0 && props.reviews.map((review) => {
        return (
          <ReviewTile review={review}/>
        )})
      }

    </div>
  )
}

const ReviewTile = (props) => {
  return (
    <div>
      {props.review.review_id}
      STAR:{props.review.rating}
      USERNAME:{props.review.reviewer_name}
      DATE:{props.review.date}
    </div>
  )
}

const AddReview = (props) => {
  return (
    <div>
      <button onClick={props.onAddReviewsClick}> AddReview </button>
    </div>
  )
}


export default ReviewsView


