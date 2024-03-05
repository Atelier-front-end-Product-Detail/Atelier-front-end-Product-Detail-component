import React, { useState, useEffect } from 'react';
import './ReviewsView.css';
import PropTypes from 'prop-types';


function ReviewsView({ bridge, starFilters, reviewsMeta }) {
  const [reviews, setReviews] = useState([]);
  // const [nextReviews, setNextReviews] = useState([]);
  const [selectedValue, setSelectedValue] = useState('relevant');
  const [displayNumber, setDisplayNumber] = useState(2);
  const [currentTotalReviews, setCurrentTotalReviews] = useState();


  // let totalReviews
  // if (reviewsMeta.ratings) {
  //   // calculate total reviews
  //   totalReviews = Object.values(reviewsMeta.ratings)
  //     .reduce((acc, eachRating) => (acc + Number(eachRating)), 0);
  // }

  useEffect(() => {
    if (reviewsMeta.ratings) {
      // calculate total reviews
      setCurrentTotalReviews(
        Object.values(reviewsMeta.ratings).reduce(
          (acc, eachRating) => acc + Number(eachRating),
          0
        )
      );
    }
  }, [reviewsMeta.ratings]);


  useEffect(() => {
    // console.log(`api key = ${process.env.GIT_API_KEY}`);
    bridge.listReviews(40345, 1, currentTotalReviews, selectedValue)
      .then((results) => {
        setReviews(results.data.results);
      })
      .catch((err) => {
        console.log('listReviews Error: ', err);
      });
  }, [selectedValue, currentTotalReviews]);

  // console.log('selectedSORT: ', selectedValue);
  // console.log('reviews: ', reviews);
  // console.log('filteredReviews: ', filteredReviews);

  const onMoreReviewsClick = () => {
    // console.log("INSIDE totalReviews: ", currentTotalReviews)
    // bridge.listReviews(40345, 1, currentTotalReviews, selectedValue)
    //   .then((results) => {
    //     console.log("INSIDE results", results.data.results)
    //     setReviews(results.data.results);
        setDisplayNumber(currentTotalReviews)
      // });
  };



  const handleSelectionChange = (event) => {
    setSelectedValue(event.target.value);
    setDisplayNumber(2)
  };


  const anyFilterApplied = Object.values(starFilters).some((filter) => filter);

  let filteredReviews = anyFilterApplied ? reviews.filter((review) => starFilters[review.rating]).slice(0, displayNumber) : reviews.slice(0,displayNumber);

  return (
    <div className="reviewsView">
      ReviewsView
      <SortReviews handleSelectionChange={handleSelectionChange} selectedValue={selectedValue} />
      <ReviewsList filteredReviews={filteredReviews} />
      <MoreReviews onMoreReviewsClick={onMoreReviewsClick}/>
      <AddReview />
    </div>
  );
}

function SortReviews({ selectedValue, handleSelectionChange }) {
  return (
    <div>
      <label htmlFor="dropdown">Sort by:</label>
      <select id="dropdown" name="dropdown" value={selectedValue} onChange={handleSelectionChange}>
        <option value="relevant">Relevant</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </select>
    </div>
  );
}

function ReviewsList({ filteredReviews }) {
  // console.log('reviews: ', reviews);

  return (
    <div className="reviewsList">
      {filteredReviews.length > 0 && filteredReviews.map((review) => (
        <ReviewTile key={review.review_id} review={review} />
      ))}

    </div>
  );
}

function ReviewTile({ review }) {

  const reviewDate = new Date(review.date);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };

  const readableDate = reviewDate.toLocaleString('en-US', options);

  return (
    <div className="reviewTile">
      {/* {review.review_id} */}

      <div className="userNameBar">

        <div>STAR: {review.rating}</div>

        <div>
          username
          {review.reviewer_name + ', '}
          {readableDate}
        </div>


      </div>

      <h4>{review.summary}</h4>

      <div>
        {review.body}
        <br />
        {/* {review.photos.length > 0
            && review.photos.map((eachPhoto) => (
              <img
                key={eachPhoto.id}
                src={`${eachPhoto.url}${eachPhoto.id}`}
                alt={`Review ${eachPhoto.id}`}
              />
            ))} */}
      </div>

      <div>
        {review.recommend && 'I recommend this product'}
      </div>

      <div>
        {review.response && review.response}
      </div>

      <div>
        <p>Helpful?</p>
        <a>
          Yes (
          {review.helpfulness}
          )
          {' '}
        </a>
        <button>Report</button>
      </div>

    </div>
  );
}

function MoreReviews({ onMoreReviewsClick }) {
  return (
    <div>
      <button type="button" onClick={onMoreReviewsClick}> More Reviews </button>
    </div>
  );
}

function AddReview( ) {
  return (
    <div>
      <button type="button"> AddReview </button>
    </div>
  );
}

ReviewsView.propTypes = {
  // productId: PropTypes.number.isRequired,
  bridge: PropTypes.shape({
    // reviewsMeta: PropTypes.func.isRequired,
    listReviews: PropTypes.func.isRequired,
  }).isRequired,
};

SortReviews.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
  // bridge: PropTypes.shape({
  //   reviewsMeta: PropTypes.func.isRequired,
  //   listReviews: PropTypes.func.isRequired,
  // }).isRequired,
};

AddReview.propTypes = {
  // onAddReviewsClick: PropTypes.func.isRequired,
  // bridge: PropTypes.shape({
  //   reviewsMeta: PropTypes.func.isRequired,
  //   listReviews: PropTypes.func.isRequired,
  // }).isRequired,
};

ReviewsList.propTypes = {
  filteredReviews: PropTypes.arrayOf(
    PropTypes.shape({
      review_id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      reviewer_name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

ReviewTile.propTypes = {
  review: PropTypes.shape({
    review_id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    reviewer_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewsView;
