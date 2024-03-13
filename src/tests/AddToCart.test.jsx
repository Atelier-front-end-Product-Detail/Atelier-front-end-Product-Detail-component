import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddToCart from '../components/productDetails/AddToCart';
import bridge from '../components/bridge';
import '@testing-library/jest-dom';

jest.mock('../components/bridge', () => ({
  addToCart: jest.fn(),
}));

describe('AddToCart', () => {
  const styleMock = {
    skus: {
      1: { size: 'S', quantity: 3 },
      2: { size: 'M', quantity: 5 },
      3: { size: 'L', quantity: 0 }, // Assume size L is out of stock
    },
  };

  beforeEach(() => {
    bridge.addToCart.mockClear();
  });

  it('renders size and quantity selectors', () => {
    render(<AddToCart style={styleMock} />);
    expect(screen.getByText('Select Size')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument(); // Default value for quantity
  });

  it('updates quantity options when size is selected', () => {
    render(<AddToCart style={styleMock} />);
    fireEvent.change(screen.getByRole('combobox', { name: 'size-selector' }), { target: { value: 'S' } });
    expect(screen.getAllByRole('option').length).toBeGreaterThan(1);
  });

  it('displays message if no size is selected and add to cart button is clicked', () => {
    render(<AddToCart style={styleMock} />);
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(screen.getByText('Please select size')).toBeInTheDocument();
  });

  it('calls addToCart from bridge when a size and quantity are selected and add to cart button is clicked', async () => {
    bridge.addToCart.mockResolvedValueOnce(); // Simulate successful add to cart
    render(<AddToCart style={styleMock} />);
    fireEvent.change(screen.getByRole('combobox', { name: 'size-selector' }), { target: { value: 'M' } });
    fireEvent.change(screen.getByRole('combobox', { name: 'quantity-selector' }), { target: { value: '2' } });
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(bridge.addToCart).toHaveBeenCalledWith(parseInt(Object.keys(styleMock.skus).find((key) => styleMock.skus[key].size === 'M'), 10));
  });

  it('shows Out of Stock button when no sizes are available', () => {
    const emptyStyleMock = { skus: {} };
    render(<AddToCart style={emptyStyleMock} />);
    expect(screen.getByText('Out of Stock')).toBeDisabled();
  });
  it('disables add to cart button when selected quantity is more than available', () => {
    render(<AddToCart style={styleMock} />);
    // Assume 'S' size is selected, which has a quantity of 3 available.
    fireEvent.change(screen.getByRole('combobox', { name: 'size-selector' }), { target: { value: 'S' } });
    // User tries to select a quantity of 4.
    fireEvent.change(screen.getByRole('combobox', { name: 'quantity-selector' }), { target: { value: '4' } });
    expect(screen.getByText('Add to Cart')).toBeDisabled();
  });

  it('calls addToCart multiple times if multiple quantities are selected', () => {
    bridge.addToCart.mockResolvedValueOnce(); // Simulate successful add to cart
    render(<AddToCart style={styleMock} />);
    // Select a size with more than one available.
    fireEvent.change(screen.getByRole('combobox', { name: 'size-selector' }), { target: { value: 'S' } });
    // Select a quantity of 2.
    fireEvent.change(screen.getByRole('combobox', { name: 'quantity-selector' }), { target: { value: '2' } });
    // Click 'Add to Cart' button.
    fireEvent.click(screen.getByText('Add to Cart'));
    // The 'addToCart' function should be called twice.
    expect(bridge.addToCart).toHaveBeenCalledTimes(2);
  });
});
