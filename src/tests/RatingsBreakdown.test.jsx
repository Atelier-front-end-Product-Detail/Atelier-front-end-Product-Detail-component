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

  const starFilters = {
    5: false,
    4: false,
    3: false,
    2: false,
    1: false,
  };

  // render component with mock data
  it('renders RatingBreakdown with ratings, characterstics and recommended', () => {
    const { queryByText } = render(
      <RatingsBreakdown reviewsMeta={reviewsMeta} starFilters={starFilters} />,
    );

    // expect these values to be in the document
    // expect(getByText('Average Rating')).toBeInTheDocument();

    // expect(queryByText('30 reviews')).toBeInTheDocument();
    // expect(queryByText('100% of people recommend this product')).toBeInTheDocument();
    // expect(queryByText('5 star')).toBeInTheDocument();
    // expect(queryByText('4 star')).toBeInTheDocument();
    // expect(queryByText('3 star')).toBeInTheDocument();
    // expect(queryByText('2 star')).toBeInTheDocument();
    // expect(queryByText('1 star')).toBeInTheDocument();
    // expect(queryByText('Quality')).toBeInTheDocument();
    // expect(queryByText('Size')).toBeInTheDocument();


    expect(queryByText('30 reviews')).toBeTruthy();
    expect(queryByText('100% of people recommend this product')).toBeTruthy();
    expect(queryByText('5 star')).toBeTruthy();
    expect(queryByText('4 star')).toBeTruthy();
    expect(queryByText('3 star')).toBeTruthy();
    expect(queryByText('2 star')).toBeTruthy();
    expect(queryByText('1 star')).toBeTruthy();
    expect(queryByText('Quality')).toBeTruthy();
    expect(queryByText('Size')).toBeTruthy();
  });
});
