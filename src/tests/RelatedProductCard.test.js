import {render, fireEvent, screen} from '@testing-library/react';
import RelatedProductCard from '../components/relatedItems/RelatedProductCard.jsx';
import bridge from '../components/bridge.js';

describe('RelatedProductCard', () => {
  it("should have img elements revert to src 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' if no image is available", () => {
    const {getAllByRole} = render(<RelatedProductCard product_id={40344} bridge ={bridge}/>);
    const images = getAllByRole('img');
    images.forEach(image => {
      fireEvent.error(image);
      expect(image.src).toEqual('https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg');
    });
  });
});