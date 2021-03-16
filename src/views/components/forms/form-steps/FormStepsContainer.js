import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Card, CardBody, CardFooter, Form } from 'reactstrap';

import ButtonIcon from '@/template/components/common/ButtonIcon';
import AppContext from '@/template/context/Context';

import StepsHeader from './StepsHeader';
import WizardModal from '../../WizardModal';

const FormStepsContainer = ({ onSubmit, activeStep, setActualStep, steps, nextButtonText, title, children }) => {
  const [modal, setModal] = useState(false);
  const { isRTL } = useContext(AppContext);

  const toggle = () => setModal(!modal);

  const handleGoBack = targetStep => {
    if (activeStep !== steps.length + 1) {
      if (targetStep < activeStep) {
        setActualStep(targetStep);
      }
    } else {
      toggle();
    }
  };

  const total = steps.length + 1;
  const isTheLastStep = steps.length === activeStep;

  return (
    <>
      <WizardModal toggle={toggle} modal={modal} setModal={setModal} />
      <Card tag={Form} onSubmit={onSubmit} className="theme-wizard">
        <StepsHeader title={title} steps={steps} activeStep={activeStep} handleGoBack={handleGoBack} />
        <CardBody className="fs--1 font-weight-normal px-md-6 pt-4 pb-3">{children}</CardBody>
        <CardFooter
          className={classNames('px-md-6 bg-light', { 'd-none': activeStep === total, ' d-flex': activeStep < total })}
        >
          <ButtonIcon
            color="link"
            icon={isRTL ? 'chevron-right' : 'chevron-left'}
            iconAlign="left"
            transform="down-1 shrink-4"
            className={classNames('px-0 font-weight-semi-bold', { 'd-none': activeStep === 1 })}
            onClick={() => {
              handleGoBack(activeStep - 1);
            }}
          >
            Anterior
          </ButtonIcon>
          <ButtonIcon
            color="primary"
            className="ml-auto"
            type="submit"
            icon={isRTL ? 'chevron-left' : 'chevron-right'}
            iconAlign="right"
            transform="down-1 shrink-4"
          >
            {isTheLastStep ? 'Finalizar' : nextButtonText}
          </ButtonIcon>
        </CardFooter>
      </Card>
    </>
  );
};

FormStepsContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setActualStep: PropTypes.func,
  nextButtonText: PropTypes.string,
  steps: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

FormStepsContainer.defaultProps = {
  nextButtonText: 'Siguiente'
};
export default FormStepsContainer;
