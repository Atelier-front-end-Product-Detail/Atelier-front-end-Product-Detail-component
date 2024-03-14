import React from 'react';
import PropTypes from 'prop-types';
import './Holistic.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';

function ProductInformation({ product, style, reviewsMeta }) {
  function renderStarRating(rating) {
    const widthPercentage = `${(rating / 5) * 100}%`;

    return (
      <div className="star-rating-wrapper">
        <div className="full-stars" style={{ width: widthPercentage }} />
      </div>
    );
  }

  if (!product || !style || !reviewsMeta) {
    return <p>Could not be found?</p>;
  }

  const {
    category,
    name,
  } = product;

  const { original_price: originalPrice, sale_price: salePrice } = style;
  const { ratings } = reviewsMeta;

  // convert to array and get sum
  const totalReviews = Object.values(ratings).reduce((sum, num) => sum + parseInt(num, 10), 0);
  // rating * times (kv pair)
  const averageRating = totalReviews > 0
    ? Object.entries(ratings).reduce((acc, [key, value]) => acc + (key * value), 0) / totalReviews
    : 0;

  const roundedAverageRating = Math.round(averageRating * 4) / 4;

  return (
    <div className="product-information">
      {totalReviews > 0 && (
        <div className="star-rating">
          {renderStarRating(roundedAverageRating)}
          <a href="#ratings-and-reviews">
            Read all&nbsp;
            {totalReviews}
            &nbsp;reviews
          </a>
        </div>
      )}

      <h3>{category}</h3>
      <h2>{name}</h2>

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

      <div className="social-media-share">
        <a href="http://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="http://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="http://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
          <FontAwesomeIcon icon={faPinterestP} />
        </a>
        <a href="http://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
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
