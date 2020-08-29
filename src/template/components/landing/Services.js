import React from 'react';
import { Row, Col } from 'reactstrap';
import className from 'classnames';
import serviceList from '../../data/feature/serviceList';
import Section from '../common/Section';
import CardService from './CardService';
import SectionHeader from './SectionHeader';

const Services = () => (
  <Section bg="light" className="text-center">
    <SectionHeader
      title="Nuestra Misión"
      subtitle="Brindar bienestar comunal promoviendo el desarrollo integral de Guaitil"
    />
    <SectionHeader
      title="Nuestra Vision"
      subtitle="Ser la Asociación de Desarrollo Integral líder en la promoción del desarrollo comunal, posicionando a
              Guaitil a nivel provincial como un punto de turismo rural cultural comunitario"
    />
    <Row className="mt-6">
      {serviceList.map((service, index) => (
        <Col lg={4} className={className({ 'mt-6 mt-lg-0': index > 0 })} key={index}>
          <CardService {...service} />
        </Col>
      ))}
    </Row>
  </Section>
);

export default Services;
