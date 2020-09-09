import React from 'react';

import bg1 from '../../../../template/assets/img/background/ima2.png';
import bg2 from '../../../../template/assets/img/background/img1.jpg';
import bg3 from '../../../../template/assets/img/background/img3.jpg';

const CarouselImage = () => (
  <div className="carousel-inner container-fluid ">
    <div className="carousel-item active col-md-12">
      <div className="row" />
      <img src={bg1} fluid className="d-block w-100 img-responsive " />
    </div>
    <div className="row" />
    <div className="carousel-item col-md-12">
      <img src={bg3} fluid className="d-block w-100  img-responsive" />
    </div>
    <div className="row" />
    <div className="carousel-item col-md-12">
      <img src={bg2} fluid className="d-block w-100 img-responsive" />
    </div>
  </div>
);
export default CarouselImage;
