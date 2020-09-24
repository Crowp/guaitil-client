import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Col } from 'reactstrap';
import Flex from '../../common/Flex';
import { Link } from 'react-router-dom';
import { isIterableArray } from '../../../helpers/utils';
import Slider from 'react-slick/lib';

const ProductGrid = ({ id, name, description, multimedia, sliderSettings }) => {
  console.log(multimedia);
  return (
    <Col className="mb-4">
      <Flex
        justify="between"
        column
        className="border rounded h-100 pb-3"
        style={{
          maxWidth: 500,
          maxHeight: 500
        }}
      >
        <div className="overflow-hidden">
          <div className="position-relative rounded-top overflow-hidden">
            {isIterableArray(multimedia) && multimedia.length === 1 && (
              <Link className="d-block h-100" to={`/e-commerce/product-details/${id}`}>
                <img
                  style={{ objectFit: 'cover' }}
                  //Loading="lazy"
                  className="img-fluid rounded-top"
                  src={multimedia[0].url}
                  alt={multimedia[0].fileName}
                />
              </Link>
            )}
            {isIterableArray(multimedia) && multimedia.length > 1 && (
              <Slider {...sliderSettings}>
                {multimedia.map(item => (
                  <Link className="d-block h-100" to={`/e-commerce/product-details/${id}`} key={item.id}>
                    <img
                      className="img-fluid fit-cover w-sm-100 h-sm-100 rounded"
                      src={item[0].url}
                      alt={item[0].fileName}
                    />
                  </Link>
                ))}
              </Slider>
            )}
            <Badge color="success" pill className="position-absolute t-0 r-0 mr-2 mt-2 fs--2 z-index-2">
              New
            </Badge>
          </div>
          <div className="p-3">
            <h5 className="fs-0">
              <Link className="text-dark" to={`/e-commerce/product-details/${id}`}>
                {name}
              </Link>
            </h5>
            <p className="fs--1 mb-3">
              <a className="text-500" href="#!">
                {description}
              </a>
            </p>
          </div>
        </div>
      </Flex>
    </Col>
  );
};

ProductGrid.propTypes = {
  sliderSettings: PropTypes.object.isRequired,
  multimedia: PropTypes.array
};

ProductGrid.defaultProps = { multimedia: [] };

export default ProductGrid;
