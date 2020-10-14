import React from 'react';
import { Col, Row, Spinner } from 'reactstrap';

const Loader = props => (
  <Row className="vh-100">
    <Col className="d-flex justify-content-center align-items-center">
      <Spinner {...props} />
    </Col>
  </Row>
);

Loader.propTypes = { ...Spinner.propTypes };

Loader.defaultProps = {
  type: 'grow',
  size: 'lg',
  color: 'primary'
};

export default Loader;
