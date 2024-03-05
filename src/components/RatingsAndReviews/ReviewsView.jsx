import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ReviewsView({ bridge }) {
  const [reviews, setReviews] = useState([]);
  // const [nextReviews, setNextReviews] = useState([]);
  const [selectedValue, setSelectedValue] = useState('newest');
  const [page, setPage] = useState(2);

  // console.log('SORT selected: ', selectedValue);

  useEffect(() => {
    // console.log(`api key = ${process.env.GIT_API_KEY}`);
    bridge.listReviews(40345, 1, 2, selectedValue)
      .then((results) => {
        setReviews(results.data.results);
      })
      .catch((err) => {
        console.log('listReviews Error: ', err);
      });
  }, [selectedValue]);

  // console.log('selectedSORT: ', selectedValue);
  // console.log('reviews: ', reviews);

  const onAddReviewsClick = () => {
    bridge.listReviews(40345, page, 2)
      .then((results) => {
        setReviews([...reviews, ...results.data.results]);
        setPage(page + 1);
      });
  };

  const handleSelectionChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      ReviewsView
      <SortReviews handleSelectionChange={handleSelectionChange} selectedValue={selectedValue} />
      <ReviewsList reviews={reviews} />
      <AddReview onAddReviewsClick={onAddReviewsClick} />
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

function ReviewsList({ reviews }) {
  // console.log('reviews: ', reviews);

  return (
    <div>
      {reviews.length > 0 && reviews.map((review) => (
        <ReviewTile key={review.review_id} review={review} />
      ))}

    </div>
  );
}

function ReviewTile({ review }) {
  return (
    <div style={{ border: '2px solid black' }}>
      {review.review_id}

      <div>
        STAR:
        {review.rating}
        USERNAME:
        {review.reviewer_name}
        DATE:
        {review.date}
      </div>

      <h4>{review.summary}</h4>

      {/* <div>
        {review.body}
        <br />
        {review.photos.length > 0
            && review.photos.map((eachPhoto) => (
              <img
                key={eachPhoto.id}
                src={`${eachPhoto.url}${eachPhoto.id}`}
                alt={`Review ${eachPhoto.id}`}
              />
            ))}
      </div> */}

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

function AddReview({ onAddReviewsClick }) {
  return (
    <div>
      <button type="button" onClick={onAddReviewsClick}> AddReview </button>
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
  onAddReviewsClick: PropTypes.func.isRequired,
  // bridge: PropTypes.shape({
  //   reviewsMeta: PropTypes.func.isRequired,
  //   listReviews: PropTypes.func.isRequired,
  // }).isRequired,
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
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
