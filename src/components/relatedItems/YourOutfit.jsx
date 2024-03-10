import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import AddItemToOutfit from './AddItemToOutfit';
import RelatedProductCard from './RelatedProductCard';
import helper from './helper';

function YourOutfit({
  productId,
  setProductId,
  productInfo,
}) {
  const [userOutfit, setUserOutfit] = useState([]);
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [outfitProductsInfo, setOutfitProductsInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const info = await helper.getItemsProductInfo(JSON.parse(localStorage.getItem('fecYourOutfit')));
      setOutfitProductsInfo(info);
      setUserOutfit(JSON.parse(localStorage.getItem('fecYourOutfit')));
    };
    fetchData();
  }, []);

  const relatedProductCardWidthPlusGap = 270;

  const addToOutfit = () => {
    if (outfitProductsInfo.some((product) => product.info.id === productId)) return;
    setOutfitProductsInfo([...outfitProductsInfo, productInfo]);
    if (userOutfit.some((product) => product === productId)) return;
    setUserOutfit([...userOutfit, productId]);
    localStorage.setItem('fecYourOutfit', JSON.stringify([...userOutfit, productId]));
  };

  const action = (id) => {
    const newOutfitProductsInfo = [...outfitProductsInfo];
    let index = newOutfitProductsInfo.indexOf(id);
    if (index < 0) {
      return;
    }
    newOutfitProductsInfo.splice(index, 1);
    setOutfitProductsInfo(newOutfitProductsInfo);

    const newUserOutfit = [...userOutfit];
    index = newUserOutfit.indexOf(id.info.id);
    if (index < 0) {
      return;
    }
    newUserOutfit.splice(index, 1);
    localStorage.setItem('fecYourOutfit', JSON.stringify(newUserOutfit));
    setUserOutfit(newUserOutfit);
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const currentScroll = container.scrollLeft;
      const remainder = (currentScroll + 31) % relatedProductCardWidthPlusGap;
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
          (currentScroll + 31) % relatedProductCardWidthPlusGap
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
  }, [userOutfit]);

  useEffect(() => {
    const storedOutfit = JSON.parse(localStorage.getItem('fecYourOutfit')) || [];
    setUserOutfit(storedOutfit);
  }, []);

  return (
    <div id="your_outfit_outer_div">
      <div id="your_outfit_label">YOUR OUTFIT</div>
      {showLeftArrow && (
      <div
        role="button"
        className="your_outfit_left_arrow_button"
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
        className="your_outfit_right_arrow_button"
        onClick={scrollRight}
        onKeyPress={handleKeyPressScrollRight}
        aria-label="Scroll left"
        tabIndex="0"
      >
        <FaArrowAltCircleRight />
      </div>
      )}
      <div id="your_outfit" ref={scrollContainerRef}>
        <AddItemToOutfit
          addToOutfit={addToOutfit}
        />
        {outfitProductsInfo.map((item) => (
          <RelatedProductCard
            productId={item.info.id}
            setProductId={setProductId}
            key={`yo ${item.info.id}`}
            type="your outfit"
            action={action}
            productInformation={item}
          />
        ))}
      </div>
    </div>
  );
}

YourOutfit.propTypes = {
  productId: PropTypes.number.isRequired,
  setProductId: PropTypes.func.isRequired,
  productInfo: PropTypes.shape({}).isRequired,
};

export default YourOutfit;
