import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import RelatedProductCard from './RelatedProductCard';
import ComparisonModal from './ComparisonModal';

function RelatedProducts({
  relatedItems,
  bridge,
  setProductId,
  productId,
}) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [relatedItem, setRelatedItem] = useState(0);

  const relatedProductCardWidthPlusGap = 270;

  const action = (id) => {
    setRelatedItem(relatedItem === id ? 0 : id);
  };

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
    <div id="related_products_outer_div">
      {showLeftArrow && (
      <div
        role="button"
        className="related_products_left_arrow_button"
        onClick={scrollLeft}
        onKeyPress={handleKeyPressScrollLeft}
        aria-label="Scroll left"
        tabIndex="0"
      >
        <FaArrowAltCircleLeft />
      </div>
      )}
      {showRightArrow && (
      <div
        role="button"
        className="related_products_right_arrow_button"
        onClick={scrollRight}
        onKeyPress={handleKeyPressScrollRight}
        aria-label="Scroll left"
        tabIndex="0"
      >
        <FaArrowAltCircleRight />
      </div>
      )}
      <div id="related_products" ref={scrollContainerRef}>
        {relatedItems.map((itemId) => (
          <RelatedProductCard
            productId={itemId}
            bridge={bridge}
            key={`rpc ${itemId}`}
            setProductId={setProductId}
            type="related products"
            action={action}
          />
        ))}
      </div>
      {relatedItem
        ? (
          <ComparisonModal
            bridge={bridge}
            relatedItem={relatedItem}
            productId={productId}
          />
        )
        : null }
    </div>
  );
}

RelatedProducts.propTypes = {
  productId: PropTypes.number.isRequired,
  relatedItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  bridge: PropTypes.shape({}).isRequired,
  setProductId: PropTypes.func.isRequired,
};

export default RelatedProducts;
