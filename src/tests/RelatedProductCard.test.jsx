import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'dotenv/config';
import RelatedProductCard from '../components/relatedItems/RelatedProductCard';

/* global describe, it, expect, jest, beforeEach */

describe('RelatedProductCard', () => {
  let mockBridge;
  let mockSetProductId;

  beforeEach(() => {
    jest.clearAllMocks();
    mockBridge = {
      productInformation: jest.fn().mockResolvedValue({ data: { name: 'Test Product', category: 'Test Category', default_price: '100' } }),
      productStyles: jest.fn().mockResolvedValue({ data: { results: [{ 'default?': true, photos: [{ thumbnail_url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/1_number_black_and_white.svg' }, { thumbnail_url: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/2_number_black_and_white.svg' }] }] } }),
      reviewsMeta: jest.fn().mockResolvedValue({ data: { ratings: { 1: '10', 2: '20', 3: '30' } } }),
    };
    mockSetProductId = jest.fn().mockResolvedValue();
  });

  it('correctly executes bridge-axios requests and renders based on the results', async () => {
    const { findByText, getByRole } = render(
      <RelatedProductCard productId={0} bridge={mockBridge} setProductId={mockSetProductId} />,
    );

    await waitFor(() => {
      expect(mockBridge.productInformation).toHaveBeenCalledWith(0);
      expect(mockBridge.productStyles).toHaveBeenCalledWith(0);
      expect(mockBridge.reviewsMeta).toHaveBeenCalledWith(0);
    });

    expect(await findByText('Test Product')).toBeInTheDocument();
    expect(await findByText('Test Category')).toBeInTheDocument();
    expect(await findByText('Price: 100')).toBeInTheDocument();
    expect(await getByRole('img', { name: 'product_card_image' })).toHaveAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/1/13/1_number_black_and_white.svg');
  });

  it("should have img elements revert to src 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' if no image is available", async () => {
    const { getByRole } = render(
      <RelatedProductCard productId={0} bridge={mockBridge} setProductId={mockSetProductId} />,
    );

    let image = getByRole('img', { name: 'product_card_image' });
    expect(image.src).toEqual('https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg');

    await waitFor(() => {
      expect(mockBridge.productInformation).toHaveBeenCalledWith(0);
      expect(mockBridge.productStyles).toHaveBeenCalledWith(0);
      expect(mockBridge.reviewsMeta).toHaveBeenCalledWith(0);
    });

    await waitFor(() => {
      image = getByRole('img', { name: 'product_card_image' });
      expect(image.src).toEqual('https://upload.wikimedia.org/wikipedia/commons/1/13/1_number_black_and_white.svg');
    });

    fireEvent.error(image);

    await waitFor(() => {
      image = getByRole('img', { name: 'product_card_image' });
      expect(image.src).toEqual('https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg');
    });
  });

  it('changes photo on next/prev button click', async () => {
    const { getByText, getByRole } = render(
      <RelatedProductCard productId={0} bridge={mockBridge} setProductId={mockSetProductId} />,
    );

    await waitFor(() => {
      expect(mockBridge.productInformation).toHaveBeenCalledWith(0);
      expect(mockBridge.productStyles).toHaveBeenCalledWith(0);
      expect(mockBridge.reviewsMeta).toHaveBeenCalledWith(0);
    });

    await waitFor(() => {
      fireEvent.click(getByText('next pic'));
    });
    expect(getByRole('img', { name: 'product_card_image' })).toHaveAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/6/6c/2_number_black_and_white.svg');

    await waitFor(() => {
      fireEvent.keyPress(getByText('next pic'), { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(getByRole('img', { name: 'product_card_image' })).toHaveAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/1/13/1_number_black_and_white.svg');

    await waitFor(() => {
      fireEvent.click(getByText('prev pic'));
    });
    expect(getByRole('img', { name: 'product_card_image' })).toHaveAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/6/6c/2_number_black_and_white.svg');

    await waitFor(() => {
      fireEvent.keyPress(getByText('prev pic'), { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(getByRole('img', { name: 'product_card_image' })).toHaveAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/1/13/1_number_black_and_white.svg');
  });

  it('updates photo based on productPhotoIndex and handles missing photos', async () => {
    const { getByRole, rerender } = render(
      <RelatedProductCard productId={0} bridge={mockBridge} setProductId={mockSetProductId} />,
    );

    await waitFor(() => expect(getByRole('img', { name: 'product_card_image' })).toHaveAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/1/13/1_number_black_and_white.svg'));

    mockBridge.productStyles = jest.fn().mockResolvedValue({ data: { results: [{ 'default?': true, photos: [{ thumbnail_url: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/2_number_black_and_white.svg' }] }] } });
    rerender(
      <RelatedProductCard productId={1} bridge={mockBridge} setProductId={mockSetProductId} />,
    );

    await waitFor(() => {
      expect(mockBridge.productStyles).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(getByRole('img', { name: 'product_card_image' })).toHaveAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/6/6c/2_number_black_and_white.svg');
    });

    mockBridge.productStyles = jest.fn().mockResolvedValue({ data: { results: [{ 'default?': true, photos: [] }] } });
    rerender(
      <RelatedProductCard productId={2} bridge={mockBridge} setProductId={mockSetProductId} />,
    );

    await waitFor(() => {
      expect(mockBridge.productStyles).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(getByRole('img', { name: 'product_card_image' })).toHaveAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg');
    });
  });

  it('invokes setProductId when clicked on', async () => {
    const { getByRole } = render(
      <RelatedProductCard productId={0} bridge={mockBridge} setProductId={mockSetProductId} />,
    );

    await waitFor(() => {
      expect(mockBridge.productInformation).toHaveBeenCalledWith(0);
      expect(mockBridge.productStyles).toHaveBeenCalledWith(0);
      expect(mockBridge.reviewsMeta).toHaveBeenCalledWith(0);
    });

    await waitFor(() => {
      fireEvent.click(getByRole('button', { name: 'related_product_card' }));
      expect(mockSetProductId).toHaveBeenCalledWith(0);
    });

    await waitFor(() => {
      fireEvent.keyPress(getByRole('button', { name: 'related_product_card' }), { key: 'Enter', code: 'Enter', charCode: 13 });
      expect(mockSetProductId).toHaveBeenCalledTimes(2);
    });
  });
});
