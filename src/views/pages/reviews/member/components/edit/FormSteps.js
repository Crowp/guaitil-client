import React, { useContext, useState, Fragment } from 'react';
import { Card, CardBody, CardFooter, Form, Row, Col } from 'reactstrap';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import ReviewForm from './ReviewForm';
import AppContext from '../../../../../../template/context/Context';
import { ReviewContext } from '../../../../../context';
import WizardModal from '../../../../../components/WizardModal.js';
import ButtonIcon from '../../../../../components/common/ButtonIcon';
import '../../../../../../template/assets/styles-css/header-form/HeaderForm.css';
import { useHistory } from 'react-router-dom';
import { ReviewStateEnum } from '../../../../../../constants';

const FormSteps = () => {
  const [step, setStep] = useState(1);
  const history = useHistory();
  const { isRTL } = useContext(AppContext);
  const { review } = useContext(ReviewContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmitData = () => {
    if (step === 1) {
      onSubmitGoToEditProduct();
    }
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onSubmitGoToEditProduct = () => {
    if (ReviewStateEnum.Accept == review.state) {
      history.push(`/member/locals/dashboard/${review.product.local.id}`);
    } else {
      history.push(`/member/locals/dashboard/${review.product.local.id}/product/edit/${review.product.id}`);
    }
  };

  return (
    <Fragment>
      <WizardModal toggle={toggle} modal={modal} setModal={setModal} />
      <Card tag={Form} onSubmit={handleSubmit(onSubmitData)} className="theme-wizard">
        <Row>
          <Col className="d-flex justify-content-center header-tittle mt-3">
            <h5>Revisión</h5>
          </Col>
        </Row>
        <CardBody className="fs--1 font-weight-normal px-md-6 pt-4 pb-3">
          {step === 1 && <ReviewForm register={register} errors={errors} />}
        </CardBody>
        <CardFooter
          className={classNames('d-flex justify-content-center bg-light', {
            'd-none': step === 5,
            ' d-flex': step < 5
          })}
        >
          <ButtonIcon
            color="primary"
            type="submit"
            icon={isRTL ? 'chevron-left' : 'chevron-right'}
            iconAlign="right"
            transform="down-1 shrink-4"
          >
            {ReviewStateEnum.Accept == review.state ? 'Ir al local' : 'Editar Producto'}
          </ButtonIcon>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default FormSteps;
