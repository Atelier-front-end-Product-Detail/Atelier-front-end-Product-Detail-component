import Overview from './ProductDetails/Overview.jsx';
import React, {useState, useEffect} from 'react';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx'
import axios from 'axios';



const App = () => {

  const [productId, setProductId] = useState(0);

  const bridge = {
    listProducts: (page = null, count = null) => axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/',
      headers: {'Authorization': process.env.GIT_API_KEY},
      params: {page, count}
    }),
    productInformation: (product_id) => axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product_id}/`,
      headers: {'Authorization': process.env.GIT_API_KEY}
    }),
    productStyles: (product_id) => axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product_id}/styles/`,
      headers: {'Authorization': process.env.GIT_API_KEY}
    }),
    relatedProducts: (product_id) => axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product_id}/related/`,
      headers: {'Authorization': process.env.GIT_API_KEY}
    }),
    listReviews: (product_id, page = null, count = null, sort = null) => axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/`,
      headers: {'Authorization': process.env.GIT_API_KEY},
      params: {product_id, page, count, sort}
    }),
    reviewsMeta: (product_id) => axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/`,
      headers: {'Authorization': process.env.GIT_API_KEY},
      params: {product_id}
    }),
    // addReview still needs work!!!
    // addReview: (product_id, rating = 0, summary = '', body = '', recommend = false, name = '', email = '', photos = '', characteristics = {}) => axios({
    //   method: 'post',
    //   url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`,
    //   headers: {'Authorization': process.env.GIT_API_KEY},
    //   params: {product_id, rating, summary, body, recommend, name, email, photos, characteristics}
    // }),
    markReviewHelpful: (review_id) => axios({
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`,
      headers: {'Authorization': process.env.GIT_API_KEY},
      params: {review_id}
    }),
  };

  // FOR TESTING
  // ------------------------------------------
  const [results, setResults] = useState(null);

  useEffect(() => {
    console.log(`api key = ${process.env.GIT_API_KEY}`);
    bridge.listReviews(40355)
    .then(results => {
      setResults(results);
    });
  }, [productId]);

  useEffect(() => console.log(JSON.stringify(results)), [results]);
  // ------------------------------------------

  // SETTING STATE FOR PRODUCTID

  useEffect(() => {
    bridge.listProducts()
    .then(results => setProductId(results.data[0].id))
    .catch(error => console.log(`Error: ${error}`));
  }, []);


  return (
    <div>
      HELLO =D
      {/* Insert your component here */}
        <Overview />
        {/* <RelatedItems product_id={40344}/> */}
        <RatingsAndReviews product_id={40345} bridge={bridge}/>

    </div>
  );
};

export default App;