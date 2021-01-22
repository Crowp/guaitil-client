import React from 'react';
import PropTypes from 'prop-types';
import { CardHeader, Nav, Row, Col } from 'reactstrap';

import StepsHeaderItem from './StepsHeaderItem';

const StepsHeader = ({ title, steps, activeStep, handleGoBack }) => {
  return (
    <CardHeader className="bg-light">
      <Row>
        <Col className="d-flex justify-content-center">
          <h5>{title}</h5>
        </Col>
      </Row>
      <Nav className="justify-content-center">
        {steps.map(({ icon, title }, index) => (
          <StepsHeaderItem
            key={`step-item${index}-${title}`}
            order={index + 1}
            onGoBack={handleGoBack}
            icon={icon}
            title={title}
            activeStep={activeStep}
          />
        ))}
        <StepsHeaderItem order={steps.length + 1} activeStep={activeStep} icon="thumbs-up" title="Finalizado" />
      </Nav>
    </CardHeader>
  );
};
const StepItem = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired
};

StepsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape(StepItem)),
  activeStep: PropTypes.number.isRequired
};

StepsHeader.defaultProps = {
  steps: []
};

export default StepsHeader;
