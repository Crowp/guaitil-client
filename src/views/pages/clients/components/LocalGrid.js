import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import Flex from '../../../../template/components/common/Flex';
import { Link } from 'react-router-dom';
import { isIterableArray } from '../../../../template/helpers/utils';
import Slider from 'react-slick/lib';

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
                <img
                  style={{ objectFit: 'cover', height: 200 }}
                  className="img-fluid rounded-top w-100"
                  src={multimedia[0].url}
                  alt={multimedia[0].fileName}
                />
              </Link>
            </div>
          )}
          {isIterableArray(multimedia) && multimedia.length > 1 && (
            <Slider {...sliderSettings}>
              {multimedia.map(item => (
                <Link to={`/e-commerce/product-details/${id}`} key={item.id}>
                  <img
                    className="img-fluid w-100 rounded"
                    style={{ objectFit: 'cover', height: 200 }}
                    src={item.url}
                    alt={item.fileName}
                  />
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
