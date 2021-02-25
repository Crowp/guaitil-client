import React, { useContext, useState } from 'react';
import { faMapMarkedAlt, faStore } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import ProductForm from './steps/ProductForm';
import ReviewForm from './steps/ReviewForm';
import MultimediaForm from './steps/MultimediaForm';
import Success from '../Success';
import PriceForm from './steps/PriceForm';
import { ReviewContext } from '../../../../../context';
import WizardModal from '../../../../../components/WizardModal.js';
import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import '../../../../../../template/assets/styles-css/header-form/HeaderForm.css';

const FormSteps = ({ idLocal }) => {
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState(false);
  const { handleReviewUpdate, review } = useContext(ReviewContext);
  const { register, handleSubmit, errors } = useForm();
  const onSubmitData = () => {
    if (step === 4) {
      onSubmitReview();
    }
    setStep(step + 1);
  };

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

  const onSubmitReview = () => {
    handleReviewUpdate(review);
  };
  const steps = [
    { icon: faMapMarkedAlt, title: 'Tour' },
    { icon: faStore, title: 'Fecha' },
    { icon: 'user', title: 'Personal' },
    { icon: 'user', title: 'Personal' }
  ];

  return (
    <>
      <WizardModal toggle={toggle} modal={modal} setModal={setModal} />
      <FormStepsContainer
        onSubmit={handleSubmit(onSubmitData)}
        title="Revisando producto"
        handleGoBack={handleBackStep}
        steps={steps}
        activeStep={step}
      >
        {step === 1 && <ProductForm register={register} errors={errors} />}
        {step === 2 && <PriceForm register={register} errors={errors} />}
        {step === 3 && <MultimediaForm />}
        {step === 4 && <ReviewForm register={register} errors={errors} />}
        {step === 5 && <Success idLocal={idLocal} setStep={setStep} title="Se ha actualizado una revisión!" />}
      </FormStepsContainer>
    </>
  );
};
export default FormSteps;
