import React from 'react';
import RelatedProductCard from './RelatedProductCard.jsx'; // Ensure the path is correct

function RelatedProducts({ relatedProducts, bridge }) {
  return (
    <div>
      {relatedProducts.map(product_id => <RelatedProductCard product_id={product_id} bridge={bridge} key={product_id}/>)}
    </div>
  );
}

export default RelatedProducts;
