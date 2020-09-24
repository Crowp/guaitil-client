import React from 'react';
import LocalGrid from './LocalGrid';

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Product = props => {
  return <LocalGrid {...props} sliderSettings={sliderSettings} md={6} lg={4} />;
};

export default Product;
