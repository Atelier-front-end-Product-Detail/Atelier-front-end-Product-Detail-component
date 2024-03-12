import React, { useState } from 'react';
import './StarRating.css';


function StarRating({ ratingToDisplay, interactive, onRatingChange, id }) {
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
      id={id}>
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <span
          key={starIndex}
          className={`star ${starIndex <= rating ? 'filled' : ''}${interactive ? ' interactive' : ''}`}
          onClick={() => handleStarClick(starIndex)}
        >
          ★
          {/* &#9733; */}
          {/* {'\u2605'} */}
        </span>
      ))}
    </div>
  );
}

export default StarRating;
