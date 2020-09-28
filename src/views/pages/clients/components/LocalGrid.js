import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import Flex from '../../../../template/components/common/Flex';
import { Link } from 'react-router-dom';
import { isIterableArray } from '../../../../template/helpers/utils';
import Slider from 'react-slick/lib';
import LazyLoad from 'react-lazyload';
import '../../../../template/assets/styles-css/header-form/dashboard.css';

const sliderSettings = {
  infinite: true,
  speed: 500,
  lazyLoad: true,
  slidesToShow: 1,
  slidesToScroll: 1
};

const LocalGrid = ({ local: { id, name, description, multimedia, localType }, ...rest }) => {
  return (
    <Col className="mb-4" {...rest}>
      <Flex justify="between" column className="border rounded h-100">
        <div className="position-relative rounded-top overflow-hidden">
          {isIterableArray(multimedia) && multimedia.length === 1 && (
            <div>
              <Link to={`/e-commerce/product-details/${id}`}>
                <LazyLoad once>
                  <img
                    className="img-fluid rounded-top w-100 h-100 image-local-grid"
                    src={multimedia[0].url}
                    alt={multimedia[0].fileName}
                  />
                </LazyLoad>
              </Link>
            </div>
          )}
          {isIterableArray(multimedia) && multimedia.length > 1 && (
            <Slider {...sliderSettings}>
              {multimedia.map(item => (
                <Link to={`/e-commerce/product-details/${id}`} key={item.id}>
                  <LazyLoad once>
                    <img className="img-fluid w-100 rounded image-local-grid" src={item.url} alt={item.fileName} />
                  </LazyLoad>
                </Link>
              ))}
            </Slider>
          )}
        </div>
        <div className="p-3">
          <h5 className="fs-0">
            <Link className="text-dark" to={`/e-commerce/product-details/${id}`}>
              {name}
            </Link>
          </h5>
          <p className="fs--1 mb-3">
            <Link className="text-500" to="#">
              {localType}
            </Link>
          </p>
          <p>{description}</p>
        </div>
      </Flex>
    </Col>
  );
};

LocalGrid.propTypes = {
  local: PropTypes.object.isRequired
};

LocalGrid.defaultProps = { multimedia: [] };

export default LocalGrid;
