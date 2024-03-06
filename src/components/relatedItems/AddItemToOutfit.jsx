import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function AddItemToOutfit({ productId, userOutfit, setUserOutfit}) {
  const addToOutfit = () => {
    let newUserOutfit = [...userOutfit];
    newUserOutfit.push(productId);
    const newUserOutfitSet = new Set(newUserOutfit);
    newUserOutfit = [...newUserOutfitSet];
    localStorage.setItem('fecYourOutfit', JSON.stringify(newUserOutfit));
    setUserOutfit(newUserOutfit);
  };

  const handleKeyPress = (e) => {};
  return (
    <div id="add_item_to_outfit" role="button" tabIndex="0" aria-label="add_item_to_outfit" onClick={addToOutfit} onKeyPress={handleKeyPress}>
      CLICK HERE TO ADD CURRENTLY VIEWED ITEM TO OUTFIT
    </div>
  );
}

export default AddItemToOutfit;
