import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './Holistic.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faCompress } from '@fortawesome/free-solid-svg-icons';

function ImageGallery({ style }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  const hasPhotos = style.photos && style.photos.length > 0;
  const currentImage = hasPhotos ? style.photos[selectedImageIndex] : null;

  const toggleExpandedView = () => {
    setIsExpanded(!isExpanded);
    setIsZoomed(false);
  };

  const handleMainImageClick = (event) => {
    if (isExpanded && !isZoomed) {
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
      setIsZoomed(true);
    } else if (isZoomed) {
      setIsZoomed(false);
    } else {
      toggleExpandedView();
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    if (isZoomed) setIsZoomed(false); // reset zoom state when changing pic
  };

  const handleMouseMove = (event) => {
    if (isZoomed) {
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
    }
  };

  const handleMainImageArrowClick = (direction, event) => {
    event.stopPropagation();
    if (!isZoomed) {
      const newIndex = selectedImageIndex + (direction === 'next' ? 1 : -1);
      if (newIndex >= 0 && newIndex < style.photos.length) {
        setSelectedImageIndex(newIndex);
      }
    }
  };

  const getCursorStyle = () => {
    if (isExpanded) {
      return isZoomed ? 'zoom-out' : 'zoom-in';
    }
    return 'default';
  };

  return (
    <div className={`image-gallery ${isExpanded ? 'expanded' : ''}`}>
      {hasPhotos && (
        <div className="gallery-container" ref={imageContainerRef}>
          {(!isZoomed) && (
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
          )}
          <div
            className="main-image"
            onClick={handleMainImageClick}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'Space') {
                handleMainImageClick();
              }
            }}
            style={{ cursor: getCursorStyle() }}
            role="button"
            tabIndex="0"
            onMouseMove={handleMouseMove}
          >

            {(selectedImageIndex > 0 && !isZoomed) && (
              <button
                className="arrow left-arrow"
                onClick={(e) => handleMainImageArrowClick('previous', e)}
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
              style={{
                transform: isZoomed ? `scale(2.5) translate(${50 - zoomPosition.x}%, ${50 - zoomPosition.y}%)` : 'scale(1)',
                transformOrigin: 'center',
                transition: 'transform 0.3s ease',
              }}
            />
            {(selectedImageIndex < style.photos.length - 1 && !isZoomed) && (
              <button
                className="arrow right-arrow"
                onClick={(e) => handleMainImageArrowClick('next', e)}
                type="button"
                aria-label="Next image"
              >
                &#8594;
              </button>
            )}
          </div>
          <button
            className="expand-collapse-btn"
            onClick={toggleExpandedView}
            type="button"
            aria-label={isExpanded ? 'Collapse content' : 'Expand content'}
          >
            <FontAwesomeIcon icon={isExpanded ? faCompress : faExpand} />
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
