import React from 'react';
import { Row, Col } from 'reactstrap';
import bg2 from '../../assets/img/generic/bg-2.jpg';
import Section from '../common/Section';

const Cta = () => (
  <Section overlay image={bg2} position="center top">
    <Row className="justify-content-center text-center">
      <Col lg={8}>
        <p className="fs-3 fs-sm-4 text-white">Ven y visita los diferentes locales</p>
      </Col>
    </Row>
  </Section>
);

export default Cta;
