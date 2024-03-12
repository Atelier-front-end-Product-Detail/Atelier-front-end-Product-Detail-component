import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import RatingsAndReviews from '../../components/RatingsAndReviews/RatingsAndReviews';

// mock CSS file, otherwise there is error
jest.mock('../../components/RatingsAndReviews/RatingsAndReviews.css', () => ({}));

jest.mock('../../components/RatingsAndReviews/RatingsBreakdown', () => ({
  __esModule: true,
  default: () => <div>RatingsBreakdown Component</div>,
}));

jest.mock('../../components/RatingsAndReviews/ReviewsView', () => ({
  __esModule: true,
  default: () => <div>ReviewsView Component</div>,
}));

// Mock API, promise resolve to use .thens
const mockBridge = {
  reviewsMeta: jest.fn(() => Promise.resolve({ data: {} })),
};

describe('RatingsAndReviews', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders RatingsAndReviews component', async () => {
    render(
      <RatingsAndReviews
        bridge={mockBridge}
        productId={123}
        productName="Test Product"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Ratings & Reviews')).toBeTruthy();
      expect(screen.getByText('RatingsBreakdown Component')).toBeTruthy();
      expect(screen.getByText('ReviewsView Component')).toBeTruthy();
    });
  });

  it('fetches reviews metadata on component mount', async () => {
    render(
      <RatingsAndReviews
        bridge={mockBridge}
        productId={1}
        productName="Test Product"
      />,
    );

    await waitFor(() => {
      expect(mockBridge.reviewsMeta).toHaveBeenCalledWith(1);
    });
  });
});
