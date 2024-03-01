import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const Overview = () => (
  <div>
    <ImageGallery />
    <ProductInformation />
    <StyleSelector />
    <AddToCart />
  </div>
);

export default Overview;