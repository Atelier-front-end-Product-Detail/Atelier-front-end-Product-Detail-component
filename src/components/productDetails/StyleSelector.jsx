import React from 'react';
import PropTypes from 'prop-types';

function StyleSelector({ styles, selectedStyle, onStyleSelect }) {
  const handleStyleClick = (style) => {
    if (selectedStyle && style.style_id === selectedStyle.style_id) {
      return;
    }
    onStyleSelect(style);
  };

  return (
    <div className="style-selector">

      <div className="style-title">
        <strong>Style &gt; </strong>
        {selectedStyle ? `${selectedStyle.name}` : ''}
      </div>

      <div className="styles-container">
        {styles.map((style) => (
          <div
            key={style.style_id}
            className={`style-thumbnail ${selectedStyle && selectedStyle.style_id === style.style_id ? 'selected' : ''}`}
            onClick={() => handleStyleClick(style)}
            onKeyDown={(e) => e.key === 'Enter' && handleStyleClick(style)}
            role="button"
            tabIndex={0}
          >
            <img src={style.photos[0].thumbnail_url} alt={style.name} />
            {selectedStyle && selectedStyle.style_id === style.style_id && (
              <div className="checkmark-container">
                <div className="checkmark">✔</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

StyleSelector.propTypes = {
  styles: PropTypes.arrayOf(
    PropTypes.shape({
      style_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          thumbnail_url: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  selectedStyle: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail_url: PropTypes.string,
      }),
    ),
  }),
  onStyleSelect: PropTypes.func.isRequired,
};

StyleSelector.defaultProps = {
  selectedStyle: null,
};

export default StyleSelector;
