import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StyleSelector from '../components/productDetails/StyleSelector';
import '@testing-library/jest-dom';

describe('StyleSelector', () => {
  const mockStyles = [
    { style_id: 1, name: 'Style 1', photos: [{ thumbnail_url: 'url1.jpg' }] },
    { style_id: 2, name: 'Style 2', photos: [{ thumbnail_url: 'url2.jpg' }] },
  ];

  const mockOnStyleSelect = jest.fn();

  it('renders correctly with props', () => {
    render(<StyleSelector styles={mockStyles} onStyleSelect={mockOnStyleSelect} />);
    // use regex to match the text
    expect(screen.getByText(/Style >/)).toBeInTheDocument();
    expect(screen.getByAltText('Style 1')).toBeInTheDocument();
    expect(screen.getByAltText('Style 2')).toBeInTheDocument();
  });

  it('displays the selected style name', () => {
    render(
      <StyleSelector
        styles={mockStyles}
        selectedStyle={mockStyles[0]}
        onStyleSelect={mockOnStyleSelect}
      />,
    );

    const styleTitle = screen.getByText('Style 1', { exact: false });
    expect(styleTitle).toBeInTheDocument();
    expect(screen.getByText(mockStyles[0].name)).toBeInTheDocument();

    expect(styleTitle.textContent).toContain('Style 1');
    expect(styleTitle.textContent).toContain(mockStyles[0].name);
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
