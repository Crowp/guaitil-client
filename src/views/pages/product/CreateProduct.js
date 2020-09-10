import React from 'react';
import { Col, Row } from 'reactstrap';
import FormSteps from './component/create/FormSteps';
import Section from '../../components/common/Section';
import ProductProvider from '../../providers/ProductProvider';

const CreateProduct = () => {
  return (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <ProductProvider>
            <FormSteps />
          </ProductProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default CreateProduct;
