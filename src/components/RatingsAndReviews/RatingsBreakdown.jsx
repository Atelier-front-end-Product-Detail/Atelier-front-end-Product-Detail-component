import React from 'react';
import PropTypes from 'prop-types';
import './RatingsBreakdown.css';
import StarRating from './StarRating';

function RatingsBreakdown({
  reviewsMeta, updateStarFilter, starFilters, removeAllFilters,
}) {
  // console.log('METADATA: ', reviewsMeta);

  // use Object.values to create an array of values. Call .reduce on array with accum set to 0.
  let totalReviews;
  let averageRating;
  let percentRecommend;

  if (reviewsMeta.ratings) {
    // calculate total reviews
    totalReviews = Object.values(reviewsMeta.ratings)
      .reduce((acc, eachRating) => (acc + Number(eachRating)), 0);

    // calculate averae rating
    let sum = 0;
    // for (const key in reviewsMeta.ratings) {
    //   sum += key * reviewsMeta.ratings[key];
    Object.keys(reviewsMeta.ratings).forEach((key) => {
      const rating = parseInt(key, 10);
      sum += rating * reviewsMeta.ratings[key];
    });
    averageRating = (sum / totalReviews).toFixed(1);

    // calculate percent recommend
    percentRecommend = ((reviewsMeta.recommended.true / totalReviews).toFixed(2)) * 100;
  }

  // console.log("totalReviews: ", totalReviews)
  // console.log("averageRating: ", averageRating)
  // console.log("percentRecommend: ", percentRecommend)
  // console.log(reviewsMeta.ratings);
  const appliedFilters = Object.entries(starFilters)
    .filter(([rating, value]) => value)
    .map(([rating, value]) => rating);

  const appliedFiltersMessage = appliedFilters.length > 0
    ? `Star filters applied: ${appliedFilters.join(', ')}`
    : null;

  // console.log(reviewsMeta.characteristics);

  return (
    <div className="RatingsBreakdownContainer">
      {!isNaN(averageRating)
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

      {/* <StarRating interactive="true" />
      <br />
      <StarRating ratingToDisplay="3" /> */}
      <div className="RatingsBarsBox">
        {/* map over reviewsMeta.ratings and return RatingBar. Reverse order. */}
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
        && <button className="reviews-view-buttons" onClick={removeAllFilters}>Remove all filters</button>}
      </div>

      {reviewsMeta.characteristics
        && Object.entries(reviewsMeta.characteristics)
          .map(([description, object]) => (
            <CharacteristicBar key={description} characteristic={description} rating={object.value} />
          ))}

    </div>
  );
}

function RatingBar({
  rating, count, totalReviews, updateStarFilter,
}) {
  return (
    <div className="RatingsBarContainer" onClick={() => updateStarFilter(rating)}>
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
  // console.log('CHAR rating', rating);

  const characteristicOptions = {
    Size: [
      'A size too small',
      // '½ a size too small',
      'Perfect',
      // '½ a size too big',
      'A size too wide',
    ],
    Width: [
      'Too narrow',
      // 'Slightly narrow',
      'Perfect',
      // 'Slightly wide',
      'Too wide',
    ],
    Comfort: [
      'Uncomfortable',
      // 'Slightly uncomfortable',
      // 'Ok',
      // 'Comfortable',
      'Perfect',
    ],
    Quality: [
      'Poor',
      // 'Below average',
      // 'What I expected',
      // 'Pretty great',
      'Perfect',
    ],
    Length: [
      'Runs short',
      // 'Runs slightly short',
      'Perfect',
      // 'Runs slightly long',
      'Runs long',
    ],
    Fit: [
      'Runs tight',
      // 'Runs slightly tight',
      'Perfect',
      // 'Runs slightly long',
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
        {characteristicTexts.map((text, index) => (
          <div key={index}>{text}</div>
        ))}
      </div>

    </div>

  );
}

function RenderStarRating ({ rating }) {
  const widthPercentage = `${(rating / 5) * 100}%`;

  return (
    <div className="star-rating-wrapper">
      <div className="full-stars" style={{ width: widthPercentage }} />
    </div>
  );
}

RatingsBreakdown.propTypes = {
  // productId: PropTypes.number.isRequired,
  reviewsMeta: PropTypes.shape({
    ratings: PropTypes.shape({
      rating: PropTypes.number,
    }),
    characteristics: PropTypes.shape({
      description: PropTypes.string,
    }),
    recommended: PropTypes.shape({
      boolean: PropTypes.bool,
    }),
  }).isRequired,
};

CharacteristicBar.propTypes = {
  characteristic: PropTypes.string.isRequired,
};

RatingBar.propTypes = {
  rating: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  totalReviews: PropTypes.number.isRequired,
};

export default RatingsBreakdown;
