import React, { useContext, useState, Fragment } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Form, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Success from '../Success';
import SaleForm from './SaleEditForm';
import AppContext from '../../../../../template/context/Context';
import { SaleContext } from '../../../../context';
import WizardModal from '../../../../components/WizardModal.js';
import ButtonIcon from '../../../../components/common/ButtonIcon';
import ProductForm from './ProductEditForm';
import SaleAction from '../../../../../stores/sale/SaleAction';
import '../../../../../template/assets/styles-css/header-form/HeaderForm.css';

const FormSteps = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const { isRTL } = useContext(AppContext);
  const { sale } = useContext(SaleContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmitData = () => {
    if (step === 2) {
      onSubmitSale();
    }
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

  const onSubmitSale = () => {
    dispatch(SaleAction.updateSale(sale));
  };

  return (
    <Fragment>
      <WizardModal toggle={toggle} modal={modal} setModal={setModal} />
      <Card tag={Form} onSubmit={handleSubmit(onSubmitData)} className="theme-wizard">
        <CardHeader className="bg-light">
          <Row>
            <Col className="d-flex justify-content-center header-tittle">
              <h5>Editando una venta</h5>
            </Col>
          </Row>
          <Nav className="justify-content-center">
            <NavItem>
              <NavLink
                className={classNames('font-weight-semi-bold', {
                  'done  cursor-pointer': step > 1,
                  active: step === 1
                })}
                onClick={() => handleBackStep(1)}
              >
                <span className="nav-item-circle-parent">
                  <span className="nav-item-circle">
                    <FontAwesomeIcon icon={faStore} />
                  </span>
                </span>
                <span className="d-none d-md-block mt-1 fs--1">Producto</span>
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
                    <FontAwesomeIcon icon={faMapMarkedAlt} />
                  </span>
                </span>
                <span className="d-none d-md-block mt-1 fs--1">Venta</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames('font-weight-semi-bold', {
                  'done  cursor-pointer': step > 2
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
          {step === 1 && <ProductForm register={register} errors={errors} />}
          {step === 2 && <SaleForm register={register} errors={errors} />}
          {step === 3 && <Success setStep={setStep} title="Se ha creado una venta!" />}
        </CardBody>
        <CardFooter className={classNames('px-md-6 bg-light', { 'd-none': step === 3, ' d-flex': step < 3 })}>
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
