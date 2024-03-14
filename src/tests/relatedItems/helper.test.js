import helper from '../../components/relatedItems/helper';
import 'dotenv/config';

describe('helper', () => {
  describe('getProductInfo', () => {
    it('fetches product information and aggregates results', async () => {
      const productId = 40344;
      const productInfo = await helper.getProductInfo(productId);

      expect(productInfo).toBeDefined();
      expect(productInfo.info).toEqual(expect.objectContaining({ id: productId, name: 'Camo Onesie', slogan: 'Blend in to your crowd' }));
      expect(productInfo.styles).toBeDefined();
      expect(productInfo.relatedProducts).toBeDefined();
      expect(productInfo.meta).toBeDefined();
    });
  });
});
