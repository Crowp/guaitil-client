import React, { useContext, useState, Fragment } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Form, Nav, NavItem, NavLink } from 'reactstrap';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faStore, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import MemberEditForm from './MemberEditForm';
import LocalForm from '../LocalForm';
import AddressForm from '../AddressForm';
import MultimediaForm from '../MultimediaForm';
import Success from '../Success';
import AppContext from '../../../../template/context/Context';
import { MemberContext, LocalContext } from '../../../context';
import MemberAction from '../../../../stores/member/MemberAction';

import WizardModal from '../../../components/WizardModal.js';
import ButtonIcon from '../../../components/common/ButtonIcon';

const FormEditSteps = props => {
  const [step, setStep] = useState(1);
  const { isRTL } = useContext(AppContext);
  const dispatch = useDispatch();
  const { member, setMember } = useContext(MemberContext);
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmitData = ({ confirmPassword, ...rest }) => {
    if (step === 1) {
      onSubmitEditMember(member);
    }
    setStep(step + 1);
  };

  const onSubmitEditMember = member => {
    dispatch(MemberAction.updateMember(member));
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
                    <FontAwesomeIcon icon="user" />
                  </span>
                </span>
                <span className="d-none d-md-block mt-1 fs--1">Personal</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames('font-weight-semi-bold', {
                  'done  cursor-pointer': step > 1
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
          {step === 1 && <MemberEditForm memberEdit={props.member} register={register} errors={errors} />}
          {step === 2 && <Success setStep={setStep} />}
        </CardBody>
        <CardFooter className={classNames('px-md-6 bg-light', { 'd-none': step === 2, ' d-flex': step < 2 })}>
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
            Update
          </ButtonIcon>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default FormEditSteps;
