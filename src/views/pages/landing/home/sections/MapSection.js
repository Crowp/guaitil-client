import React from 'react';
import { Row, Col } from 'reactstrap';
import Section from '../../../../../template/components/common/Section';
import SectionHeader from '../../../../../template/components/landing/SectionHeader';
import Map from '../../../../components/map';

const MapSection = () => {
  return (
    <Section bg="light" className="text-center">
      <p className="h1 font-weight-light">¿Dónde puedes encontrarnos?</p>
      <Row>
        <Col>
          <Map longitude={-85.50828552246094} latitude={10.26546573638916} />
        </Col>
      </Row>
    </Section>
  );
};

export default MapSection;
