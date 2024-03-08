import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Holistic.css';

function ImageGallery({ style }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasPhotos = style.photos && style.photos.length > 0;
  const currentImage = hasPhotos ? style.photos[selectedImageIndex] : null;

  const toggleExpandedView = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMainImageClick = () => {
    if (!isExpanded) {
      toggleExpandedView();
    }
  };

  const handleMainImageArrowClick = (direction, event) => {
    event.stopPropagation();
    const newIndex = selectedImageIndex + (direction === 'next' ? 1 : -1);
    if (newIndex >= 0 && newIndex < style.photos.length) {
      setSelectedImageIndex(newIndex);
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className={`image-gallery ${isExpanded ? 'expanded' : ''}`}>
      {hasPhotos && (
        <div className="gallery-container">
          <div className="thumbnail-gallery">
            {style.photos.map((photo, index) => (
              <button
                key={photo.id || photo.thumbnail_url || index}
                className={`thumbnail-button ${index === selectedImageIndex ? 'selected' : ''}`}
                onClick={() => handleThumbnailClick(index)}
                type="button"
              >
                <img
                  src={photo.thumbnail_url}
                  alt={`Thumbnail ${index}`}
                />
              </button>
            ))}
          </div>
          <div
            className="main-image"
            onClick={handleMainImageClick}
            onKeyDown={(e) => e.key === 'Enter' && handleMainImageClick()}
            style={{ cursor: isExpanded ? 'default' : 'zoom-in' }}
            tabIndex="0"
            role="button"
            aria-pressed={isExpanded}
          >
            <div className="active-image-container">
              {selectedImageIndex > 0 && (
                <button
                  className="arrow left-arrow"
                  onClick={(e) => handleMainImageArrowClick('previous', e)}
                  onKeyDown={(e) => e.key === 'Enter' && handleMainImageArrowClick('previous', e)}
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
                  onClick={(e) => handleMainImageArrowClick('next', e)}
                  onKeyDown={(e) => e.key === 'Enter' && handleMainImageArrowClick('next', e)}
                  type="button"
                  aria-label="Next image"
                >
                  &#8594;
                </button>
              )}
            </div>
          </div>
          <button className="expand-collapse-btn" onClick={toggleExpandedView} type="button">
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
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
