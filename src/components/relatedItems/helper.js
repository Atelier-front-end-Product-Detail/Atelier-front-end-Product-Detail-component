import bridge from '../bridge';

const helper = {
  getProductInfo: async (productId) => {
    const productInformation = {};
    if (productId) {
      const [
        productInfo,
        productStyles,
        productRelatedProducts,
        productMeta,
        // productReviews,
        // productQuestions,
      ] = await Promise.all([
        bridge.productInformation(productId),
        bridge.productStyles(productId),
        bridge.relatedProducts(productId),
        bridge.reviewsMeta(productId),
        // bridge.listReviews(productId),
        // bridge.questions(productId),
      ]);
      productInformation.info = { ...productInfo.data };
      productInformation.styles = productStyles.data;
      productInformation.relatedProducts = productRelatedProducts.data;
      productInformation.meta = productMeta.data;
      // productInformation.reviews = productReviews.data;
      // productInformation.questions = productQuestions.data;
    }
    return productInformation;
  },

  getItemsProductInfo: async (ArrayOfRelatedItems) => {
    const relatedPromises = ArrayOfRelatedItems.map(async (item) => {
      const [productInfo, productStyles, productMeta] = await Promise.all([
        bridge.productInformation(item),
        bridge.productStyles(item),
        bridge.reviewsMeta(item),
      ]);
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