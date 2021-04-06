import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import Flex from '../../../../template/components/common/Flex';
import { Link } from 'react-router-dom';
import { isIterableArray } from '../../../../template/helpers/utils';
import Slider from 'react-slick/lib';
import '../../../../template/assets/styles-css/header-form/dashboard.css';
import { getLocalType } from '../../../../utils/LocalType';

const sliderSettings = {
  infinite: true,
  speed: 500,
  autoplay: true,
  lazyLoad: true,
  slidesToShow: 1,
  slidesToScroll: 1
};

const LocalGrid = ({
  local: {
    localDescription: { name, localType, description },
    multimedia
  },
  localUrl,
  ...rest
}) => {
  console.log(multimedia);
  return (
    <Col className="mb-4" {...rest}>
      <Flex justify="between" column className="border rounded h-100">
        <div className="position-relative rounded-top overflow-hidden">
          {isIterableArray(multimedia) && multimedia.length === 1 && (
            <div>
              <Link to={localUrl}>
                <img
                  data-sizes="auto"
                  className="lazyload img-fluid rounded-top w-100 h-100 image-local-grid"
                  data-src={multimedia[0].url}
                  alt={multimedia[0].fileName}
                />
              </Link>
            </div>
          )}
          {isIterableArray(multimedia) && multimedia.length > 1 && (
            <Slider {...sliderSettings}>
              {multimedia.map(item => (
                <Link to={localUrl} key={item.id}>
                  <img
                    data-sizes="auto"
                    className="lazyload img-fluid w-100 rounded image-local-grid"
                    data-src={item.url}
                    alt={item.fileName}
                  />
                </Link>
              ))}
            </Slider>
          )}
        </div>
        <div className="pt-3 pl-3 pr-3 pb-0">
          <h5 className="fs-0">
            <Link className="text-dark" to={localUrl}>
              {name}
            </Link>
          </h5>
          <p className="fs--1 mb-1">
            <Link className="text-500" to="#">
              {getLocalType(localType)}
            </Link>
          </p>
          <p>{description}</p>
        </div>
        <div className="d-flex justify-content-center pb-2 pt-2 border-top">
          <Link className="d-inline" to={localUrl}>
            Ver más
          </Link>
        </div>
      </Flex>
    </Col>
  );
};

LocalGrid.propTypes = {
  local: PropTypes.object.isRequired
};

LocalGrid.defaultProps = { multimedia: [] };

export default React.memo(LocalGrid);
