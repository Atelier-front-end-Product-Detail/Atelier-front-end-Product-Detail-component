import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StarRating from '../components/RatingsAndReviews/StarRating';

jest.mock('../components/RatingsAndReviews/StarRating.css', () => ({}));

// function to "parse" individual star spans
// const findStarRatingText = (stars) => Array.from(stars).map(() => '★').join('');

const findStarRatingText = (stars) => {
  const starText = Array.from(stars)
    .map((star) => (star.classList.contains('filled') ? '★' : '☆'))
    .join('');
  // console.log('Actual Star Text:', starText);
  return starText;
};

describe('StarRating', () => {
  it('renders StarRating component with 3 star rating', () => {
    const { getAllByText } = render(<StarRating ratingToDisplay={3} />);
    const stars = getAllByText('★');
    expect(findStarRatingText(stars)).toBe('★★★☆☆');
  });

  it('renders interactive StarRating component and calls onRatingChange when a star is clicked', () => {
    const onRatingChangeMock = jest.fn();
    const { getAllByText } = render(
      <StarRating ratingToDisplay={3} interactive onRatingChange={onRatingChangeMock} />
    );

    const stars = getAllByText('★');
    fireEvent.click(stars[2]);

    expect(onRatingChangeMock).toHaveBeenCalledWith(3);
    expect(findStarRatingText(stars)).toBe('★★★☆☆');
  });

  it('does not allow interaction when no interactive attribute', () => {
    const onRatingChangeMock = jest.fn();
    const { getAllByText } = render(
      <StarRating ratingToDisplay={3} onRatingChange={onRatingChangeMock} />
    );

    const stars = getAllByText('★');
    fireEvent.click(stars[2]);

    expect(onRatingChangeMock).not.toHaveBeenCalled();
  });
});