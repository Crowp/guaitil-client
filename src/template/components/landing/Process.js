import React from 'react';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Loader from '../common/Loader';
import { Row, Col } from 'reactstrap';
import '../../assets/styles-css/style-landing/landing.css';

const Process = ({ title, description, image, inverse, children }) => {
  return (
    <Row className="flex-center mt-8 ">
      <Col md lg={5} xl={4} className={classNames('pl-lg-6 ', { 'order-md-2': inverse })}>
        <div className="style-process">
          <LazyLoad height={200} placeholder={<Loader />} offset={100} once>
            <img className="w-100 shadow p-3 mb-5 rounded grow" src={image} alt="" />
          </LazyLoad>
        </div>
      </Col>
      <Col md lg={5} xl={4} className="mt-4 mt-md-0">
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
        <p className="button-process d-inline">Ver más</p>
      </Col>
    </Row>
  );
};

Process.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  inverse: PropTypes.bool,
  children: PropTypes.node
};

Process.defaultProps = { inverse: false };

export default React.memo(Process);
