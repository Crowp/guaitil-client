import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap';
import '../../assets/styles-css/style-landing/landing.css';

const Process = ({ title, description, image, inverse, children }) => {
  return (
    <Row className="flex-center mt-8 ">
      <Col md lg={5} xl={4} className={classNames('pl-lg-6 ', { 'order-md-2': inverse })}>
        <div className="style-process">
          <img className="w-100 shadow p-3 mb-5 rounded grow" src={image} alt="" />
        </div>
      </Col>
      <Col md lg={5} xl={4} className="mt-4 mt-md-0">
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
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

export default Process;
