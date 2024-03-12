import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComparisonModal from '../../components/relatedItems/ComparisonModal';
import mockData from './mockData';

describe('RelatedProducts', () => {
  let mockProps;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock('../../components/relatedItems/helper', () => ({
      getItemsProductInfo: jest.fn().mockResolvedValue(mockData),
    }));
    mockProps = {
      relatedItem: {
        info: {
          features: [
            {
              feature: 'dogs',
              value: 'yes please',
            },
            {
              feature: 'cats',
              value: 'meh, I guess',
            },
          ],
        },
      },
      productInfo: {
        info: {
          features: [
            {
              feature: 'cats',
              value: 'meh, I guess',
            },
            {
              feature: 'mice',
              value: 'well yeah, for the cats',
            },
          ],
        },
      },
    };
  });

  it('should render properly', () => {
    const { getByText, getAllByText } = render(<ComparisonModal
      relatedItem={mockProps.relatedItem}
      productInfo={mockProps.productInfo}
    />);

    expect(getByText('Comparing:')).toBeInTheDocument();
    expect(getAllByText(mockProps.productInfo.info.features[0].feature)).toHaveLength(1);
    expect(getAllByText(mockProps.productInfo.info.features[0].value)).toHaveLength(2);
    expect(getAllByText(mockProps.productInfo.info.features[1].feature)).toHaveLength(1);
    expect(getAllByText(mockProps.productInfo.info.features[1].value)).toHaveLength(1);
    expect(getAllByText(mockProps.relatedItem.info.features[0].feature)).toHaveLength(1);
    expect(getAllByText(mockProps.relatedItem.info.features[0].value)).toHaveLength(1);
    expect(getAllByText(mockProps.relatedItem.info.features[1].feature)).toHaveLength(1);
    expect(getAllByText(mockProps.relatedItem.info.features[1].value)).toHaveLength(2);
  });
});
