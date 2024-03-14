import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ActionButton from './ActionButton';
import Stars from './Stars';

function RelatedProductCard({
  productId,
  setProductId,
  type,
  action,
  productInformation,
  relatedItem,
  setRelatedItem,
}) {
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState([]);
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
    if (!productInformation || !productInformation.info) return;

    setProductInfo(productInformation.info);
    setProductStyles(productInformation.styles.results);

    const { ratings } = productInformation.meta;
    if (!ratings) return;

    let ratingsResult = 0;
    const keys = Object.keys(ratings);
    for (let i = 0; i < keys.length; i += 1) {
      ratingsResult += (parseInt(keys[i], 10) * parseInt(ratings[keys[i]], 10));
    }
    const ratingValues = Object.values(ratings).map((val) => parseInt(val, 10));
    const sumOfRatings = ratingValues.reduce((acc, curVal) => acc + curVal, 0);
    ratingsResult /= sumOfRatings;
    setProductReviews(ratingsResult);
  }, [productInformation]);

  useEffect(() => {
    if (!productStyles || !productStyles.length) return;
    const filteredStyles = productStyles.filter((style) => style['default?'] === true);
    const newDefaultStyle = filteredStyles.length > 0 ? filteredStyles[0] : productStyles[0];
    setDefaultStyle(newDefaultStyle);
  }, [productStyles]);

  useEffect(() => {
    if (defaultStyle && defaultStyle.photos && defaultStyle.photos.length) {
      const thumbnailUrl = defaultStyle.photos[productPhotoIndex].thumbnail_url;
      if (thumbnailUrl) {
        setProductPhotos(thumbnailUrl);
      }
    } else {
      setProductPhotos(imageNotFound);
    }
  }, [defaultStyle, productPhotoIndex]);

  return (!defaultStyle || defaultStyle === {})
    ? (
      <div>
        Loading...
      </div>
    )
    : (
      <div
        role="button"
        tabIndex="0"
        aria-label="related_product_card"
        className="related_product_card"
        onClick={() => {
          setProductId(productId);
          setRelatedItem({});
        }}
        onKeyDown={(e) => {
          handleKeyPressSetProductId(e);
          setRelatedItem({});
        }}
      >
        <ActionButton
          type={type}
          action={action}
          productInformation={productInformation}
          relatedItem={relatedItem}
        />
        {defaultStyle && defaultStyle.photos && defaultStyle.photos.length > 1
        && (
        <>
          <button
            type="button"
            className="related_product_prev_pic"
            aria-label="prev picture"
            onClick={(e) => decrementPhotoIndex(e)}
            onKeyDown={handleKeyPressDecrement}
          >
            <FaArrowLeft />
          </button>
          <button
            type="button"
            className="related_product_next_pic"
            aria-label="next picture"
            onClick={(e) => incrementPhotoIndex(e)}
            onKeyDown={handleKeyPressIncrement}
          >
            <FaArrowRight />
          </button>
        </>
        )}
        <br />
        <img
          src={productPhotos}
          className="product_card_image"
          alt="product_card_image"
          onError={handleImageError}
        />
        <div>
          <span className="product_card_name">
            {productInfo.name}
            {'  '}
          </span>
          <span className="product_card_extra_text">{productInfo.slogan}</span>
        </div>
        <div className="product_card_category">{productInfo.category}</div>
        {(defaultStyle.sale_price && defaultStyle.sale_price !== null) ? (
          <div className="product_card_sale_price">
            <span className="product_card_default_price_span">
              Price: $
              {productInfo.default_price}
            </span>
            <span className="product_card_sale_price_span">
              Price: $
              {defaultStyle.sale_price}
            </span>
          </div>
        ) : (
          <div className="product_card_price">
            Price: $
            {productInfo.default_price}
          </div>
        )}
        <div className="product_card_reviews">
          Reviews:
          {' '}
          <Stars rating={Math.round(productReviews / (1 / 4)) * (1 / 4)} />
        </div>
      </div>
    );
}

RelatedProductCard.propTypes = {
  productId: PropTypes.number.isRequired,
  setProductId: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  productInformation: PropTypes.shape({
    info: PropTypes.shape({}),
    styles: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      ratings: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  relatedItem: PropTypes.shape({
    info: PropTypes.shape({
      features: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
  setRelatedItem: PropTypes.func,
};

RelatedProductCard.defaultProps = {
  setRelatedItem: () => {},
  relatedItem: {
    info: {
      features: [],
    },
  },
};

export default RelatedProductCard;
