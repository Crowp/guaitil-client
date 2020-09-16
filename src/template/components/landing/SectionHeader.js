import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const SectionHeader = ({ title, subtitle, ...rest }) => {
  return (
    <Row className="justify-content-center text-center" {...rest}>
      <Col>
        <h1 className="title-landing font-weight-light">{title}</h1>
        <h5 className="font-weight-light subtitle-landing">{subtitle}</h5>
      </Col>
    </Row>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default SectionHeader;
