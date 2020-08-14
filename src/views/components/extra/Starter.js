import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import editing from '../../../template/assets/img/illustrations/4.png';

const Starter = ({ title, description, actionName, action }) => (
  <Card>
    <CardBody className="overflow-hidden p-lg-6">
      <Row className="align-items-center justify-content-between">
        <Col lg={6} className="pl-lg-4 my-5 text-center text-lg-left">
          <h3>{title}</h3>
          <p className="lead">{description}</p>
          <Button className="btn btn-falcon-primary" onClick={() => action()}>
            {actionName}
          </Button>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

Starter.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  actionName: PropTypes.string,
  action: PropTypes.func
};

Starter.defaultProps = {
  title: 'Edit me!',
  description: 'Create Something Beautiful.',
  actionName: 'Getting started',
  action: () => {}
};

export default Starter;
