import axios from 'axios';

const bridge = {
  listProducts: (page = null, count = null) => axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/',
    headers: { Authorization: process.env.GIT_API_KEY },
    params: { page, count },
  }),
  productInformation: (productId) => axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/`,
    headers: { Authorization: process.env.GIT_API_KEY },
  }),
  productStyles: (productId) => axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/styles/`,
    headers: { Authorization: process.env.GIT_API_KEY },
  }),

  getCart: () => axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
    headers: { Authorization: process.env.GIT_API_KEY },
  }),

  // Add an item to the cart
  addToCart: (skuId) => axios({
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
    headers: { Authorization: process.env.GIT_API_KEY },
    data: { sku_id: skuId },
  }),

  relatedProducts: (productId) => axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/related/`,
    headers: { Authorization: process.env.GIT_API_KEY },
  }),
  listReviews: (productId, page = null, count = null, sort = null) => axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/',
    headers: { Authorization: process.env.GIT_API_KEY },
    params: {
      product_id: productId,
      page,
      count,
      sort,
    },
  }),
  reviewsMeta: (productId) => axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/',
    headers: { Authorization: process.env.GIT_API_KEY },
    params: { product_id: productId },
  }),
  addReview: (data) => axios({
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
    headers: { Authorization: process.env.GIT_API_KEY },
    data: {
      product_id: data.product_id,
      rating: data.rating,
      summary: data.summary,
      body: data.body,
      recommend: data.recommend,
      name: data.name,
      email: data.email,
      photos: data.photos,
      characteristics: data.characteristics,
    },
  }),
  markReviewHelpful: (reviewId) => axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${reviewId}/helpful`,
    headers: { Authorization: process.env.GIT_API_KEY },
    params: { reviewId },
  }),
  reportReview: (reviewId) => axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${reviewId}/report`,
    headers: { Authorization: process.env.GIT_API_KEY },
    params: { reviewId },
  }),
  questions: (productid, count = 100) => axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/',
    headers: { Authorization: process.env.GIT_API_KEY },

    params: { product_id: productid, count },

  }),
  answers: (questionid, count = 100) => axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionid}/answers`,
    headers: { Authorization: process.env.GIT_API_KEY },
    params: { question_id: questionid, count },
  }),
  putQuestionHelpful: (questionid) => axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionid}/helpful`,
    headers: { Authorization: process.env.GIT_API_KEY },
    params: { question_id: questionid },
  }),
  putAnswerHelpful: (answerid) => axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answerid}/helpful`,
    headers: { Authorization: process.env.GIT_API_KEY },
    params: { answer_id: answerid },
  }),
  postQuestion: (data) => axios({
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
    headers: { Authorization: process.env.GIT_API_KEY },
    data: {
      body: data.body,
      name: data.name,
      email: data.email,
      product_id: Number(data.productid),
    },
  }),
  postAnswer: (questionid, data) => axios({
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionid}/answers`,
    headers: { Authorization: process.env.GIT_API_KEY },
    data: {
      body: data.body,
      name: data.name,
      email: data.email,
      photos: data.photos,
    },
  }),
  reportQuestion: (questionid) => axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionid}/report`,
    headers: { Authorization: process.env.GIT_API_KEY },
    params: { question_id: questionid },
  }),
  reportAnswer: (answerid) => axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answerid}/report`,
    headers: { Authorization: process.env.GIT_API_KEY },
    params: { answer_id: answerid },
  }),
  QAInteractionLog: (data) => axios({
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/interactions',
    headers: { Authorization: process.env.GIT_API_KEY },
    data: {
      element: data.element,
      widget: data.widget,
      time: data.time,
    },
  }),

};

export default bridge;
