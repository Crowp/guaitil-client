import React from 'react';
import { Row, Col } from 'reactstrap';
import Section from '../../../../../template/components/common/Section';
import SectionHeader from '../../../../../template/components/landing/SectionHeader';
import Map from '../../../../components/map';

const MapSection = () => {
  return (
    <Section bg="light" className="text-center">
      <SectionHeader title="¿Dónde puedes encontrarnos?" subtitle="" />
      <Row>
        <Col>
          <Map longitude={-10.26546573638916} latitude={-85.50828552246094} />
        </Col>
      </Row>
    </Section>
  );
};

export default MapSection;
