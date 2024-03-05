import React from 'react';
import { render } from '@testing-library/react';
import RatingsBreakdown from '../components/RatingsAndReviews/RatingsBreakdown';

// mock CSS file, otherwise there is error
jest.mock('../components/RatingsAndReviews/RatingsBreakdown.css', () => ({}));

describe('RatingsBreakdown', () => {
  // create sample data
  const reviewsMeta = {
    ratings: {
      5: 10,
      4: 5,
      3: 3,
      2: 2,
      1: 10,
    },
    characteristics: {
      Quality: { value: 4 },
      Size: { value: 3 },
    },
    recommended: {
      true: 30,
    },
  };

  // render component with mock data
  it('renders component with ratings, characterstics and recommended', () => {
    const { getByText } = render(
      <RatingsBreakdown reviewsMeta={reviewsMeta} />,
    );

    // expect these values to be in the document
    expect(getByText('Average Rating')).toBeInTheDocument();
    expect(getByText('30 reviews')).toBeInTheDocument();
    expect(getByText('100% of people recommend this product')).toBeInTheDocument();
    expect(getByText('5 star')).toBeInTheDocument();
    expect(getByText('4 star')).toBeInTheDocument();
    expect(getByText('3 star')).toBeInTheDocument();
    expect(getByText('2 star')).toBeInTheDocument();
    expect(getByText('1 star')).toBeInTheDocument();
    expect(getByText('Quality')).toBeInTheDocument();
    expect(getByText('Size')).toBeInTheDocument();
  });
});
