import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddReviewModal from '../../components/RatingsAndReviews/AddReviewModal';

jest.mock('../../components/RatingsAndReviews/AddReviewModal.css', () => ({}));
jest.mock('../../components/RatingsAndReviews/StarRating.css', () => ({}));

describe('AddReviewModal', () => {
  const mockHandleShowModal = jest.fn();
  const mockHandleAddReview = jest.fn();
  const mockReviewsMeta = {
    characteristics: {
      Size: { id: 1 },
      Comfort: { id: 2 },
    },
  };

  const renderComponent = () => render(
    <AddReviewModal
      handleShowModal={mockHandleShowModal}
      showAddReviewModal
      handleAddReview={mockHandleAddReview}
      productId={1}
      reviewsMeta={mockReviewsMeta}
      productName="Test Product"
    />,
  );

  it('renders the AddReviewModal component', () => {
    const { getByText, getByLabelText } = renderComponent();

    expect(getByText('Write Your Review')).toBeTruthy();
    expect(getByText('About the Test Product')).toBeTruthy();
    expect(getByLabelText('Overall rating:*')).toBeTruthy();
    expect(getByLabelText('Do you recommend this product?*')).toBeTruthy();
    expect(getByLabelText('Review summary:*')).toBeTruthy();
    expect(getByLabelText('Review body:*')).toBeTruthy();
    expect(getByLabelText('What is your nickname?*')).toBeTruthy();
    expect(getByLabelText('Your email:*')).toBeTruthy();
    expect(getByText('Submit Review')).toBeTruthy();
    expect(getByText('X')).toBeTruthy();
  });

  it('displays error when rating is not selected', () => {
    const { getByText } = renderComponent();

    // Submit form without selecting a rating
    fireEvent.click(getByText('Submit Review'));

    // Message rendered on screen
    expect(getByText('*Please select a star rating before submitting.')).toBeTruthy();
  });

  it('handles modal closure', () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText('X'));

    expect(mockHandleShowModal).toHaveBeenCalledWith(false);
  });

  it('submits the form with valid data and selected rating', () => {
    const { getByLabelText, getByText } = renderComponent();

    // select rating
    fireEvent.click(document.querySelector('.star.interactive'));
    // Select recommendation
    fireEvent.click(getByLabelText('Yes'));

    fireEvent.change(getByLabelText('Review summary:*'), { target: { value: 'Test summary' } });
    fireEvent.change(getByLabelText('Review body:*'), { target: { value: 'Test review body with more than 50 characters, blah' } });
    fireEvent.change(getByLabelText('What is your nickname?*'), { target: { value: 'TestNick' } });
    fireEvent.change(getByLabelText('Your email:*'), { target: { value: 'test@email.com' } });

    // Select value "2" for "Size"
    const sizeRadio = document.querySelector('input[name="Size"][value="2"]');
    fireEvent.click(sizeRadio);

    // Select value "3" for "Comfort"
    const comfortRadio = document.querySelector('input[name="Comfort"][value="4"]');
    fireEvent.click(comfortRadio);

    // Submit form
    fireEvent.click(getByText('Submit Review'));

    // Expect handleAddReview to be called with the data
    expect(mockHandleAddReview).toHaveBeenCalledWith(expect.objectContaining({
      rating: expect.any(Number),
      recommend: true,
      summary: 'Test summary',
      body: 'Test review body with more than 50 characters, blah',
      name: 'TestNick',
      email: 'test@email.com',
      characteristics: {
        1: 2,
        2: 4,
      },
    }));
  });
});
