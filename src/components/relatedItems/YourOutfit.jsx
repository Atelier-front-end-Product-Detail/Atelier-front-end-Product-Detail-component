import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddItemToOutfit from './AddItemToOutfit';
import RelatedProductCard from './RelatedProductCard';

function YourOutfit({ productId, bridge, setProductId }) {
  const [userOutfit, setUserOutfit] = useState([]);

  useEffect(() => {
    const storedOutfit = JSON.parse(localStorage.getItem('fecYourOutfit')) || [];
    setUserOutfit(storedOutfit);
  }, []);

  return (
    <div>
      <div>
        Your Outfit Here:
        {' '}
        {JSON.stringify(userOutfit)}
      </div>
      <div id="your_outfit">
        <AddItemToOutfit
          productId={productId}
          userOutfit={userOutfit}
          setUserOutfit={setUserOutfit}
        />
        {userOutfit.map((item) => <RelatedProductCard productId={item} bridge={bridge} setProductId={setProductId} key={`yo ${item}`} />)}
      </div>
    </div>
  );
}

export default YourOutfit;
