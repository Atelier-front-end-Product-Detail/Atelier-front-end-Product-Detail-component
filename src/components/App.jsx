import React, { useState, useEffect } from 'react';
import Overview from './productDetails/Overview';
import RelatedItems from './relatedItems/RelatedItems';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import bridge from './bridge.js';

function App() {
  const [productId, setProductId] = useState(0);
  const [productInfo, setProductInfo] = useState(null);
  const [productStyles, setProductStyles] = useState(null);
  const [reviewsMeta, setReviewsMeta] = useState(null);

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
      .then((results) => setProductId(results.data[0].id))
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  useEffect(() => {
    if (productId) {
      bridge.productInformation(productId)
        .then((response) => setProductInfo(response.data))
        .catch((error) => console.error('error fetching product information:', error));

      bridge.productStyles(productId)
        .then((response) => setProductStyles(response.data))
        .catch((error) => console.error('error fetching product styles:', error));

      bridge.reviewsMeta(productId)
        .then((response) => setReviewsMeta(response.data))
        .catch((error) => console.error('error fetching reviews metadata:', error));
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
      <RelatedItems productId={productId} bridge={bridge} setProductId={setProductId} />
      <QuestionsAnswers bridge={bridge} />
      <RatingsAndReviews productId={40345} bridge={bridge} />
    </div>
  );
}

export default App;
