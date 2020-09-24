import React from 'react';
import KitchenGrid from './KitchenGrid';

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Kitchen = props => {
  console.log(props);
  return <KitchenGrid {...props} sliderSettings={sliderSettings} md={6} lg={4} />;
};

export default Kitchen;
