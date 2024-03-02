import Overview from './productDetails/Overview.jsx';
import React, {useState, useEffect} from 'react';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx'
import axios from 'axios';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx'



const App = () => {

  const [productId, setProductId] = useState(0);
  const [productInfo, setProductInfo] = useState(null);
  const [productStyles, setProductStyles] = useState(null);
  const [reviewsMeta, setReviewsMeta] = useState(null);

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
    questionsAnswers: (product_id, page = null, count = null) => axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/`,
      headers: {'Authorization': process.env.GIT_API_KEY},
      params: {product_id}
    })
  };

  // FOR TESTING
  // ------------------------------------------
  // const [results, setResults] = useState(null);

  // useEffect(() => {
  //   console.log(`api key = ${process.env.GIT_API_KEY}`);
  //   bridge.listReviews(40355)
  //   .then(results => {
  //     setResults(results);
  //   bridge.reviewsMeta(40355)
  //   bridge.questionsAnswers(40355)
  //   .then(results => {
  //     setResults(results.data);
  //     // setResults(results);
  //     console.log(results.data)
  //   });
  // }, [productId]);

  // useEffect(() => console.log(JSON.stringify(results)), [results]);
  // ------------------------------------------

  // SETTING STATE FOR PRODUCTID

  useEffect(() => {
    bridge.listProducts()
    .then(results => setProductId(results.data[0].id))
    .catch(error => console.log(`Error: ${error}`));
  }, []);

  useEffect(() => {
    if (productId) {
      bridge.productInformation(productId)
        .then(response => setProductInfo(response.data))
        .catch(error => console.error("error fetching product information:", error));

      bridge.productStyles(productId)
        .then(response => setProductStyles(response.data))
        .catch(error => console.error("error fetching product styles:", error));

      bridge.reviewsMeta(productId)
        .then(response => setReviewsMeta(response.data))
        .catch(error => console.error("error fetching reviews metadata:", error));
    }
  }, [productId]);

  return (
    <div>
      HELLO =D
      {/* Insert your component here */}
      {productInfo && productStyles && reviewsMeta ? (
      <Overview product={productInfo} styles={productStyles} reviewsMeta={reviewsMeta} />
      ) : (
        <p>Loading...</p>
      )}
      <RelatedItems product_id={productId} bridge={bridge} setProductId={setProductId}/>
      <QuestionsAnswers bridge={bridge}/>
      <RatingsAndReviews product_id={40345} bridge={bridge}/>
    </div>
  );
};

export default App;