import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function RelatedProductCard({ productId, bridge, setProductId }) {
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState([{}]);
  const [defaultStyle, setDefaultStyle] = useState({});
  const [productPhotos, setProductPhotos] = useState('');
  const [productPhotoIndex, setProductPhotoIndex] = useState(0);
  const [productReviews, setProductReviews] = useState(0);

  const imageNotFound = process.env.IMAGE_NOT_FOUND;

  // HELPER FUNCTIONS
  const incrementPhotoIndex = (e) => {
    e.stopPropagation();
    if (defaultStyle.photos) {
      const range = defaultStyle.photos.length - 1;
      if (productPhotoIndex < range) {
        setProductPhotoIndex(productPhotoIndex + 1);
      } else {
        setProductPhotoIndex(0);
      }
    }
  };

  const decrementPhotoIndex = (e) => {
    e.stopPropagation();
    if (defaultStyle.photos) {
      const range = defaultStyle.photos.length - 1;
      if (productPhotoIndex > 0) {
        setProductPhotoIndex(productPhotoIndex - 1);
      } else {
        setProductPhotoIndex(range);
      }
    }
  };

  const handleKeyPressSetProductId = (e) => {
    if (e.key === 'Enter') {
      setProductId(productId);
    }
  };

  const handleKeyPressIncrement = (e) => {
    if (e.key === 'Enter') {
      incrementPhotoIndex(e);
    }
  };

  const handleKeyPressDecrement = (e) => {
    if (e.key === 'Enter') {
      decrementPhotoIndex(e);
    }
  };

  const handleImageError = (e) => {
    e.currentTarget.src = imageNotFound;
  };

  // SET INITIAL STATES
  useEffect(() => {
    bridge.productInformation(productId)
      .then((results) => setProductInfo(results.data));
    bridge.productStyles(productId)
      .then((results) => setProductStyles(results.data.results));
    bridge.reviewsMeta(productId)
      .then((results) => {
        let result = 0;
        const keys = Object.keys(results.data.ratings);
        for (let i = 0; i < keys.length; i += 1) {
          result += (parseInt(keys[i], 10) * parseInt(results.data.ratings[keys[i]], 10));
        }
        const ratingValues = Object.values(results.data.ratings).map((val) => parseInt(val, 10));
        const sumOfRatings = ratingValues.reduce((acc, curVal) => acc + curVal, 10);
        result /= sumOfRatings;
        return result;
      })
      .then((results) => setProductReviews(results));
  }, [productId]);

  // SET DERIVATIVE STATES
  useEffect(() => {
    let newDefaultStyle = productStyles.filter((style) => style['default?'] === true)[0] || {};
    if (JSON.stringify(newDefaultStyle) === '{}' && productStyles.length) { [newDefaultStyle] = productStyles; }
    setDefaultStyle(newDefaultStyle);
  }, [productStyles]);

  useEffect(() => {
    if (defaultStyle.photos && defaultStyle.photos.length) {
      const thumbnailUrl = defaultStyle.photos[productPhotoIndex].thumbnail_url;
      if (thumbnailUrl) {
        setProductPhotos(thumbnailUrl);
      }
    } else {
      setProductPhotos(imageNotFound);
    }
  }, [defaultStyle, productPhotoIndex]);

  return (
    <div role="button" tabIndex="0" aria-label="related_product_card" className="related_product_card" onClick={() => setProductId(productId)} onKeyPress={(e) => handleKeyPressSetProductId(e)}>
      <button type="button" className="related_product_prev_pic" onClick={(e) => decrementPhotoIndex(e)} onKeyPress={handleKeyPressDecrement}>prev pic</button>
      <button type="button" className="related_product_next_pic" onClick={(e) => incrementPhotoIndex(e)} onKeyPress={handleKeyPressIncrement}>next pic</button>
      <br />
      <img src={productPhotos} className="product_card_image" alt="product_card_image" onError={handleImageError} />
      <p className="product_card_category">{productInfo.category}</p>
      <span className="product_card_name">
        {productInfo.name}
        {'  '}
      </span>
      <span className="product_card_extra_text">{productInfo.slogan}</span>
      {(defaultStyle.sale_price && defaultStyle.sale_price !== null) ? (
        <p className="product_card_sale_price">
          Price:
          {' '}
          {defaultStyle.sale_price}
        </p>
      ) : (
        <p className="product_card_price">
          Price:
          {' '}
          {productInfo.default_price}
        </p>
      )}
      <p className="product_card_reviews">
        Reviews:
        {' '}
        {productReviews}
      </p>
    </div>
  );
}

RelatedProductCard.propTypes = {
  productId: PropTypes.number.isRequired,
  bridge: PropTypes.shape({
    productInformation: PropTypes.func.isRequired,
    productStyles: PropTypes.func.isRequired,
    reviewsMeta: PropTypes.func.isRequired,
  }).isRequired,
  setProductId: PropTypes.func.isRequired,
};

export default RelatedProductCard;
