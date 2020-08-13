import React from 'react';
import { Col, Row } from 'reactstrap';
import Logo from '../components/navbar/Logo';
import Section from '../components/common/Section';

const AuthBasicLayout = () => (
  <Section className="py-0">
    <Row className="flex-center min-vh-100 py-6">
      <Col sm={10} md={8} lg={6} xl={5} className="col-xxl-4">
        <Logo />
      </Col>
    </Row>
  </Section>
);

export default AuthBasicLayout;
