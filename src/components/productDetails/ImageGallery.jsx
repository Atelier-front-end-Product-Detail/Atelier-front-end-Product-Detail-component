import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Holistic.css';

function ImageGallery({ style }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  const hasPhotos = style.photos && style.photos.length > 0;
  const currentImage = hasPhotos ? style.photos[selectedImageIndex] : null;

  const handleMainImageArrowClick = (direction) => {
    const newIndex = selectedImageIndex + (direction === 'next' ? 1 : -1);
    if (newIndex >= 0 && newIndex < style.photos.length) {
      setSelectedImageIndex(newIndex);
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const canScrollLeft = thumbnailStartIndex > 0;
  const canScrollRight = style.photos && thumbnailStartIndex < style.photos.length - 7;

  const handleThumbnailArrowClick = (direction) => {
    setThumbnailStartIndex((prevIndex) => {
      if (direction === 'next' && canScrollRight) {
        return prevIndex + 1;
      }
      if (direction === 'previous' && canScrollLeft) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  return (
    <div className="image-gallery">
      {hasPhotos && (
        <div className="gallery-container">
          {canScrollLeft && (
            <button
              className="arrow thumbnail-left-arrow"
              onClick={() => handleThumbnailArrowClick('previous')}
              type="button"
              aria-label="Scroll left"
            >
              &#8592;
            </button>
          )}
          <div className="thumbnail-gallery">
            {style.photos
              .slice(thumbnailStartIndex, thumbnailStartIndex + 7)
              .map((photo, index) => (
                <button
                  key={photo.id || photo.thumbnail_url || index}
                  className={`thumbnail-button ${
                    index + thumbnailStartIndex === selectedImageIndex
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleThumbnailClick(index + thumbnailStartIndex)}
                  type="button"
                >
                  <img
                    src={photo.thumbnail_url}
                    alt={`Thumbnail ${index + thumbnailStartIndex}`}
                  />
                </button>
              ))}
          </div>
          {canScrollRight && (
            <button
              className="arrow thumbnail-right-arrow"
              onClick={() => handleThumbnailArrowClick('next')}
              type="button"
              aria-label="Scroll right"
            >
              &#8594;
            </button>
          )}
          <div className="main-image">
            <div className="active-image-container">
              {selectedImageIndex > 0 && (
                <button
                  className="arrow left-arrow"
                  onClick={() => handleMainImageArrowClick('previous')}
                  type="button"
                  aria-label="Previous image"
                >
                  &#8592;
                </button>
              )}
              <img
                src={currentImage.url}
                alt="Product"
                className="active-image"
              />
              {selectedImageIndex < style.photos.length - 1 && (
                <button
                  className="arrow right-arrow"
                  onClick={() => handleMainImageArrowClick('next')}
                  type="button"
                  aria-label="Next image"
                >
                  &#8594;
                </button>
              )}
            </div>
          </div>
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
        id: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
};

export default ImageGallery;
