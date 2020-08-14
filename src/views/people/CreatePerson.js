import React from 'react';
import { Col, Row } from 'reactstrap';
import FormSteps from './create_form/FormSteps';
import Section from '../components/common/Section';
import AuthWizardProvider from './create_form/AuthWizardProvider';

const WizardLayout = () => {
  return (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <AuthWizardProvider>
            <FormSteps />
          </AuthWizardProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default WizardLayout;
