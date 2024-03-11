import React from 'react';
import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';

function ActionButton({
  type, action, productInformation, relatedItem,
}) {
  const handleClickAction = (e) => {
    e.stopPropagation();
    const actionObj = relatedItem
      && relatedItem.info
      && relatedItem.info.id
      && productInformation.info.id === relatedItem.info.id
      ? {}
      : productInformation;
    action(actionObj);
  };
  const handleKeyPressAction = (e) => {
    if (e.key === 'Enter') {
      const actionObj = relatedItem
        && relatedItem.info
        && relatedItem.info.id
        && productInformation.info.id === relatedItem.info.id
        ? {}
        : productInformation;
      action(actionObj);
    }
  };

  return type === 'related products' ? (
    <button
      type="button"
      className="related_items_action_button_heart"
      aria-label="open comparison modal"
      onClick={handleClickAction}
      onKeyDown={handleKeyPressAction}
    >
      <FaHeart />
    </button>
  )
    : (
      <button
        type="button"
        className="related_items_action_button_x"
        aria-label="remove from your outfit"
        onClick={handleClickAction}
        onKeyDown={handleKeyPressAction}
      >
        X
      </button>
    );
}

ActionButton.propTypes = {
  type: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  productInformation: PropTypes.shape({
    info: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  relatedItem: PropTypes.shape({
    info: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

ActionButton.defaultProps = {
  productInformation: {
    info: {
      id: null,
    },
  },
  relatedItem: {
    info: {
      id: null,
    },
  },
};

export default ActionButton;
