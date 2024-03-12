import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageGallery from '../components/productDetails/ImageGallery';
import '@testing-library/jest-dom';

describe('ImageGallery', () => {
  const style = {
    photos: [
      { id: '1', thumbnail_url: 'http://example.com/photo1.jpg', url: 'http://example.com/photo1.jpg' },
      { id: '2', thumbnail_url: 'http://example.com/photo2.jpg', url: 'http://example.com/photo2.jpg' },
      { id: '3', thumbnail_url: 'http://example.com/photo3.jpg', url: 'http://example.com/photo3.jpg' },
    ],
  };

  it('renders thumbnails and a main image', () => {
    render(<ImageGallery style={style} />);
    expect(screen.getByAltText('Thumbnail 0')).toBeInTheDocument();
    expect(screen.getByAltText('Thumbnail 1')).toBeInTheDocument();
    expect(screen.getByAltText('Product')).toBeInTheDocument();
  });

  it('changes the main image when a thumbnail is clicked', () => {
    render(<ImageGallery style={style} />);
    fireEvent.click(screen.getByAltText('Thumbnail 1'));
    expect(screen.getByAltText('Product').src).toBe('http://example.com/photo2.jpg');
  });

  it('toggles expanded view when the main image or expand/collapse button is clicked', () => {
    render(<ImageGallery style={style} />);
    fireEvent.click(screen.getByRole('button', { name: 'Expand content' }));
    expect(screen.getByRole('button', { name: 'Collapse content' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Collapse content' }));
    expect(screen.getByRole('button', { name: 'Expand content' })).toBeInTheDocument();
  });

  it('navigates to the next and previous images when arrow buttons are clicked', () => {
    render(<ImageGallery style={style} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next image' }));
    expect(screen.getByAltText('Product').src).toBe('http://example.com/photo2.jpg');
    fireEvent.click(screen.getByRole('button', { name: 'Previous image' }));
    expect(screen.getByAltText('Product').src).toBe('http://example.com/photo1.jpg');
  });

  it('zooms in on the main image when clicked in expanded view', () => {
    render(<ImageGallery style={style} />);
    // expanded view
    fireEvent.click(screen.getByRole('button', { name: 'Expand content' }));
    // click to zoom in on main image
    fireEvent.click(screen.getByAltText('Product'));
  });

  it('does not navigate beyond the last or first image', () => {
    render(<ImageGallery style={style} />);
    // Click next image until the end of gallery
    fireEvent.click(screen.getByRole('button', { name: 'Next image' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next image' }));
    // Try to click next again and expect the image to be the same as the last one when its at end
    fireEvent.click(screen.getByRole('button', { name: 'Next image' }));
    expect(screen.getByAltText('Product').src).toBe('http://example.com/photo3.jpg');
    fireEvent.click(screen.getByRole('button', { name: 'Previous image' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous image' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous image' }));
    expect(screen.getByAltText('Product').src).toBe('http://example.com/photo1.jpg');
  });
});
