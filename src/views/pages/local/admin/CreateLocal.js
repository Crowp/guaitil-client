import React from 'react';
import { Col, Row } from 'reactstrap';
import FormSteps from './components/create/FormSteps';
import Section from '../../../../template/components/common/Section';
import MemberProvider from '../../../providers/MemberProvider';
import LocalProvider from '../../../providers/LocalProvider';
import UserProvider from '../../../providers/UserProvider';

const CreateLocal = () => {
  return (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <MemberProvider>
            <LocalProvider>
              <UserProvider>
                <FormSteps />
              </UserProvider>
            </LocalProvider>
          </MemberProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default CreateLocal;
