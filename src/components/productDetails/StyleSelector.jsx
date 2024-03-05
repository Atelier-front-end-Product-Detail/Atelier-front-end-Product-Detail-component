import React, { useState } from 'react';
import PropTypes from 'prop-types';

function StyleSelector({ styles }) {
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);

  const handleStyleClick = (style) => {
    if (style !== selectedStyle) {
      setSelectedStyle(style);
    }
  };

  return (
    <div className="style-selector">
      <div className="style-title">{selectedStyle.name}</div>
      <div className="styles-container">
        {styles.map((style) => (
          <div
            key={style.name}
            className={`style-thumbnail ${selectedStyle === style ? 'selected' : ''}`}
            onClick={() => handleStyleClick(style)}
            onKeyDown={(e) => e.key === 'Enter' && handleStyleClick(style)}
            role="button"
            tabIndex={0}
          >
            <img src={style.photos[0].thumbnail_url} alt={style.name} />
            {selectedStyle === style && <div className="checkmark">✔</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

StyleSelector.propTypes = {
  styles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          thumbnail_url: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

export default StyleSelector;
