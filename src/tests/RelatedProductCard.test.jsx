import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'dotenv/config';
import RelatedProductCard from '../components/relatedItems/RelatedProductCard';
import bridge from '../components/bridge';

/* global describe, it, expect */

describe('RelatedProductCard', () => {
  it("should have img elements revert to src 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' if no image is available", () => {
    const { getAllByRole } = render(
      <RelatedProductCard productId={40344} bridge={bridge} setProductId={() => {}} />,
    );
    const images = getAllByRole('img');
    images.forEach((image) => {
      fireEvent.error(image);
      expect(image.src).toEqual('https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg');
    });
  });
});
