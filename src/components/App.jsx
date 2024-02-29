import React, {useState, useEffect} from 'react';
import RelatedItems from './relatedItems/RelatedItems.jsx';


const App = () => {

  const [productId, setProductId] = useState(0);

  return (
    <div>
      HELLO =D
      {/* Insert your component here */}
        <RelatedItems product_id={40344}/>
    </div>
  );
};

export default App;