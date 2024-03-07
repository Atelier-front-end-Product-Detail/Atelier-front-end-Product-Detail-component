import React from 'react';
import PropTypes from 'prop-types';

function ProductInformation({ product, style, reviewsMeta }) {
  const renderStarRating = (rating) => {
    const roundedRating = Math.round(rating * 4) / 4;
    const fullStars = Math.floor(roundedRating);
    const quarterStar = roundedRating % 1;
    const emptyStars = 5 - fullStars - (quarterStar ? 1 : 0);

    return (
      <>
        {'★'.repeat(fullStars)}
        {quarterStar ? '¾' : ''}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  if (!product || !style || !reviewsMeta) {
    return <p>Could not be found?</p>;
  }

  const {
    category,
    name,
  } = product;

  const { original_price: originalPrice, sale_price: salePrice } = style;
  const { ratings } = reviewsMeta;

  const totalReviews = Object.values(ratings).reduce((sum, num) => sum + parseInt(num, 10), 0);
  const averageRating = totalReviews > 0
    ? Object.entries(ratings).reduce((acc, [key, value]) => acc + (key * value), 0) / totalReviews
    : 0;

  return (
    <div className="product-information">
      {totalReviews > 0 && (
        <div className="star-rating">
          {renderStarRating(averageRating)}
          <a href="#ratings-and-reviews">
            Read all
            {totalReviews}
            reviews
          </a>
        </div>
      )}

      <h3>{category}</h3>
      <h2>{name}</h2>

      {/* slogan && <p className="product-slogan">{slogan}</p> */}

      <div className="price">
        {salePrice ? (
          <>
            <span className="sale-price">
              $
              {salePrice}
            </span>
            {' '}
            <span className="original-price" style={{ textDecoration: 'line-through' }}>
              $
              {originalPrice}
            </span>
          </>
        ) : (
          <span>
            $
            {originalPrice}
          </span>
        )}
      </div>

      {/* description && <p className="product-overview">{description}</p> */}

      <div className="social-media-share">
        {/* social media share buttons implementation */}
      </div>
    </div>
  );
}

ProductInformation.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    slogan: PropTypes.string,
  }).isRequired,
  style: PropTypes.shape({
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
  }).isRequired,
  reviewsMeta: PropTypes.shape({
    ratings: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default ProductInformation;
