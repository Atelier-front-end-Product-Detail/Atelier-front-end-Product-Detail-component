import React from 'react';

const ProductInformation = ({ product, style, reviewsMeta }) => {
  // function for star calculation/renderiung
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

  const { category, name, description } = product;
  const { original_price, sale_price } = style;
  const { ratings } = reviewsMeta;
  const totalReviews = Object.values(ratings).reduce((sum, num) => sum + parseInt(num), 0);
  const averageRating = Object.entries(ratings).reduce((acc, [key, value]) => acc + (key * value), 0) / totalReviews;

  return (
    <div className="product-information">
      {/* star rating / # of reviews */}
      {totalReviews > 0 && (
        <div className="star-rating">
          {renderStarRating(averageRating)}
          <a href="#ratings-and-reviews">Read all {totalReviews} reviews</a>
        </div>

      )}

      {/* product category / title */}
      <h2>{name}</h2>
      <h3>{category}</h3>

      {/* price */}
      <div className="price">
        {sale_price ? (
          <>
            <span className="sale-price">${sale_price}</span>
            <span className="original-price">${original_price}</span>
          </>
        ) : (
          <span>${original_price}</span>
        )}
      </div>

      {/* product overview */}
      {description && <p className="product-overview">{description}</p>}

      {/* Social Media Share Buttons */}
      <div className="social-media-share">

      </div>
    </div>
  );
};

export default ProductInformation;