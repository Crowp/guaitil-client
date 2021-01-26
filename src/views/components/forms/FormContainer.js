import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import Section from '@/template/components/common/Section';

const FormContainer = ({ children }) => (
  <Section className="py-0">
    <Row className="flex-center align-items-start min-vh-75 py-3">
      <Col>{children}</Col>
    </Row>
  </Section>
);

FormContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default FormContainer;
