import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StyleSelector from '../components/productDetails/StyleSelector';

describe('StyleSelector', () => {
  const mockStyles = [
    { style_id: 1, name: 'Style 1', photos: [{ thumbnail_url: 'url1.jpg' }] },
    { style_id: 2, name: 'Style 2', photos: [{ thumbnail_url: 'url2.jpg' }] },
  ];

  const mockOnStyleSelect = jest.fn();

  it('renders correctly with props', () => {
    render(<StyleSelector styles={mockStyles} onStyleSelect={mockOnStyleSelect} />);

    expect(screen.getByText('Style > ')).toBeInTheDocument();
    expect(screen.getByAltText('Style 1')).toBeInTheDocument();
    expect(screen.getByAltText('Style 2')).toBeInTheDocument();
  });

  it('displays the selected style name', () => {
    render(<StyleSelector
      styles={mockStyles}
      selectedStyle={mockStyles[0]}
      onStyleSelect={mockOnStyleSelect}
    />);

    expect(screen.getByText('Style > Style 1')).toBeInTheDocument();
  });

  it('calls onStyleSelect with the new style when a different style is clicked (interaction)', () => {
    render(<StyleSelector
      styles={mockStyles}
      selectedStyle={mockStyles[0]}
      onStyleSelect={mockOnStyleSelect}
    />);

    fireEvent.click(screen.getByAltText('Style 2'));

    expect(mockOnStyleSelect).toHaveBeenCalledWith(mockStyles[1]);
  });

  it('should not call onStyleSelect when the same style is clicked', () => {
    render(<StyleSelector
      styles={mockStyles}
      selectedStyle={mockStyles[0]}
      onStyleSelect={mockOnStyleSelect}
    />);

    fireEvent.click(screen.getByAltText('Style 1'));

    expect(mockOnStyleSelect).not.toHaveBeenCalled();
  });

  it('shows checkmark on selected style', () => {
    render(<StyleSelector
      styles={mockStyles}
      selectedStyle={mockStyles[0]}
      onStyleSelect={mockOnStyleSelect}
    />);

    const checkmark = screen.getByText('✔').closest('.style-thumbnail');
    expect(checkmark).toHaveClass('selected');
  });
});
