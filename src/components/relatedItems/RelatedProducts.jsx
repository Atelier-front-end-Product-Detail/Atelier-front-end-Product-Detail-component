import React from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

function RelatedProducts({relatedItems, bridge, setProductId}) {
  return (
    <div id='related_products'>
      {relatedItems.map(product_id => <RelatedProductCard product_id={product_id} bridge={bridge} key={product_id} setProductId={setProductId}/>)}
    </div>
  );
}

export default RelatedProducts;
