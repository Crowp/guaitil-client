import React from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { isIterableArray } from '../../../../template/helpers/utils';
import workshop from '../../../../template/assets/img/background/local.jpg';
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
const ProductList = ({ product: { id, name, description, multimedia }, last = false }) => {
  return (
    <Col xs={12} className="bg-100">
      <div className={`p-2 ${!last ? 'border-bottom' : ''}`}>
        <Row>
          <Col sm={5} md={4}>
            <div className="position-relative h-sm-100">
              {multimedia.length === 0 &&
                items.map(item => {
                  return (
                    <Link className="d-block h-100" to={`/e-commerce/product-details/${id}`} key={item.id}>
                      <img
                        className="img-fluid fit-cover w-sm-100 h-sm-100 rounded absolute-sm-centered"
                        src={item.src}
                        alt={item.altText}
                      />
                    </Link>
                  );
                })}
              {isIterableArray(multimedia) && multimedia.length === 1 && (
                <Link className="d-block h-100" to={`/e-commerce/product-details/${id}`}>
                  <img
                    className="img-fluid fit-cover w-sm-100 h-sm-100 rounded absolute-sm-centered"
                    src={multimedia[0].url}
                    alt={multimedia[0].fileName}
                  />
                </Link>
              )}
              {isIterableArray(multimedia) && multimedia.length > 1 && (
                <Slider {...sliderSettings}>
                  {multimedia.map(file => (
                    <Link className="d-block h-100" to={`/e-commerce/product-details/${id}`} key={file.id}>
                      <img
                        className="img-fluid fit-cover w-sm-100 h-sm-100 rounded"
                        src={file.url}
                        alt={file.fileName}
                      />
                    </Link>
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

ProductList.defaultProps = { multimedia: [] };

export default ProductList;
