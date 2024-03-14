import React, { useState } from 'react';
import './StarRating.css';
import PropTypes from 'prop-types';

function StarRating({
  ratingToDisplay, interactive, onRatingChange,
}) {
  const [rating, setRating] = useState(ratingToDisplay);

  const handleStarClick = (starIndex) => {
    if (interactive) {
      setRating(starIndex);
      onRatingChange(starIndex);
    }
  };

  return (
    <div
      aria-labelledby="overallRating"
      className="starRating"
    >
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <span
          key={starIndex}
          className={`star ${starIndex <= rating ? 'filled' : ''}${interactive ? ' interactive' : ''}`}
          onClick={() => handleStarClick(starIndex)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

StarRating.propTypes = {
  ratingToDisplay: PropTypes.number,
  interactive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onRatingChange: PropTypes.func,
};

StarRating.defaultProps = {
  ratingToDisplay: 0,
  interactive: false,
  onRatingChange: () => {}, // Default empty function
};

export default StarRating;
