import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import YourOutfit from '../../components/relatedItems/YourOutfit';

describe('YourOutfit', () => {
  let mockProps;
  beforeEach(() => {
    jest.clearAllMocks();
    mockProps = {
      productId: 40345,
      setProductId: jest.fn(),
      productInfo: {},
    };
  });

  it('should render properly', async () => {
    const { getByText, getByTestId, getByRole } = render(<YourOutfit
      productId={mockProps.productId}
      setProductId={mockProps.setProductId}
      productInfo={mockProps.productInfo}
    />);

    expect(getByText('YOUR OUTFIT')).toBeInTheDocument();
    expect(getByTestId('your outfit outer div')).toBeInTheDocument();
    expect(getByTestId('your outfit')).toBeInTheDocument();

    const relatedProductsDiv = getByTestId('your outfit');
    Object.defineProperty(relatedProductsDiv, 'scrollWidth', { value: 1000 });
    Object.defineProperty(relatedProductsDiv, 'clientWidth', { value: 500 });
    Object.defineProperty(relatedProductsDiv, 'scrollLeft', { value: 100 });

    await waitFor(() => {
      expect(getByRole('button', { name: 'scroll left' })).toBeInTheDocument();
      expect(getByRole('button', { name: 'scroll right' })).toBeInTheDocument();
    });
  });
});
