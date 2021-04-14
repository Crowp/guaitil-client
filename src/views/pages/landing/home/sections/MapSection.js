import React from 'react';
import { Row, Col } from 'reactstrap';
import { useVisibilityHook } from 'react-observer-api';
import Section from '../../../../../template/components/common/Section';
import SectionHeader from '../../../../../template/components/landing/SectionHeader';
import Map from '../../../../components/map';

const MapSection = () => {
  const { setElement, isVisible } = useVisibilityHook();

  return (
    <div ref={setElement}>
      {isVisible && (
        <Section bg="light" className="text-center">
          <SectionHeader title="¿Dónde puedes encontrarnos?" subtitle="" />
          <Row>
            <Col>
              <Map longitude={-85.510513} latitude={10.267172} />
            </Col>
          </Row>
        </Section>
      )}
    </div>
  );
};

export default MapSection;
