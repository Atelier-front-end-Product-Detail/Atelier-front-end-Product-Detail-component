import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddItemToOutfit from '../../components/relatedItems/AddItemToOutfit';

describe('AddItemToOutfit', () => {
  let mockProps;
  beforeEach(() => {
    jest.clearAllMocks();
    mockProps = {
      addToOutfit: jest.fn(),
    };
  });

  it('should render properly', async () => {
    const { getByRole } = render(<AddItemToOutfit
      addToOutfit={mockProps.addToOutfit}
    />);

    expect(getByRole('button', { name: 'add item to outfit' })).toBeInTheDocument();
  });

  it('should handle clicks and key presses properly', async () => {
    const { getByRole } = render(<AddItemToOutfit
      addToOutfit={mockProps.addToOutfit}
    />);

    fireEvent.click(getByRole('button', { name: 'add item to outfit' }));
    expect(mockProps.addToOutfit).toHaveBeenCalledTimes(1);

    fireEvent.focus(getByRole('button', { name: 'add item to outfit' }));
    fireEvent.keyDown(getByRole('button', { name: 'add item to outfit' }), {
      key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13,
    });
    expect(mockProps.addToOutfit).toHaveBeenCalledTimes(2);
  });
});
