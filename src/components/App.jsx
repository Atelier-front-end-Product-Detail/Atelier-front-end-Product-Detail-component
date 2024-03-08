import React, { useState, useEffect } from 'react';
import Overview from './productDetails/Overview';
import RelatedItems from './relatedItems/RelatedItems';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import bridge from './bridge';
import helper from './helper';

function App() {
  const [productId, setProductId] = useState(0);
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) { return; }
      const results = await helper.getProductInfo(productId);
      setProductInfo(results);
    };

    fetchData();
  }, [productId]);

  // ------------------------------------------
  // FOR TESTING
  // UNCOMMENT THE FOLLOWING LINE TO VIEW THE SCTRUCTURE OF THE productInfo object
  // useEffect(() => {
  //   console.log(`productInfo.info : ${JSON.stringify(productInfo.info)}`);
  //   console.log(`productInfo.styles : ${JSON.stringify(productInfo.styles)}`);
  //   console.log(`productInfo.relatedProducts : ${JSON.stringify(productInfo.relatedProducts)}`);
  //   console.log(`productInfo.reviews : ${JSON.stringify(productInfo.reviews)}`);
  //   console.log(`productInfo.meta : ${JSON.stringify(productInfo.meta)}`);
  //   console.log(`productInfo.questions : ${JSON.stringify(productInfo.questions)}`);
  // }, [productInfo]);
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
      .then((results) => setProductId(results.data[0].id));
  }, []);

  return !productId || !productInfo.info
    ? (
      <div>...Loading</div>
    )
    : (
      <div>
        {/* <Overview bridge={bridge} /> */}
        <RelatedItems
          productId={productId}
          setProductId={setProductId}
          productInfo={productInfo}
        />
        {/* <QuestionsAnswers bridge={bridge} productId={productId}/>
        <RatingsAndReviews productId={40347} bridge={bridge} /> */}
      </div>
    );
}

export default App;
