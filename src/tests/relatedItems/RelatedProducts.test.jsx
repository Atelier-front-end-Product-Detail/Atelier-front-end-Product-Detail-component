import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'dotenv/config';
import RelatedProducts from '../../components/relatedItems/RelatedProducts';

describe('RelatedProducts', () => {
  let mockProps;
  beforeEach(() => {
    jest.clearAllMocks();
    mockProps = {
      relatedItems: [40345],
      setProductId: jest.fn(),
      productInfo: {
        info: {
          id: 40344,
        },
      },
    };
  });

  it('should render properly', () => {
    const { getByTestId } = render(<RelatedProducts
      relatedItems={mockProps.relatedItems}
      setProductId={mockProps.setProductId}
      productInfo={mockProps.productInfo}
    />);

    expect(getByTestId('related products outer div')).toBeInTheDocument();
    expect(getByTestId('related products')).toBeInTheDocument();
  });

  it('should render scroll buttons properly', async () => {
    const { getByRole, getByTestId } = render(<RelatedProducts
      relatedItems={mockProps.relatedItems}
      setProductId={mockProps.setProductId}
      productInfo={mockProps.productInfo}
    />);

    const relatedProductsDiv = getByTestId('related products');
    Object.defineProperty(relatedProductsDiv, 'scrollWidth', { value: 1000 });
    Object.defineProperty(relatedProductsDiv, 'clientWidth', { value: 500 });
    Object.defineProperty(relatedProductsDiv, 'scrollLeft', { value: 100 });

    await waitFor(() => {
      expect(getByRole('button', { name: 'scroll left' })).toBeInTheDocument();
      expect(getByRole('button', { name: 'scroll right' })).toBeInTheDocument();
    });
  });
});
