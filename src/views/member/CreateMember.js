import React from 'react';
import { Col, Row } from 'reactstrap';
import FormSteps from './create_form/FormSteps';
import Section from '../components/common/Section';
import PersonProvider from '../providers/MemberProvider';

const CreateMember = () => {
  return (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <PersonProvider>
            <FormSteps />
          </PersonProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default CreateMember;
