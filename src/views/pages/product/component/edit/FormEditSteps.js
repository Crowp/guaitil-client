import React, { useContext, useState, Fragment } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Form, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faStore, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ProductForm from './ProductEditForm';
import MultimediaForm from './MultimediaEditForm';
import Success from '../Success';
import PriceForm from './PriceEditForm';
import AppContext from '../../../../../template/context/Context';
import { ProductContext } from '../../../../context';
import WizardModal from '../../../../components/WizardModal.js';
import ButtonIcon from '../../../../components/common/ButtonIcon';
import ProductAction from '../../../../../stores/product/ProductAction';
import '../../../../../template/assets/styles-css/header-form/HeaderForm.css';

const FormSteps = ({ idLocal }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const { isRTL } = useContext(AppContext);
  const [hasLocal, setHasLocal] = useState(true);
  const { product } = useContext(ProductContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmitData = () => {
    if (step === 3) {
      onSubmitProduct();
    }
    if (step === 1) {
      if (!product.local?.id) {
        return;
      }
    }
    setStep(step + 1);
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleBackStep = targetStep => {
    if (step !== 4) {
      if (targetStep < step) {
        setStep(targetStep);
      }
    } else {
      toggle();
    }
  };

  const onSubmitProduct = () => {
    dispatch(ProductAction.updateProduct(product));
  };

  return (
    <Fragment>
      <WizardModal toggle={toggle} modal={modal} setModal={setModal} />
      <Card tag={Form} onSubmit={handleSubmit(onSubmitData)} className="theme-wizard">
        <Row>
          <Col className="d-flex justify-content-center header-tittle">
            <h5>Creando un local</h5>
          </Col>
        </Row>
        <CardHeader className="bg-light">
          <Nav className="justify-content-center">
            <>
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
                  <span className="d-none d-md-block mt-1 fs--1">Precio</span>
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
                      <FontAwesomeIcon icon={faCloudUploadAlt} />
                    </span>
                  </span>
                  <span className="d-none d-md-block mt-1 fs--1">Multimedia</span>
                </NavLink>
              </NavItem>
            </>
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
          {step === 1 && <ProductForm register={register} errors={errors} />}
          {step === 2 && <PriceForm register={register} errors={errors} />}
          {step === 3 && <MultimediaForm />}
          {step === 4 && <Success idLocal={idLocal} setStep={setStep} title="Se ha creado un local!" />}
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
            {hasLocal ? 'Next' : 'Create'}
          </ButtonIcon>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default FormSteps;
