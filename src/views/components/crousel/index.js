import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick/lib';
import { Col, Card, CardHeader, CardBody } from 'reactstrap';
import Flex from '../common/Flex';
import uuid from 'uuid/v1';

import product1 from '../../../template/assets/img/products/1.jpg';
import product12 from '../../../template/assets/img/products/1-2.jpg';
import product13 from '../../../template/assets/img/products/1-3.jpg';
import product14 from '../../../template/assets/img/products/1-4.jpg';
import product15 from '../../../template/assets/img/products/1-5.jpg';
import product16 from '../../../template/assets/img/products/1-6.jpg';

const SlickSlider = () => {
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const images = [
    {
      id: uuid(),
      src: product1
    },
    {
      id: uuid(),
      src: product12
    },
    {
      id: uuid(),
      src: product13
    },
    {
      id: uuid(),
      src: product14
    },
    {
      id: uuid(),
      src: product15
    },
    {
      id: uuid(),
      src: product16
    }
  ];

  return (
    <div className="position-relative h-sm-auto overflow-hidden">
      <Slider {...sliderSettings} className="slick-slider-arrow-inner">
        {images.map((img, index) => (
          <img
            className="img-fluid fit-cover w-sm-100 h-sm-100 rounded cursor-pointer"
            src={img['src']}
            alt=""
            key={img.id}
          />
        ))}
      </Slider>
    </div>
  );
};

const SlickCarousel = () => {
  return (
    <Flex justify="center">
      <Col className="px-0">
        <Card>
          <CardHeader className="bg-light">
            <h3>Example</h3>
          </CardHeader>
          <CardBody>
            <SlickSlider />
          </CardBody>
        </Card>
      </Col>
    </Flex>
  );
};

SlickCarousel.propTypes = { value: PropTypes.any };

SlickCarousel.defaultProps = { value: `SlickCarousel` };

export default SlickCarousel;
