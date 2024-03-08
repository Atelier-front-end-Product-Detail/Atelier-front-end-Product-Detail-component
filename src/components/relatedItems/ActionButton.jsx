import React from 'react';
import PropTypes from 'prop-types';
import { FaHeart } from "react-icons/fa";

function ActionButton({ type, action, productId }) {
  const handleClickAction = (e) => {
    e.stopPropagation();
    action(productId);
  };
  const handleKeyPressAction = (e) => {
    if (e.key === 'Enter') {
      action(productId);
    }
  };

  return type === 'related products' ? (
    <button type="button" className="related_items_action_button_heart" aria-label="open comparison modal" onClick={handleClickAction} onKeyPress={handleKeyPressAction}>
      <FaHeart />
    </button>
  )
    : (
      <button type="button" className="related_items_action_button_x" aria-label="remove from your outfit" onClick={handleClickAction} onKeyPress={handleKeyPressAction}>
        X
      </button>
    );
}

ActionButton.propTypes = {
  type: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  productId: PropTypes.number.isRequired,
};

export default ActionButton;
