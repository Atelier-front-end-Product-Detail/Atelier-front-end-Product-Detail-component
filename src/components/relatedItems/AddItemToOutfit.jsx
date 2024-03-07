import React from 'react';
import PropTypes from 'prop-types';

function AddItemToOutfit({ productId, userOutfit, setUserOutfit }) {
  const addToOutfit = () => {
    let newUserOutfit = [...userOutfit];
    newUserOutfit.push(productId);
    const newUserOutfitSet = new Set(newUserOutfit);
    newUserOutfit = [...newUserOutfitSet];
    localStorage.setItem('fecYourOutfit', JSON.stringify(newUserOutfit));
    setUserOutfit(newUserOutfit);
  };

  const handleKeyPressAddItem = (e) => {
    if (e.key === 'Enter') {
      addToOutfit();
    }
  };

  // const removeFromOutfit = () => {
  //   const newUserOutfit = [...userOutfit];
  //   const index = newUserOutfit.indexOf(productId);
  //   if (index < 0) {
  //     return;
  //   }
  //   newUserOutfit.splice(index, 1);
  //   localStorage.setItem('fecYourOutfit', JSON.stringify(newUserOutfit));
  //   setUserOutfit(newUserOutfit);
  // };

  // const handleKeyPressRemoveItem = (e) => {
  //   if (e.key === 'Enter') {
  //     addToOutfit();
  //   }
  // };

  return (
    <div>
      <div id="add_item_to_outfit" role="button" tabIndex="0" aria-label="add_item_to_outfit" onClick={addToOutfit} onKeyPress={handleKeyPressAddItem}>
        CLICK HERE TO ADD CURRENTLY VIEWED ITEM TO OUTFIT
      </div>
      {/* <div id="remove_item_from_outfit"role="button" tabIndex="0" aria-label="remove_item
      from_outfit" onClick={removeFromOutfit} onKeyPress={handleKeyPressRemoveItem}>
        CLICK HERE TO REMOVE CURRENTLY VIEWED ITEM FROM OUTFIT
      </div> */}
    </div>
  );
}

AddItemToOutfit.propTypes = {
  productId: PropTypes.number.isRequired,
  userOutfit: PropTypes.arrayOf(PropTypes.number).isRequired,
  setUserOutfit: PropTypes.func.isRequired,
};

export default AddItemToOutfit;
