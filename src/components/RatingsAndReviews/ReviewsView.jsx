import React, { useState, useEffect } from 'react';
import './ReviewsView.css';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import AddReviewModal from './AddReviewModal';

function ReviewsView({
  bridge, productId, starFilters, reviewsMeta, removeAllFilters, productName,
}) {
  const [reviews, setReviews] = useState([]);
  // const [nextReviews, setNextReviews] = useState([]);
  const [selectedValue, setSelectedValue] = useState('relevant');
  const [displayNumber, setDisplayNumber] = useState(2);
  const [currentTotalReviews, setCurrentTotalReviews] = useState();
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

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
  }, [reviewsMeta.ratings, productId]);

  const fetchAllData = () => {
    bridge.listReviews(productId, 1, currentTotalReviews, selectedValue)
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
    setDisplayNumber(2);
  }, [selectedValue, currentTotalReviews, productId]);

  // console.log('selectedSORT: ', selectedValue);
  // console.log('reviews: ', reviews);
  // console.log('filteredReviews: ', filteredReviews);

  const onMoreReviewsClick = () => {
    // console.log("INSIDE totalReviews: ", currentTotalReviews)
    // bridge.listReviews(40345, 1, currentTotalReviews, selectedValue)
    //   .then((results) => {
    //     console.log("INSIDE results", results.data.results)
    //     setReviews(results.data.results);
    setDisplayNumber(displayNumber + 2);
    // });
  };

  const handleSelectionChange = (event) => {
    setSelectedValue(event.target.value);
    setDisplayNumber(2);
    removeAllFilters();
  };

  const handleShowModal = (boolean) => {
    setShowAddReviewModal(boolean);
  };

  const handleShowImageModal = (boolean) => {
    setShowImageModal(boolean);
  };
  // console.log(showImageModal);
  // console.log(modalImage);

  const handleAddReview = (data) => {
    bridge.addReview(data)
      .then((result) => {
        console.log(result);
        fetchAllData();
      })
      .catch((err) => {
        console.log('Add review Error: ', err);
      });
  };

  const anyFilterApplied = Object.values(starFilters).some((filter) => filter);

  const filteredReviews = anyFilterApplied
    ? reviews.filter((review) => starFilters[review.rating]).slice(0, displayNumber)
    : reviews.slice(0, displayNumber);

  return (
    <div className="reviewsView">

      <SortReviews handleSelectionChange={handleSelectionChange} selectedValue={selectedValue} />
      <ReviewsList
        filteredReviews={filteredReviews}
        bridge={bridge}
        fetchAllData={fetchAllData}
        handleShowImageModal={handleShowImageModal}
        setModalImage={setModalImage}
        modalImage={modalImage}
        showImageModal={showImageModal}
      />
      <div className="reviews-view-buttons-container">
        <button className="reviews-view-buttons" type="button" onClick={onMoreReviewsClick}> More Reviews </button>
        <button className="reviews-view-buttons" type="button" onClick={() => { handleShowModal(true); }}>Add a Review +</button>
      </div>
      <AddReviewModal
        handleAddReview={handleAddReview}
        handleShowModal={handleShowModal}
        showAddReviewModal={showAddReviewModal}
        productId={productId}
        reviewsMeta={reviewsMeta}
        productName={productName}
      />
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

function ReviewsList({
  filteredReviews, bridge, fetchAllData, handleShowImageModal, setModalImage, modalImage, showImageModal,
}) {
  // console.log('reviews: ', reviews);

  return (
    <div className="reviewsList">
      {filteredReviews.length > 0 && filteredReviews.map((review) => (
        <ReviewTile
          key={review.review_id}
          review={review}
          bridge={bridge}
          fetchAllData={fetchAllData}
          handleShowImageModal={handleShowImageModal}
          setModalImage={setModalImage}
          modalImage={modalImage}
          showImageModal={showImageModal}
        />
      ))}

      <ImageModal
        showImageModal={showImageModal}
        modalImage={modalImage}
        handleShowImageModal={handleShowImageModal}
      />

    </div>
  );
}

function ReviewTile({
  review, bridge, fetchAllData, handleShowImageModal, setModalImage, modalImage, showImageModal,
}) {
  const reviewDate = new Date(review.date);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const readableDate = reviewDate.toLocaleString('en-US', options);

  const onHelpfulClick = () => {
    if (localStorage.getItem(review.review_id)) {
      console.log('ALREADY MARKED HELPFUL');
    } else {
      bridge.markReviewHelpful(review.review_id)
        .then(() => {
          fetchAllData();
          localStorage.setItem(review.review_id, 'true');
        })
        .catch((err) => {
          console.log('Mark Helpful Error: ', err);
        });
    }
  };

  const onReportClick = () => {
    bridge.reportReview(review.review_id)
      .then(() => {
        fetchAllData();
        localStorage.setItem(review.review_id, 'true');
      })
      .catch((err) => {
        console.log('Report Review Error: ', err);
      });
  };

  const [showFullReview, setShowFullReview] = useState(false);

  const shortBody = review.body.slice(0, 250);
  // const remainingBody = review.body.slice(250);

  const toggleShowFullReview = () => {
    setShowFullReview(!showFullReview);
  };

  const handleKeyPress = () => {
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

      <div style={{ wordWrap: 'break-word' }}>
        {showFullReview ? review.body : shortBody}
        {review.body.length > 250 && (
        <span
          onClick={toggleShowFullReview}
          style={{ color: 'blue', cursor: 'pointer' }}
          onKeyPress={handleKeyPress}
          role="button"
          tabIndex={0}
        >
          {showFullReview ? ' Show less' : ' Show more'}
        </span>
        )}
        <br />
        <div className="photos-container">
          {review.photos.length > 0
            && review.photos.map((eachPhoto) => (
              <div
                onKeyPress={handleKeyPress}
                className="review-image"
                key={eachPhoto.id}
                tabIndex={0}
                role="button"
                onClick={() => {
                  handleShowImageModal(true);
                  setModalImage(`${eachPhoto.url}${eachPhoto.id}`);
                }}
              >
                <img
                  className="review-image"
                  key={eachPhoto.id}
                  src={`${eachPhoto.url}${eachPhoto.id}`}
                  alt={`Review ${eachPhoto.id}`}
                  onError={(e) => {
                    e.target.src = process.env.IMAGE_NOT_FOUND;
                  }}
                />
              </div>
            ))}
        </div>
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
        <span
          className="helpful"
          onClick={onHelpfulClick}
          onKeyPress={handleKeyPress}
          tabIndex={0}
          role="button"
        >
          Yes (
          {review.helpfulness}
          )
          {' '}
        </span>
        <span
          className="report"
          onClick={onReportClick}
          onKeyPress={handleKeyPress}
          tabIndex={0}
          role="button"
        >
          Report
        </span>
      </span>

    </div>
  );
}

function ImageModal({ showImageModal, modalImage, handleShowImageModal }) {
  const handleClassName = showImageModal ? 'ImageModal-display' : 'ImageModal-display-none';

  return (
    <div className={handleClassName}>
      <img
        className="review-image-modal"
        src={modalImage}
        onError={(e) => {
          e.target.src = process.env.IMAGE_NOT_FOUND;
        }}
        alt="reviewer upload"
      />
      <button
        onClick={() => {
          handleShowImageModal(false);
        }}
        type="button"
      >
        X
      </button>

    </div>
  );
}

// function MoreReviews({ onMoreReviewsClick }) {
//   return (
//     <div>
//       <button type="button" onClick={onMoreReviewsClick}> More Reviews </button>
//     </div>
//   );
// }

// function AddReview() {
//   return (
//     <div>
//       <button type="button"> AddReview </button>
//     </div>
//   );
// }

ReviewsView.propTypes = {
  bridge: PropTypes.shape({
    listReviews: PropTypes.func.isRequired,
  }).isRequired,
  productId: PropTypes.number.isRequired,
  starFilters: PropTypes.shape({
    1: PropTypes.bool,
    2: PropTypes.bool,
    3: PropTypes.bool,
    4: PropTypes.bool,
    5: PropTypes.bool,
  }).isRequired,
  reviewsMeta: PropTypes.shape({
    ratings: PropTypes.shape({
      rating: PropTypes.number,
    }),
    characteristics: PropTypes.shape({
      description: PropTypes.string,
    }),
    recommended: PropTypes.shape({
      boolean: PropTypes.bool,
      true: PropTypes.string.isRequired,
    }),
  }).isRequired,
  removeAllFilters: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
};

SortReviews.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
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
  bridge: PropTypes.shape({
  }).isRequired,
  fetchAllData: PropTypes.func.isRequired,
  handleShowImageModal: PropTypes.func.isRequired,
  setModalImage: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired,
  showImageModal: PropTypes.bool.isRequired,
};

ReviewTile.propTypes = {
  review: PropTypes.shape({
    review_id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    reviewer_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  fetchAllData: PropTypes.func.isRequired,
  handleShowImageModal: PropTypes.func.isRequired,
  setModalImage: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired,
  showImageModal: PropTypes.bool.isRequired,
};

ImageModal.propTypes = {
  showImageModal: PropTypes.bool.isRequired,
  modalImage: PropTypes.string.isRequired,
  handleShowImageModal: PropTypes.func.isRequired,
};

export { ReviewTile };
export default ReviewsView;
