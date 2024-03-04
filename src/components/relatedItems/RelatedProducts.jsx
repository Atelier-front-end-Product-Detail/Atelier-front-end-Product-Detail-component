import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import RelatedProductCard from './RelatedProductCard';
// import ComparisonModal from './ComparisonModal';

function RelatedProducts({ relatedItems, bridge, setProductId }) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [relatedItemsInfo, setRelatedItemsInfo] = useState([]);

  const relatedProductCardWidthPlusGap = 328;

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const currentScroll = container.scrollLeft;
      const remainder = currentScroll % relatedProductCardWidthPlusGap;
      const scrollTarget = currentScroll - remainder - (
        remainder === 0 ? relatedProductCardWidthPlusGap : 0
      );
      container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
    }
  };

  const handleKeyPressScrollLeft = (e) => {
    if (e.key === 'Enter') {
      scrollLeft();
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const currentScroll = container.scrollLeft;
      if (showRightArrow) {
        const additionalScroll = relatedProductCardWidthPlusGap - (
          currentScroll % relatedProductCardWidthPlusGap
        );
        const scrollTarget = currentScroll + additionalScroll;
        container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: relatedProductCardWidthPlusGap, behavior: 'smooth' });
      }
    }
  };

  const handleKeyPressScrollRight = (e) => {
    if (e.key === 'Enter') {
      scrollRight();
    }
  };

  useEffect(() => {
    setRelatedItemsInfo(new Set());
    const checkScrollButtons = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const isScrolledToLeft = container.scrollLeft > 0;
      setShowLeftArrow(isScrolledToLeft);

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const isScrolledToRight = container.scrollLeft < maxScrollLeft;
      setShowRightArrow(isScrolledToRight);
    };

    checkScrollButtons();
    const container = scrollContainerRef.current;
    container.addEventListener('scroll', checkScrollButtons);

    return () => {
      container.removeEventListener('scroll', checkScrollButtons);
    };
  }, [relatedItems]);

  return (
    <div className="related_products_outer_div">
      {showLeftArrow && (
      <button
        type="button"
        className="related_products_left_arrow_button"
        onClick={scrollLeft}
        onKeyPress={handleKeyPressScrollLeft}
        aria-label="Scroll left"
      >
        <img
          className="related_products_left_arrow"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxiJP06vaMCAvp0Mm5IlQRVYj-j2ZFueNbLg&usqp=CAU"
          alt="Scroll left"
        />
      </button>
      )}
      {showRightArrow && (
      <button
        type="button"
        className="related_products_right_arrow_button"
        onClick={scrollRight}
        onKeyPress={handleKeyPressScrollRight}
        aria-label="Scroll left"
      >
        <img
          src="data:image/png;base64,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"
          alt="yellow right arrow"
          className="related_products_right_arrow"
        />
      </button>
      )}
      <div id="related_products" ref={scrollContainerRef}>
        {relatedItems.map((productId) => (
          <RelatedProductCard
            productId={productId}
            bridge={bridge}
            key={productId}
            setProductId={setProductId}
            relatedItemsInfo={relatedItemsInfo}
            setRelatedItemsInfo={setRelatedItemsInfo}
          />
        ))}
        {/* <ComparisonModal relatedItemsInfo={relatedItemsInfo} /> */}
      </div>
    </div>
  );
}

RelatedProducts.propTypes = {
  relatedItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  bridge: PropTypes.shape({}).isRequired,
  setProductId: PropTypes.func.isRequired,
};

export default RelatedProducts;
