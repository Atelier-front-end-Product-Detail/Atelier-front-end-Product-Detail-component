import React from 'react';
import { render, screen } from '@testing-library/react';
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
    render(<ProductInformation product={product} style={style} reviewsMeta={reviewsMeta} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
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

    // Check if the width style for full stars is correct based on the average rating calculation
    const expectedWidthPercentage = `${(((1 * 1 + 2 * 2 + 3 * 3 + 4 * 4 + 5 * 5) / (1 + 2 + 3 + 4 + 5)) / 5) * 100}%`;
    const fullStars = container.querySelector('.full-stars');
    expect(fullStars).toHaveStyle(`width: ${expectedWidthPercentage}`);
  });
});
