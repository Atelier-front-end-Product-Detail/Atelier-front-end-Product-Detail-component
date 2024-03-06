import React, { useState } from 'react';
import './StarRating.css';

function StarRating({ ratingToDisplay, interactive }) {
  const [rating, setRating] = useState(ratingToDisplay);

  const handleStarClick = (starIndex) => {
    if(interactive) {
      setRating(starIndex);
    }


  };

  return (
    <div className="starRating">
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <span
          key={starIndex}
          className={`star ${starIndex <= rating ? 'filled' : ''}${interactive ? 'interactive' : ''}`}
          onClick={() => handleStarClick(starIndex)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default StarRating;
