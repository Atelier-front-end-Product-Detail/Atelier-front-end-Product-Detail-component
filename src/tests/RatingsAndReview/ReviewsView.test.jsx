import React from 'react';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ReviewsView, { ReviewTile } from '../../components/RatingsAndReviews/ReviewsView';

jest.mock('../../components/RatingsAndReviews/ReviewsView.css', () => ({}));

jest.mock('../../components/RatingsAndReviews/StarRating', () => ({
  __esModule: true,
  default: () => <div>StarRating Component Mock</div>,
}));

jest.mock('../../components/RatingsAndReviews/AddReviewModal', () => ({
  __esModule: true,
  default: () => <div>AddReviewModal Component Mock</div>,
}));

// Mock API, resolve to use .thens
const mockBridge = {
  listReviews: jest.fn(() => Promise.resolve({ data: { results: [] } })),
  markReviewHelpful: jest.fn(() => Promise.resolve()),
  reportReview: jest.fn(() => Promise.resolve()),
  addReview: jest.fn(() => Promise.resolve()),
};

const mockReviewsMeta = {
  ratings: {
    1: 10,
    2: 20,
    3: 30,
    4: 40,
    5: 50,
  },
};

describe('ReviewsView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders ReviewsView component', async () => {
    await act(async () => {
      render(
        <ReviewsView
          bridge={mockBridge}
          productId={123}
          starFilters={{}}
          reviewsMeta={mockReviewsMeta}
          removeAllFilters={() => {}}
          productName="Test Product"
        />,
      );
    });

    expect(screen.getByText('Sort by:')).toBeTruthy();
    expect(screen.getByText('Relevant')).toBeTruthy();
  });

  it('handles selection change and fetches data', async () => {
    await act(async () => {
      render(
        <ReviewsView
          bridge={mockBridge}
          productId={1}
          starFilters={{}}
          reviewsMeta={mockReviewsMeta}
          removeAllFilters={() => {}}
          productName="Test Product"
        />,
      );
    });

    act(() => {
      fireEvent.change(screen.getByLabelText('Sort by:'), { target: { value: 'newest' } });
    });

    await waitFor(() => {
      expect(mockBridge.listReviews).toHaveBeenCalledWith(1, 1, expect.any(Number), 'newest');
    });
  });

  // it('handles more reviews click', async () => {
  //   // Mock listReviews + data
  //   mockBridge.listReviews.mockImplementationOnce(() => Promise.resolve({
  //     data: {
  //       results: [
  //       ],
  //     },
  //   }));

  //   await act(async () => {
  //     render(
  //       <ReviewsView
  //         bridge={mockBridge}
  //         productId={1}
  //         starFilters={{}}
  //         reviewsMeta={mockReviewsMeta}
  //         removeAllFilters={() => {}}
  //         productName="Test Product"
  //       />,
  //     );
  //   });

  //   // Click "More Reviews" button
  //   act(() => {
  //     fireEvent.click(screen.getByText('More Reviews'));
  //   });

  //   await waitFor(() => {
  //     expect(mockBridge.listReviews).toHaveBeenCalledWith(1, 1, expect.any(Number), 'relevant');

  //   });
  // });
});

describe('ReviewTile', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const mockFetchAllData = jest.fn();
  const mockHandleShowImageModal = jest.fn();
  const mockSetModalImage = jest.fn();
  const mockShowImageModal = false;
  const mockModalImage = '';

  const mockReview = {
    review_id: 1,
    rating: 5,
    reviewer_name: 'reviewer name',
    date: '2024-03-11',
    summary: 'test summary',
    body: 'Test review body with more than 50 characters, blah',
    recommend: true,
    helpfulness: 2,
    response: '',
    photos: [],
  };

  it('renders ReviewTile', () => {
    const { getByText } = render(
      <ReviewTile
        review={mockReview}
        bridge={mockBridge}
        fetchAllData={mockFetchAllData}
        handleShowImageModal={mockHandleShowImageModal}
        setModalImage={mockSetModalImage}
        modalImage={mockModalImage}
        showImageModal={mockShowImageModal}
      />,
    );

    // expect(getByText('reviewer name')).toBeTruthy();
    expect(getByText('test summary')).toBeTruthy();
    expect(getByText('Yes (2)')).toBeTruthy();
    expect(getByText('Report')).toBeTruthy();
  });
});
