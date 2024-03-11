import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddReviewModal from '../components/RatingsAndReviews/AddReviewModal';

jest.mock('../components/RatingsAndReviews/AddReviewModal.css', () => ({}));
jest.mock('../components/RatingsAndReviews/StarRating.css', () => ({}));


describe('AddReviewModal', () => {
  const mockHandleShowModal = jest.fn();
  const mockHandleAddReview = jest.fn();
  const mockReviewsMeta = {
    characteristics: {
      Size: { id: 1 },
      Comfort: { id: 2 },
    },
  };

  const renderComponent = () => {
    return render(
      <AddReviewModal
        handleShowModal={mockHandleShowModal}
        showAddReviewModal={true}
        handleAddReview={mockHandleAddReview}
        productId={1}
        reviewsMeta={mockReviewsMeta}
        productName="Test Product"
      />
    );
  };

  it('renders the AddReviewModal component', () => {
    const { getByText, getByLabelText } = renderComponent();

    expect(getByText('Write Your Review')).toBeTruthy();
    expect(getByText('About the Test Product')).toBeTruthy();
    // expect(getByLabelText('Overall rating:*')).toBeTruthy();
    // expect(getByLabelText('Do you recommend this product?*')).toBeTruthy();
    // expect(getByLabelText('Review summary:*')).toBeTruthy();
    // expect(getByLabelText('Review body:*')).toBeTruthy();
    // expect(getByLabelText('What is your nickname?*')).toBeTruthy();
    // expect(getByLabelText('Your email:*')).toBeTruthy();
    // expect(getByLabelText('Add Photos:')).toBeTruthy();
    expect(getByText('Submit Review')).toBeTruthy();
    expect(getByText('X')).toBeTruthy();
  });

  it('displays error when rating is not selected', () => {
    const { getByText } = renderComponent();

    // Submit form without selecting a rating
    fireEvent.click(getByText('Submit Review'));

    // Expect error message to be rendered
    expect(getByText('*Please select a star rating before submitting.')).toBeTruthy();
  });

  it('handles modal closure', () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText('X'));

    expect(mockHandleShowModal).toHaveBeenCalledWith(false);
  });
});
