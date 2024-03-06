import React, { useState, useEffect } from 'react';
import './ReviewsView.css';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

function ReviewsView({
  bridge, starFilters, reviewsMeta, removeAllFilters,
}) {
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
          0,
        ),
      );
    }
  }, [reviewsMeta.ratings]);

  const fetchAllData = () => {
    bridge.listReviews(40345, 1, currentTotalReviews, selectedValue)
      .then((results) => {
        setReviews(results.data.results);
      })
      .catch((err) => {
        console.log('listReviews Error: ', err);
      });
  };

  useEffect(() => {
    // console.log(`api key = ${process.env.GIT_API_KEY}`);
    fetchAllData();
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
    setDisplayNumber(currentTotalReviews);
    // });
  };

  const handleSelectionChange = (event) => {
    setSelectedValue(event.target.value);
    setDisplayNumber(2);
    removeAllFilters();
  };

  const anyFilterApplied = Object.values(starFilters).some((filter) => filter);

  const filteredReviews = anyFilterApplied ? reviews.filter((review) => starFilters[review.rating]).slice(0, displayNumber) : reviews.slice(0, displayNumber);

  return (
    <div className="reviewsView">

      <SortReviews handleSelectionChange={handleSelectionChange} selectedValue={selectedValue} />
      <ReviewsList
        filteredReviews={filteredReviews}
        bridge={bridge}
        fetchAllData={fetchAllData}
      />
      <MoreReviews onMoreReviewsClick={onMoreReviewsClick} />
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

function ReviewsList({ filteredReviews, bridge, fetchAllData }) {
  // console.log('reviews: ', reviews);

  return (
    <div className="reviewsList">
      {filteredReviews.length > 0 && filteredReviews.map((review) => (
        <ReviewTile
          key={review.review_id}
          review={review}
          bridge={bridge}
          fetchAllData={fetchAllData}
        />
      ))}

    </div>
  );
}

function ReviewTile({ review, bridge, fetchAllData }) {
  const reviewDate = new Date(review.date);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const readableDate = reviewDate.toLocaleString('en-US', options);

  const onHelpfulClick = () => {
    if (localStorage.getItem(review.review_id)) {
      console.log('ALREADY MARKED HELPFUL');
    } else {
      bridge.markReviewHelpful(review.review_id)
        .catch((err) => {
          console.log('Mark Helpful Error: ', err);
        })
        .then(() => {
          fetchAllData();
          localStorage.setItem(review.review_id, 'true');
        });
    }
  };

  const onReportClick = () => {
    bridge.reportReview(review.review_id)
      .catch((err) => {
        console.log('Report Review Error: ', err);
      })
      .then(() => {
        fetchAllData();
        localStorage.setItem(review.review_id, 'true');
      });
  };

  return (
    <div className="reviewTile">
      {/* {review.review_id} */}

      <div className="userNameBar">

        <div>
          <StarRating ratingToDisplay={review.rating} />
        </div>

        <div>
          {review.reviewer_name ? (`${review.reviewer_name}, `)
            : ('Anonymous, ')}

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
      <br />
      <div>
        {review.recommend && ('\u2713' + ' I recommend this product')}
      </div>
      <br />

      <div>
        {review.response && review.response}
      </div>

      <span>
        Helpful?
        <a className="helpful" onClick={onHelpfulClick}>
          Yes (
          {review.helpfulness}
          )
          {' '}
        </a>
        <a className="report" onClick={onReportClick}>Report</a>
      </span>

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

function AddReview() {
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
