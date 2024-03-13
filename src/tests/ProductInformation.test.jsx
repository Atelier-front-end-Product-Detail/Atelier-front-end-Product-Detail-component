import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductInformation from '../components/productDetails/ProductInformation';

import '@testing-library/jest-dom';

// test  product
describe('ProductInformation', () => {
  const product = {
    name: 'Windmate Traveler',
    category: 'Jackets',
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
    render(<ProductInformation product={product} style={style} reviewsMeta={reviewsMeta} />);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    // Use a regex matcher with a case-insensitive flag for flexibility
    expect(screen.getByText(/jacket in varying styles and materials/i)).toBeInTheDocument();
  });

  it('renders product prices correctly', () => {
    render(<ProductInformation product={product} style={style} reviewsMeta={reviewsMeta} />);

    expect(screen.getByText(`$${style.sale_price}`)).toBeInTheDocument();
    expect(screen.getByText(`$${style.original_price}`, { style: { textDecoration: 'line-through' } })).toBeInTheDocument();
  });

  // test for stars based on reviews
  it('renders the correct star rating', () => {
    const { container } = render(
      <ProductInformation product={product} style={style} reviewsMeta={reviewsMeta} />,
    );

    // Check if the star rating wrapper is rendered
    const starRatingWrapper = container.querySelector('.star-rating-wrapper');
    expect(starRatingWrapper).toBeInTheDocument();

    const expectedWidthPercentage = (((1 * 1 + 2 * 2 + 3 * 3 + 4
       * 4 + 5 * 5) / (1 + 2 + 3 + 4 + 5)) / 5) * 100;
    const rounded = Math.round(expectedWidthPercentage / 5) * 5;
    const fullStars = container.querySelector('.full-stars');
    expect(fullStars).toHaveStyle(`width: ${rounded}%`);
  });
});
