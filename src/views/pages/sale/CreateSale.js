import React from 'react';
import { Col, Row } from 'reactstrap';
import FormSteps from './components/create/FormSteps';
import Section from '../../components/common/Section';
import SaleProvider from '../../providers/SaleProvider';

const CreateSale = () => {
  return (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <SaleProvider>
            <FormSteps />
          </SaleProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default CreateSale;