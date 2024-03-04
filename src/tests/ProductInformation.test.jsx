import React from 'react';
import { render } from '@testing-library/react';
import ProductInformation from '../components/productDetails/ProductInformation';

// test product
describe('ProductInformation', () => {
  const product = {
    category: 'Jackets',
    name: 'Windmate Traveler',
    description: 'jacket in varying styles and materials.',
  };
  const style = {
    original_price: '3450',
    sale_price: '3400',
  };
  const reviewsMeta = {
    ratings: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
    },
  };

  // should show pertinent data
  it('renders product name, category, and description', () => {
    const { getByText } = render(
      <ProductInformation product={product} style={style} reviewsMeta={reviewsMeta} />,
    );

    expect(getByText(product.name)).not.toBeNull();
    expect(getByText(product.category)).not.toBeNull();
    expect(getByText(product.description)).not.toBeNull();
  });

  it('renders product prices correctly', () => {
    const { getByText } = render(
      <ProductInformation product={product} style={style} reviewsMeta={reviewsMeta} />,
    );

    expect(getByText(`$${style.sale_price}`)).not.toBeNull();
    expect(getByText(`$${style.original_price}`)).not.toBeNull();
  });

  // test for stars based on reviews
  it('renders the correct star rating', () => {
    const { container } = render(
      <ProductInformation product={product} style={style} reviewsMeta={reviewsMeta} />,
    );

    // get text content (star emojis) of rating
    const starRatingText = container.querySelector('.star-rating').textContent;
    // use jest matchers to check content
    expect(starRatingText).toContain('★★★¾☆');
  });
});
