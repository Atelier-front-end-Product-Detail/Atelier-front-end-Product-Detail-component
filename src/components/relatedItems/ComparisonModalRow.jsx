import React from 'react';
import PropTypes from 'prop-types';

function ComparisonModalRow({ productInfo }) {
  // const [modalStyle, setModalStyle] = useState({});
  // setModalStyle({ minWidth: `calc(100% / ${productInfo.length})` });
  return (
    <div className="comparison_modal_row">
      <div className="comparison_modal_main_column">{productInfo[0]}</div>
      {productInfo.slice(1).map((item) => <div className="comparison_modal_column">{item}</div>)}
    </div>
  );
}

ComparisonModalRow.propTypes = {
  productInfo: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ComparisonModalRow;
