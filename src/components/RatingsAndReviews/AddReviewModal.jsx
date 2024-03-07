import React, { useState, useEffect } from 'react';

function AddReviewModal({ handleShowModal, showAddReviewModal, handleAddReview }) {
  const handleClassName = showAddReviewModal ? 'AddReviewModal-display' : 'AddReviewModal-display-none';

  const [reviewData, setReviewData] = useState({

  });

  return (
    <div className={handleClassName}>

      <button
        onClick={() => {
          handleAddReview(reviewData);
          handleShowModal(false);
        }}
        type="button"
      >
        Submit Review
      </button>

    </div>
  );
}

export default AddReviewModal;
