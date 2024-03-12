import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'dotenv/config';
import ActionButton from '../../components/relatedItems/ActionButton';

describe('RelatedProducts', () => {
  let mockProps;
  beforeEach(() => {
    jest.clearAllMocks();
    mockProps = {
      type: 'related products',
      action: jest.fn(),
      productInformation: {
        info: {
          id: null,
        },
      },
      relatedItem: {
        info: {
          id: null,
        },
      },
    };
  });

  it('should render properly for related products', () => {
    const { getByRole } = render(<ActionButton
      type={mockProps.type}
      action={mockProps.action}
      productInformation={mockProps.productInformation}
      relatedItem={mockProps.relatedItem}
    />);

    expect(getByRole('button', { name: 'open comparison modal' })).toBeInTheDocument();
  });

  it('should render properly for your outfit', () => {
    mockProps.type = 'remove from your outfit';
    const { getByRole } = render(<ActionButton
      type={mockProps.type}
      action={mockProps.action}
      productInformation={mockProps.productInformation}
      relatedItem={mockProps.relatedItem}
    />);

    expect(getByRole('button', { name: 'remove from your outfit' })).toBeInTheDocument();
  });

  it('should invoke its action when clicked or key pressed with enter', () => {
    mockProps.productInformation.info.id = 0;
    mockProps.relatedItem.info.id = 1;

    const { getByRole } = render(<ActionButton
      type={mockProps.type}
      action={mockProps.action}
      productInformation={mockProps.productInformation}
      relatedItem={mockProps.relatedItem}
    />);

    const buttonObject = getByRole('button', { name: 'open comparison modal' });

    fireEvent.click(buttonObject);
    expect(mockProps.action).toHaveBeenCalledTimes(1);

    fireEvent.focus(buttonObject);
    fireEvent.keyDown(buttonObject, {
      key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13,
    });
    expect(mockProps.action).toHaveBeenCalledTimes(2);
  });
});
