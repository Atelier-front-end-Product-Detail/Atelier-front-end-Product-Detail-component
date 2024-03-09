import React, { useState, useEffect } from 'react';
import Overview from './productDetails/Overview';
import RelatedItems from './relatedItems/RelatedItems';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import bridge from './bridge';

function App() {
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState(null);

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
      .then((results) => {
        setProductId(results.data[0].id);
        setProductName(results.data[productId].name);
      });
  }, []);

  return !productId
    ? (
      <div>...Loading</div>
    )
    : (
      <div>
        <Overview productId={productId} bridge={bridge} />
        <RelatedItems productId={productId} bridge={bridge} setProductId={setProductId} />
        <QuestionsAnswers bridge={bridge} productId={productId} productName={productName} />
        <RatingsAndReviews productId={productId} bridge={bridge} productName={productName} />
      </div>
    );
}

export default App;
