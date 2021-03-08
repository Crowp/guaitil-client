import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Badge, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { isIterableArray } from '../../../helpers/utils';
import Slider from 'react-slick/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import AppContext from '../../../context/Context';

const ProductList = ({ files, title, category, features, isNew, sliderSettings, index }) => {
  const { isDark } = useContext(AppContext);

  return (
    <Col xs={12} className={classNames('p-3 w-75', { 'bg-100': isDark && index % 2 !== 0 })}>
      <div className="p-1">
        <Row>
          <Col sm={5} md={4} style={{ minHeight: 200 }}>
            <div className="position-relative h-sm-100">
              {isIterableArray(files) && files.length === 1 && (
                <Link className="d-block h-100">
                  <img
                    className="img-fluid fit-cover w-sm-100 h-sm-100 rounded absolute-sm-centered"
                    src={files[0]['src'] || files[0]['base64']}
                    alt={files[0].path}
                  />
                </Link>
              )}
              {isIterableArray(files) && files.length > 1 && (
                <Slider {...sliderSettings}>
                  {files.map(file => (
                    <Link className="d-block h-100" key={file.id}>
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
          </Col>
          <Col sm={7} md={8}>
            <Row>
              <Col lg={8}>
                <h5 className="mt-3 mt-sm-0">
                  <Link className="text-dark fs-0 fs-lg-1">{title}</Link>
                </h5>
                <p className="fs--1 mb-2 mb-md-3">
                  <a className="text-500" href="#!">
                    {category}
                  </a>
                </p>
                {isIterableArray(features) && (
                  <ul className="list-unstyled d-none d-lg-block">
                    {features.map((feature, index) => (
                      <li key={index}>
                        <FontAwesomeIcon icon="circle" transform="shrink-12" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

ProductList.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  review: PropTypes.number.isRequired,
  shippingCost: PropTypes.number.isRequired,
  sliderSettings: PropTypes.object.isRequired,
  files: PropTypes.array
};

ProductList.defaultProps = { isNew: false, isInStock: false, files: [] };

export default ProductList;
