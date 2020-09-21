import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const SectionHeader = ({ title, subtitle, ...rest }) => {
  return (
    <Row className="justify-content-center text-center" {...rest}>
      <Col>
        <h1 className="font-weight-light h1">{title}</h1>
        <h5 className="font-weight-light h4">{subtitle}</h5>
      </Col>
    </Row>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default SectionHeader;
