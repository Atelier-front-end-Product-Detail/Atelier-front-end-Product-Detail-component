import React, { useState } from 'react';


const StyleSelector = ({ styles }) => {
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);

  //handler
  const handleStyleClick = (style) => {
    if (style !== selectedStyle) {
      setSelectedStyle(style);
    }
  };

  return (
    <div className="style-selector">
      <div className="style-title">{selectedStyle.name}</div>
      <div className="styles-container">
        {styles.map((style, index) => (
          <div key={style.name} className={`style-thumbnail ${selectedStyle === style ? 'selected' : ''}`}
               onClick={() => handleStyleClick(style)}>
            <img src={style.thumbnail_url} alt={style.name} />
            {selectedStyle === style && <div className="checkmark">✔</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;