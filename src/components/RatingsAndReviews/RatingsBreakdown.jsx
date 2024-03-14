import React from 'react';
import PropTypes from 'prop-types';
import './RatingsBreakdown.css';

function RatingsBreakdown({
  reviewsMeta, updateStarFilter, starFilters, removeAllFilters,
}) {
  let totalReviews;
  let averageRating;
  let percentRecommend;

  if (reviewsMeta.ratings) {
    totalReviews = Object.values(reviewsMeta.ratings)
      .reduce((acc, eachRating) => (acc + Number(eachRating)), 0);

    let sum = 0;

    Object.keys(reviewsMeta.ratings).forEach((key) => {
      const rating = parseInt(key, 10);
      sum += rating * reviewsMeta.ratings[key];
    });
    averageRating = (sum / totalReviews).toFixed(1);

    percentRecommend = ((reviewsMeta.recommended.true / totalReviews).toFixed(2)) * 100;
  }

  const appliedFilters = Object.entries(starFilters)
  // eslint-disable-next-line no-unused-vars
    .filter(([rating, value]) => value)
    .map(([rating]) => rating);

  const appliedFiltersMessage = appliedFilters.length > 0
    ? `Star filters applied: ${appliedFilters.join(', ')}`
    : null;

  return (
    <div className="RatingsBreakdownContainer">
      {!Number.isNaN(Number(averageRating))
        ? (
          <>
            <div className="average-star-render">
              <div className="RR-AverageRating">{averageRating}</div>
              <RenderStarRating rating={averageRating} />
            </div>

            <div className="number-of-reviews">
              {totalReviews}
              {' '}
              reviews
            </div>
          </>
        )
        : null}

      <div className="percent-recommend">{`${percentRecommend}% of people recommend this product`}</div>

      <div className="RatingsBarsBox">
        {reviewsMeta.ratings
          && Object.entries(reviewsMeta.ratings)
            .reverse()
            .map(([rating, count]) => (
              <RatingBar
                key={rating}
                rating={rating}
                count={count}
                totalReviews={totalReviews}
                updateStarFilter={updateStarFilter}
              />
            ))}
      </div>

      <div className="remove-filter">
        {appliedFiltersMessage}
        {appliedFilters.length > 0
        && <button type="button" className="reviews-view-buttons" onClick={removeAllFilters}>Remove all filters</button>}
      </div>

      {reviewsMeta.characteristics
        && Object.entries(reviewsMeta.characteristics)
          .map(([description, object]) => (
            <CharacteristicBar
              key={description}
              characteristic={description}
              rating={object.value}
            />
          ))}

    </div>
  );
}

function RatingBar({
  rating, count, totalReviews, updateStarFilter,
}) {
  return (
    <div
      className="RatingsBarContainer"
      onClick={() => updateStarFilter(rating)}
      role="button"
    >
      <div>
        {`${rating} star`}
        {' '}
      </div>

      <div className="RatingsBar">
        <div
          className="RatingsBarFill"
          style={{
            width: `${100 * (count / totalReviews)}%`,
          }}
        />
      </div>

      <div className="RatingsCount">{count}</div>
    </div>
  );
}

function CharacteristicBar({ characteristic, rating }) {
  const characteristicOptions = {
    Size: [
      'A size too small',
      'Perfect',
      'A size too wide',
    ],
    Width: [
      'Too narrow',
      'Perfect',
      'Too wide',
    ],
    Comfort: [
      'Uncomfortable',
      'Perfect',
    ],
    Quality: [
      'Poor',
      'Perfect',
    ],
    Length: [
      'Runs short',
      'Perfect',
      'Runs long',
    ],
    Fit: [
      'Runs tight',
      'Perfect',
      'Runs long',
    ],
  };

  const characteristicTexts = characteristicOptions[characteristic];

  const calculateIconPosition = () => {
    const iconPosition = (((rating - 1) / 4) * 100);
    return `${iconPosition}%`;
  };

  return (
    <div className="CharacteristicBarContainer">
      {characteristic}
      <div className="scaleBar">

        <div
          className="averageIcon"
          style={{
            left: calculateIconPosition(),
          }}
        >
          {'\u25BC'}
        </div>
      </div>

      <div className="scaleText">
        {characteristicTexts.map((text) => (
          <div key={text}>{text}</div>
        ))}
      </div>

    </div>

  );
}

function RenderStarRating({ rating }) {
  const widthPercentage = `${(rating / 5) * 100}%`;

  return (
    <div className="star-rating-wrapper">
      <div className="full-stars" style={{ width: widthPercentage }} />
    </div>
  );
}

RatingsBreakdown.propTypes = {
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
  updateStarFilter: PropTypes.func.isRequired,
  starFilters: PropTypes.shape({
    1: PropTypes.bool,
    2: PropTypes.bool,
    3: PropTypes.bool,
    4: PropTypes.bool,
    5: PropTypes.bool,
  }).isRequired,
  removeAllFilters: PropTypes.func.isRequired,
};

CharacteristicBar.propTypes = {
  characteristic: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
};

RatingBar.propTypes = {
  rating: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  totalReviews: PropTypes.number.isRequired,
  updateStarFilter: PropTypes.func.isRequired,
};

RenderStarRating.propTypes = {
  rating: PropTypes.string.isRequired,
};

export default RatingsBreakdown;
