import React, { useContext, useState, Fragment } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Form, Nav, NavItem, NavLink } from 'reactstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import PersonForm from './PersonForm';
import LocalForm from './LocalForm';
import Success from './Success';
import AppContext from '../../../template/context/Context';
import { PersonContext } from '../../context';

import WizardModal from './WizardModal';
import ButtonIcon from '../../components/common/ButtonIcon';

const FormSteps = () => {
  const { isRTL } = useContext(AppContext);
  const { associated, setAssociated, step, setStep } = useContext(PersonContext);
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmitData = data => {
    setAssociated({ ...associated, ...data });
    setStep(step + 1);
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleBackStep = targetStep => {
    if (step !== 3) {
      if (targetStep < step) {
        setStep(targetStep);
      }
    } else {
      toggle();
    }
  };

  return (
    <Fragment>
      <WizardModal toggle={toggle} modal={modal} setModal={setModal} />
      <Card tag={Form} onSubmit={handleSubmit(onSubmitData)} className="theme-wizard">
        <CardHeader className="bg-light">
          <Nav className="justify-content-center">
            <NavItem>
              <NavLink
                className={classNames('font-weight-semi-bold', {
                  'done cursor-pointer': step > 1,
                  active: step === 1
                })}
                onClick={() => handleBackStep(1)}
              >
                <span className="nav-item-circle-parent">
                  <span className="nav-item-circle">
                    <FontAwesomeIcon icon="lock" />
                  </span>
                </span>
                <span className="d-none d-md-block mt-1 fs--1">Personal</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames('font-weight-semi-bold', {
                  'done  cursor-pointer': step > 2,
                  active: step === 2
                })}
                onClick={() => handleBackStep(2)}
              >
                <span className="nav-item-circle-parent">
                  <span className="nav-item-circle">
                    <FontAwesomeIcon icon="user" />
                  </span>
                </span>
                <span className="d-none d-md-block mt-1 fs--1">Local</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames('font-weight-semi-bold', {
                  'done  cursor-pointer': step > 3
                })}
              >
                <span className="nav-item-circle-parent">
                  <span className="nav-item-circle">
                    <FontAwesomeIcon icon="thumbs-up" />
                  </span>
                </span>
                <span className="d-none d-md-block mt-1 fs--1">Done</span>
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody className="fs--1 font-weight-normal px-md-6 pt-4 pb-3">
          {step === 2 && <PersonForm register={register} errors={errors} watch={watch} />}
          {step === 1 && <LocalForm register={register} errors={errors} />}
          {step === 3 && <Success />}
        </CardBody>
        <CardFooter className={classNames('px-md-6 bg-light', { 'd-none': step === 4, ' d-flex': step < 4 })}>
          <ButtonIcon
            color="link"
            icon={isRTL ? 'chevron-right' : 'chevron-left'}
            iconAlign="left"
            transform="down-1 shrink-4"
            className={classNames('px-0 font-weight-semi-bold', { 'd-none': step === 1 })}
            onClick={() => {
              setStep(step - 1);
            }}
          >
            Prev
          </ButtonIcon>

          <ButtonIcon
            color="primary"
            className="ml-auto px-5"
            type="submit"
            icon={isRTL ? 'chevron-left' : 'chevron-right'}
            iconAlign="right"
            transform="down-1 shrink-4"
          >
            Next
          </ButtonIcon>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default FormSteps;
