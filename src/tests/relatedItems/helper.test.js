// Ensure jest.mock is at the top of your file, before any imports that use the mocked module
import helper from '../../components/relatedItems/helper';
import 'dotenv/config';

// jest.mock('../../components/bridge', () => {
//   const mockBridge = require('./mockBridge'); // Adjust the path as necessary
//   return {
//     __esModule: true,
//     default: mockBridge,
//   };
// });

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
