import React from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

function Stars({ rating }) {
  const blackStarsStyle = {
    color: 'black',
  };
  const yellowStarsStyle = {
    color: 'yellow',
  };
  return (
    <>
      <div style={{
        position: 'relative',
        width: `${16 * rating}px`,
        overflow: 'hidden',
        zIndex: 2,
      }}
      >
        <FaStar style={yellowStarsStyle} />
        <FaStar style={yellowStarsStyle} />
        <FaStar style={yellowStarsStyle} />
        <FaStar style={yellowStarsStyle} />
        <FaStar style={yellowStarsStyle} />
      </div>
      <div style={{
        position: 'relative',
        top: '-20px',
        zIndex: 1,
      }}
      >
        <FaStar style={blackStarsStyle} />
        <FaStar style={blackStarsStyle} />
        <FaStar style={blackStarsStyle} />
        <FaStar style={blackStarsStyle} />
        <FaStar style={blackStarsStyle} />
      </div>
    </>
  );
}

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Stars;
