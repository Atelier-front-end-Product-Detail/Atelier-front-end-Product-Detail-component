import React from 'react';
import PropTypes from 'prop-types';

function Stars({ rating }) {
  return (
    <>
      <div
        className="full_stars"
        style={{
          width: `${16 * rating}px`,
        }}
      />
      <div className="empty_stars" />
    </>
  );
}

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Stars;
