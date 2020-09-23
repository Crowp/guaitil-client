import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Col } from 'reactstrap';
import Flex from '../../common/Flex';
import { Link } from 'react-router-dom';
import { isIterableArray } from '../../../helpers/utils';
import Slider from 'react-slick/lib';

const ProductGrid = ({
  id,
  files,
  title,
  category,
  price,
  sale,
  rating,
  review,
  shippingCost,
  isInStock,
  isNew,
  sliderSettings,
  ...rest
}) => {
  return (
    <Col className="mb-4" {...rest}>
      <Flex justify="between" column className="border rounded h-100 pb-3">
        <div className="overflow-hidden">
          <div className="position-relative rounded-top overflow-hidden">
            {isIterableArray(files) && files.length === 1 && (
              <Link className="d-block h-100" to={`/e-commerce/product-details/${id}`}>
                <img
                  className="img-fluid rounded-top"
                  src={files[0]['src'] || files[0]['base64']}
                  alt={files[0].path}
                />
              </Link>
            )}
            {isIterableArray(files) && files.length > 1 && (
              <Slider {...sliderSettings}>
                {files.map(file => (
                  <Link className="d-block h-100" to={`/e-commerce/product-details/${id}`} key={file.id}>
                    <img
                      className="img-fluid fit-cover w-sm-100 h-sm-100 rounded"
                      src={file['src'] || file['base64']}
                      alt={file.path}
                    />
                  </Link>
                ))}
              </Slider>
            )}

            {isNew && (
              <Badge color="success" pill className="position-absolute t-0 r-0 mr-2 mt-2 fs--2 z-index-2">
                New
              </Badge>
            )}
          </div>
          <div className="p-3">
            <h5 className="fs-0">
              <Link className="text-dark" to={`/e-commerce/product-details/${id}`}>
                {title}
              </Link>
            </h5>
            <p className="fs--1 mb-3">
              <a className="text-500" href="#!">
                {category}
              </a>
            </p>
          </div>
        </div>
      </Flex>
    </Col>
  );
};

ProductGrid.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  review: PropTypes.number.isRequired,
  shippingCost: PropTypes.number.isRequired,
  sliderSettings: PropTypes.object.isRequired,
  files: PropTypes.array
};

ProductGrid.defaultProps = { isNew: false, isInStock: false, files: [] };

export default ProductGrid;
