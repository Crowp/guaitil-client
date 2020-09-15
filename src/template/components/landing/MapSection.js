import React from 'react';
import { Row, Col } from 'reactstrap';
import className from 'classnames';
import serviceList from '../../data/feature/serviceList';
import Section from '../common/Section';
import CardService from './CardService';
import SectionHeader from './SectionHeader';
import Map from '../../../views/components/map';

const Services = () => (
  <Section bg="light" className="text-center">
    <SectionHeader title="¿Dónde puedes encontrarnos?" subtitle="" />
    <Row>
      <Col>
        <Map longitude={-85.5105849} latitude={10.2672084} />
      </Col>
    </Row>
  </Section>
);

export default Services;
