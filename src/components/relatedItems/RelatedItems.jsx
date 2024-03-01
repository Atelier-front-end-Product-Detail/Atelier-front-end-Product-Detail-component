import React, {useState, useEffect} from 'react';
import RelatedProducts from './RelatedProducts.jsx';

const RelatedItems = ({product_id, bridge, setProductId}) => {
  const [relatedItems, setRelatedItems] = useState([])
  useEffect(() => {
    bridge.relatedProducts(product_id)
    .then(results => {
      const resultsSet = new Set();
      let result = results.data.filter(item => {
          if (!resultsSet.has(item)) {
            resultsSet.add(item);
              return true;
          }
          return false;
      });
      console.log(`Result: ${JSON.stringify(result)}`);
      return setRelatedItems(result);
    })
    .catch(error => console.log(`Error: ${error}`));
  }, [product_id]);

  return (
    <div>
      <RelatedProducts relatedItems={relatedItems} bridge ={bridge} setProductId={setProductId}/>
    </div>
  )
}

export default RelatedItems;