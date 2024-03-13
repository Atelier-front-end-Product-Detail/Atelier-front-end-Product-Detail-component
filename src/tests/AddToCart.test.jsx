import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddToCart from '../components/productDetails/AddToCart';
import bridge from '../components/bridge';
import '@testing-library/jest-dom';

jest.mock('../components/bridge', () => ({
  addToCart: jest.fn(() => Promise.resolve()),
}));

describe('AddToCart', () => {
  const styleMock = {
    skus: {
      1: { size: 'S', quantity: 3 },
      2: { size: 'M', quantity: 5 },
      3: { size: 'L', quantity: 0 },
    },
  };

  beforeEach(() => {
    bridge.addToCart.mockClear();
  });

  it('renders size and quantity selectors', () => {
    render(<AddToCart style={styleMock} />);
    expect(screen.getByRole('combobox', { name: /select size/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /quantity/i })).toBeInTheDocument();
  });

  it('updates quantity options when size is selected', () => {
    render(<AddToCart style={styleMock} />);
    fireEvent.change(screen.getByRole('combobox', { name: /select size/i }), { target: { value: 'S' } });
    expect(screen.getAllByRole('option').length).toBeGreaterThan(1);
  });

  it('displays message if no size is selected and add to cart button is clicked', () => {
    render(<AddToCart style={styleMock} />);
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(screen.getByText('Please select size')).toBeInTheDocument();
  });

  it('calls addToCart from bridge when a size and quantity are selected and add to cart button is clicked', async () => {
    render(<AddToCart style={styleMock} />);
    fireEvent.change(screen.getByRole('combobox', { name: /select size/i }), { target: { value: 'M' } });
    fireEvent.change(screen.getByRole('combobox', { name: /quantity/i }), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(bridge.addToCart).toHaveBeenCalledTimes(2);
  });
});
