import React, { useContext, useState, Fragment } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Form, Nav, NavItem, NavLink } from 'reactstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faMapMarkedAlt, faStore, faStar } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ActivityForm from './ActivityForm';
// import LocalForm from './LocalForm';
import AddressForm from './AddressForm';
import MultimediaForm from './MultimediaForm';
import Success from '../Success';
import AppContext from '../../../../template/context/Context';
import { ActivityContext } from '../../../context';
import WizardModal from '../../../components/WizardModal.js';
import ButtonIcon from '../../../components/common/ButtonIcon';
import ActivityAction from '../../../../stores/activity/ActivityAction';

const FormSteps = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState(false);
  const { isRTL } = useContext(AppContext);
  const { activity } = useContext(ActivityContext);

  const { register, handleSubmit, errors } = useForm();

  const onSubmitData = () => {
    if (step === 3) {
      onSubmitActivity();
    }
    setStep(step + 1);
  };

  const toggle = () => setModal(!modal);

  const handleBackStep = targetStep => {
    if (step !== 5) {
      if (targetStep < step) {
        setStep(targetStep);
      }
    } else {
      toggle();
    }
  };

  const onSubmitActivity = () => {
    dispatch(ActivityAction.createActivity(activity));
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
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                </span>
                <span className="d-none d-md-block mt-1 fs--1">Actividad</span>
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
                    <FontAwesomeIcon icon={faStore} />
                  </span>
                </span>
                <span className="d-none d-md-block mt-1 fs--1">Local</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames('font-weight-semi-bold', {
                  'done  cursor-pointer': step > 3,
                  active: step === 3
                })}
                onClick={() => handleBackStep(3)}
              >
                <span className="nav-item-circle-parent">
                  <span className="nav-item-circle">
                    <FontAwesomeIcon icon={faMapMarkedAlt} />
                  </span>
                </span>
                <span className="d-none d-md-block mt-1 fs--1">Dirección</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames('font-weight-semi-bold', {
                  'done  cursor-pointer': step > 4,
                  active: step === 4
                })}
                onClick={() => handleBackStep(4)}
              >
                <span className="nav-item-circle-parent">
                  <span className="nav-item-circle">
                    <FontAwesomeIcon icon={faCloudUploadAlt} />
                  </span>
                </span>
                <span className="d-none d-md-block mt-1 fs--1">Multimedia</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames('font-weight-semi-bold', {
                  'done  cursor-pointer': step > 4
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
          {step === 1 && <ActivityForm register={register} errors={errors} />}
          {step === 2 && <AddressForm register={register} errors={errors} />}
          {step === 3 && <MultimediaForm />}
          {step === 4 && <Success setStep={setStep} title="Se ha creado un miembro!" />}
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
