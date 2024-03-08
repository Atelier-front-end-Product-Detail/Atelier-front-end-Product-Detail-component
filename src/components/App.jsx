import React, { useState, useEffect } from 'react';
import Overview from './productDetails/Overview';
import RelatedItems from './relatedItems/RelatedItems';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import bridge from './bridge';

function App() {
  const [productId, setProductId] = useState(0);

  // ------------------------------------------
  // FOR TESTING
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
      .then((results) => setProductId(results.data[0].id));
  }, []);

  return !productId
    ? (
      <div>...Loading</div>
    )
    : (
      <div>
        <Overview bridge={bridge} />
        <RelatedItems
          productId={productId}
          setProductId={setProductId}
        />
        <QuestionsAnswers bridge={bridge} productId={productId} />
        <RatingsAndReviews productId={productId} bridge={bridge} />
      </div>
    );
}

export default App;
