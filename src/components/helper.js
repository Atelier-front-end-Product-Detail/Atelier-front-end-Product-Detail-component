import bridge from './bridge';

const helper = {
  getProductInfo: async (productId) => {
    const productInformation = {};
    if (productId) {
      const productInfo = await bridge.productInformation(productId);
      const productStyles = await bridge.productStyles(productId);
      const productRelatedProducts = await bridge.relatedProducts(productId);
      const productReviews = await bridge.listReviews(productId);
      const productMeta = await bridge.reviewsMeta(productId);
      const productQuestions = await bridge.questions(productId);
      productInformation.info = { ...productInfo.data };
      productInformation.styles = productStyles.data;
      productInformation.relatedProducts = productRelatedProducts.data;
      productInformation.reviews = productReviews.data;
      productInformation.meta = productMeta.data;
      productInformation.questions = productQuestions.data;
    }
    return productInformation;
  },

  getItemsProductInfo: async (relatedItems) => {
    const relatedPromises = relatedItems.map(async (item) => {
      const productInfo = await bridge.productInformation(item);
      const productStyles = await bridge.productStyles(item);
      const productMeta = await bridge.reviewsMeta(item);

      const combinedResult = {
        info: productInfo.data,
        styles: productStyles.data,
        meta: productMeta.data,
      };

      return combinedResult;
    });

    return Promise.all(relatedPromises);
  },
};

export default helper;
