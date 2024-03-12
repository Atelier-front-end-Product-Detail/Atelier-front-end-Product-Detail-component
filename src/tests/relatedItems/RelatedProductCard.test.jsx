import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProductCard from '../../components/relatedItems/RelatedProductCard';

describe('RelatedProductCard', () => {
  let mockProps;
  beforeEach(() => {
    jest.clearAllMocks();
    mockProps = {
      productId: 1,
      setProductId: jest.fn(),
      type: 'related product',
      action: jest.fn(),
      productInformation: {
        info: {
          name: 'test name',
          slogan: 'test slogan',
          category: 'test category',
          default_price: 'test price info default',
        },
        styles: {
          results: [
            {
              'default?': true,
              original_price: 'test price style original',
              sale_price: 'test price style sale',
              photos: [
                {
                  thumbnail_url: 'https://www.thebluediamondgallery.com/handwriting/images/testing.jpg',
                  url: 'https://www.thebluediamondgallery.com/handwriting/images/testing.jpg',
                },
                {
                  thumbnail_url: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yNzcuanBn.jpg',
                  url: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yNzcuanBn.jpg',
                },
              ],
            },
          ],
        },
        meta: {
          ratings: {
            1: '10',
            2: '20',
            3: '30',
            4: '40',
            5: '50',
          },
        },
      },
      relatedItem: {},
      setRelatedItem: jest.fn(),
    };
  });

  it('renders loading state initially', () => {
    const { getByText, getByRole, getByAltText } = render(<RelatedProductCard
      productId={mockProps.productId}
      setProductId={mockProps.setProductId}
      type={mockProps.type}
      action={mockProps.action}
      productInformation={mockProps.productInformation}
      relatedItem={mockProps.relatedItem}
      setRelatedItem={mockProps.setRelatedItem}
    />);
    expect(getByRole('button', { name: 'remove from your outfit' })).toBeInTheDocument();
    expect(getByAltText('product_card_image').src).toBe('https://www.thebluediamondgallery.com/handwriting/images/testing.jpg');
    expect(getByText('test name')).toBeInTheDocument();
    expect(getByText('test slogan')).toBeInTheDocument();
    expect(getByText('test category')).toBeInTheDocument();
    expect(getByText(/Price: \$\s*test price info default/i)).toBeInTheDocument();
    expect(getByText(/Price: \$\s*test price style sale/i)).toBeInTheDocument();
    expect(getByText(/Reviews:/i)).toBeInTheDocument();
  });

  it('responds to clicks properly', async () => {
    const { getByRole, getByAltText } = render(<RelatedProductCard
      productId={mockProps.productId}
      setProductId={mockProps.setProductId}
      type={mockProps.type}
      action={mockProps.action}
      productInformation={mockProps.productInformation}
      relatedItem={mockProps.relatedItem}
      setRelatedItem={mockProps.setRelatedItem}
    />);

    await waitFor(() => {
      fireEvent.click(getByRole('button', { name: 'related_product_card' }));
    });

    expect(mockProps.setProductId).toHaveBeenCalledTimes(1);
    expect(mockProps.setRelatedItem).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      fireEvent.click(getByRole('button', { name: 'next picture' }));
    });
    await waitFor(() => {
      fireEvent.click(getByRole('button', { name: 'next picture' }));
    });
    await waitFor(() => {
      fireEvent.click(getByRole('button', { name: 'next picture' }));
    });

    expect(getByAltText('product_card_image')).toHaveAttribute('src', 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yNzcuanBn.jpg');

    await waitFor(() => {
      fireEvent.click(getByRole('button', { name: 'prev picture' }));
    });
    await waitFor(() => {
      fireEvent.click(getByRole('button', { name: 'prev picture' }));
    });
    await waitFor(() => {
      fireEvent.click(getByRole('button', { name: 'prev picture' }));
    });

    expect(getByAltText('product_card_image')).toHaveAttribute('src', 'https://www.thebluediamondgallery.com/handwriting/images/testing.jpg');
  });

  it('responds to key presses properly', async () => {
    const { getByRole, getByAltText } = render(<RelatedProductCard
      productId={mockProps.productId}
      setProductId={mockProps.setProductId}
      type={mockProps.type}
      action={mockProps.action}
      productInformation={mockProps.productInformation}
      relatedItem={mockProps.relatedItem}
      setRelatedItem={mockProps.setRelatedItem}
    />);

    fireEvent.focus(getByRole('button', { name: 'related_product_card' }));

    fireEvent.keyDown(getByRole('button', { name: 'related_product_card' }), {
      key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13,
    });

    expect(mockProps.setProductId).toHaveBeenCalledTimes(1);
    expect(mockProps.setRelatedItem).toHaveBeenCalledTimes(1);

    fireEvent.focus(getByRole('button', { name: 'next picture' }));

    await waitFor(() => {
      fireEvent.keyDown(getByRole('button', { name: 'next picture' }), {
        key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13,
      });
    });

    expect(getByAltText('product_card_image')).toHaveAttribute('src', 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yNzcuanBn.jpg');

    fireEvent.focus(getByRole('button', { name: 'prev picture' }));

    await waitFor(() => {
      fireEvent.keyDown(getByRole('button', { name: 'prev picture' }), {
        key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13,
      });
    });

    expect(getByAltText('product_card_image')).toHaveAttribute('src', 'https://www.thebluediamondgallery.com/handwriting/images/testing.jpg');
  });

  it('defaults to a placeholder image when the src image encounters an error', async () => {
    process.env.IMAGE_NOT_FOUND = 'image not found';
    const { getByRole, getByAltText } = render(<RelatedProductCard
      productId={mockProps.productId}
      setProductId={mockProps.setProductId}
      type={mockProps.type}
      action={mockProps.action}
      productInformation={mockProps.productInformation}
      relatedItem={mockProps.relatedItem}
      setRelatedItem={mockProps.setRelatedItem}
    />);

    fireEvent.error(getByAltText('product_card_image'));

    await waitFor(() => {
      expect(getByAltText('product_card_image')).toHaveAttribute('src', 'image not found');
    });
  });
});
