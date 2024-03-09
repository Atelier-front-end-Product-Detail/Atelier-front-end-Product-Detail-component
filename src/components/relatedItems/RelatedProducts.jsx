import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import RelatedProductCard from './RelatedProductCard';
import ComparisonModal from './ComparisonModal';
import helper from './helper';

function RelatedProducts({
  relatedItems,
  setProductId,
  productInfo,
}) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [relatedItem, setRelatedItem] = useState({});
  const [relatedProductsInfo, setRelatedProductsInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const info = await helper.getItemsProductInfo(relatedItems);
      setRelatedProductsInfo(info);
    };
    fetchData();
  }, [relatedItems]);

  const relatedProductCardWidthPlusGap = 270;

  const action = (id) => {
    setRelatedItem(relatedItem === id ? {} : id);
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
    if (!container) return undefined;
    container.addEventListener('scroll', checkScrollButtons);

    return () => {
      container.removeEventListener('scroll', checkScrollButtons);
    };
  });

  return (
    <div id="related_products_outer_div">
      {relatedProductsInfo && relatedProductsInfo.length ? <div id="related_products_label">RELATED PRODUCTS</div> : null}
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
        {relatedProductsInfo.map((item) => (
          <RelatedProductCard
            productId={item.info.id}
            key={`rpc ${item.info.id}`}
            setProductId={setProductId}
            type="related products"
            action={action}
            productInformation={item}
          />
        ))}
      </div>
      {(relatedItem && JSON.stringify(relatedItem) !== '{}')
        ? (
          <ComparisonModal
            relatedItem={relatedItem}
            productInfo={productInfo}
          />
        )
        : null }
    </div>
  );
}

RelatedProducts.propTypes = {
  relatedItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  setProductId: PropTypes.func.isRequired,
  productInfo: PropTypes.shape({}).isRequired,
};

export default RelatedProducts;
