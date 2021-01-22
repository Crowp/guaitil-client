import React from 'react';
import { Col, Row } from 'reactstrap';
import FormSteps from './components/create/FormSteps';
import Section from '@/template/components/common/Section';
import ActivityProvider from '../../../providers/ActivityProvider';

const CreateActivity = () => {
  return (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <ActivityProvider>
            <FormSteps />
          </ActivityProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default CreateActivity;
