/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { isIterableArray } from '../../../../template/helpers/utils';
import workshop from '../../../../template/assets/img/background/WorshopImage.jpeg';
import Slider from 'react-slick/lib';

const sliderSettings = {
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1
};

const items = [
  {
    src: workshop,
    altText: 'Imagen de Taller',
    caption: 'Talleres',
    description: 'Conoce nuestros talleres',
    id: 1
  }
];
// eslint-disable-next-line react/prop-types
const ProductItem = ({ productDescription: { name, description }, multimedia, last }) => {
  return (
    <Col xs={12} className="bg-100">
      <div className={`p-2 ${!last ? 'border-bottom' : ''}`}>
        <Row>
          <Col sm={5} md={4}>
            <div className="position-relative h-sm-100">
              {multimedia.length === 0 &&
                items.map(item => {
                  return (
                    <img
                      className="img-fluid d-block fit-cover w-100 h-100 rounded absolute-sm-centered"
                      src={item.src}
                      alt={item.altText}
                    />
                  );
                })}
              {isIterableArray(multimedia) && multimedia.length === 1 && (
                <img
                  className="img-fluid d-block fit-cover w-100 h-100 rounded absolute-sm-centered"
                  src={multimedia[0].url}
                  alt={multimedia[0].fileName}
                />
              )}
              {isIterableArray(multimedia) && multimedia.length > 1 && (
                <Slider {...sliderSettings}>
                  {multimedia.map((file, index) => (
                    <img
                      key={`image-product-${index}`}
                      className="img-fluid fit-cover w-100 rounded image-product-grid"
                      src={file.url}
                      alt={file.fileName}
                    />
                  ))}
                </Slider>
              )}
            </div>
          </Col>
          <Col sm={7} md={8}>
            <Row>
              <Col lg={8}>
                <h5 className="mt-3 mt-sm-0">{name}</h5>
                <p className="fs--1 mb-2 mb-md-3">{description}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

ProductItem.propTypes = {
  multimedia: PropTypes.array.isRequired,
  last: PropTypes.bool
};

ProductItem.defaultProps = {
  last: false,
  multimedia: []
};

export default ProductItem;
