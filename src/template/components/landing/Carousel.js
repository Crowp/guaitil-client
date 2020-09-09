import React, { useState } from 'react';
import CarouselControl from './components/CarouselControl';
import CarouselImage from './components/CarouselImages';

import { Row, Col } from 'reactstrap';

const Carousel = () => (
  <Row>
    <Col className="d-flex justify-content-center">
      <div className="w-75 p-3 abs-center">
        <h2 className="text-center">Talleres</h2>
        <div id="carouselExampleIndicators" className="carousel slide " data-ride="carousel">
          <CarouselImage />
          <CarouselControl />
        </div>
      </div>
    </Col>
  </Row>
);

export default Carousel;
