import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ImageGallery({ style }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // check photos reqs
  const hasPhotos = style.photos && style.photos.length > 0;
  const currentImage = hasPhotos ? style.photos[selectedImageIndex] : null;

  // clicking arrows
  const handleArrowClick = (direction) => {
    const newIndex = selectedImageIndex + (direction === 'next' ? 1 : -1);
    // traversing within photos array length
    if (newIndex >= 0 && newIndex < style.photos.length) {
      setSelectedImageIndex(newIndex);
    }
  };

  return (
    <div className="image-gallery">
      {hasPhotos && (
        <div className="main-image">
          {selectedImageIndex > 0 && (
            <button
              type="button"
              className="left-arrow"
              onClick={() => handleArrowClick('previous')}
              tabIndex={0}
            >
              &#8592;
            </button>
          )}
          <img src={currentImage.thumbnail_url} alt="Product" />
          {selectedImageIndex < style.photos.length - 1 && (
            <button
              type="button"
              className="right-arrow"
              onClick={() => handleArrowClick('next')}
              tabIndex={0}
            >
              &#8594;
            </button>
          )}
        </div>
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  style: PropTypes.shape({
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail_url: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default ImageGallery;
