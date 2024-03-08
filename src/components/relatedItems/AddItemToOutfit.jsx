import React from 'react';
import PropTypes from 'prop-types';

function AddItemToOutfit({ addToOutfit }) {
  const handleKeyPressAddItem = (e) => {
    if (e.key === 'Enter') {
      addToOutfit();
    }
  };

  return (
    <div>
      <div id="add_item_to_outfit" role="button" tabIndex="0" aria-label="add_item_to_outfit" onClick={addToOutfit} onKeyPress={handleKeyPressAddItem}>
        CLICK HERE TO ADD CURRENTLY VIEWED ITEM TO OUTFIT
      </div>
    </div>
  );
}

AddItemToOutfit.propTypes = {
  addToOutfit: PropTypes.func.isRequired,
};

export default AddItemToOutfit;
