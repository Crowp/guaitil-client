import React, { useContext, useState, Fragment } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Form, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faStore, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import MemberForm from './MemberForm';
import LocalForm from './LocalForm';
import AddressForm from './AddressForm';
import MultimediaForm from './MultimediaForm';
import Success from '../Success';
import AppContext from '../../../../../template/context/Context';
import { MemberContext, LocalContext, UserContext } from '../../../../context';
import WizardModal from '../../../../components/WizardModal.js';
import ButtonIcon from '../../../../components/common/ButtonIcon';
import MemberAction from '../../../../../stores/member/MemberAction';

const FormSteps = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [hasLocal, setHasLocal] = useState(true);
  const { isRTL } = useContext(AppContext);
  const { member } = useContext(MemberContext);
  const { user } = useContext(UserContext);
  const { local } = useContext(LocalContext);
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmitData = () => {
    if (!hasLocal) {
      onSubmitOnlyMember();
    } else if (step === 4) {
      onSubmitWithUserAndLocal();
    }
    setStep(hasLocal ? step + 1 : 5);
  };

  const [modal, setModal] = useState(false);

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

  const onSubmitOnlyMember = () => {
    dispatch(MemberAction.createMember(member));
  };

  const onSubmitWithUserAndLocal = () => {
    dispatch(MemberAction.createMemberWithUserWithLocal(member, user, local));
  };

  return (
    <Fragment>
      <WizardModal toggle={toggle} modal={modal} setModal={setModal} />
      <Card tag={Form} onSubmit={handleSubmit(onSubmitData)} className="theme-wizard">
        <CardHeader className="bg-light">
          <Row>
            <Col className="d-flex justify-content-center">
              <h5>Creando un miembro</h5>
            </Col>
          </Row>
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
                    <FontAwesomeIcon icon="user" />
                  </span>
                </span>
                <span className="d-none d-md-block mt-1 fs--1">Personal</span>
              </NavLink>
            </NavItem>
            {hasLocal && (
              <>
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
              </>
            )}
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
          {step === 1 && (
            <MemberForm register={register} errors={errors} hasLocal={hasLocal} setHasLocal={setHasLocal} />
          )}
          {step === 2 && <LocalForm register={register} errors={errors} watch={watch} />}
          {step === 3 && <AddressForm register={register} errors={errors} />}
          {step === 4 && <MultimediaForm />}
          {step === 5 && <Success setStep={setStep} title="Se ha creado un miembro!" />}
        </CardBody>
        <CardFooter className={classNames('px-md-6 bg-light', { 'd-none': step === 5, ' d-flex': step < 5 })}>
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
            {hasLocal ? 'Next' : 'Create'}
          </ButtonIcon>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default FormSteps;
