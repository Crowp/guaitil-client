import React, { useContext } from 'react';
import ProductGrid from './ProductGrid';

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Product = props => {
  console.log(props);
  return <ProductGrid {...props} sliderSettings={sliderSettings} md={6} lg={4} />;
};

export default Product;
