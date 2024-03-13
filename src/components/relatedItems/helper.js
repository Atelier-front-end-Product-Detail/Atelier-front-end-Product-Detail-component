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
      ] = await Promise.all([
        bridge.productInformation(productId),
        bridge.productStyles(productId),
        bridge.relatedProducts(productId),
        bridge.reviewsMeta(productId),
      ]);
      productInformation.info = { ...productInfo.data };
      productInformation.styles = productStyles.data;
      productInformation.relatedProducts = productRelatedProducts.data;
      productInformation.meta = productMeta.data;
    }
    return productInformation;
  },

  getItemsProductInfo: async (ArrayOfRelatedItems) => {
    if (ArrayOfRelatedItems) {
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
    }
    return null;
  },
};

export default helper;
