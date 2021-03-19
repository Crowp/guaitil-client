import React, { useContext, useState } from 'react';
import { faMapMarkedAlt, faStore, faCheckCircle, faImage } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import ProductForm from './steps/ProductForm';
import ReviewForm from './steps/ReviewForm';
import MultimediaForm from './steps/MultimediaForm';
import SuccessStep from '../form/steps/SuccessStep';
import PriceForm from './steps/PriceForm';
import { ReviewContext } from '../../../../../context';
import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import '../../../../../../template/assets/styles-css/header-form/HeaderForm.css';

const FormSteps = () => {
  const [step, setStep] = useState(1);
  const { handleReviewUpdate, review } = useContext(ReviewContext);
  const { register, handleSubmit, errors, control } = useForm();
  const onSubmitData = () => {
    if (step === 4) {
      onSubmitReview();
    }
    setStep(step + 1);
  };

  const onSubmitReview = () => {
    handleReviewUpdate(review);
  };
  const steps = [
    { icon: faMapMarkedAlt, title: 'Tour' },
    { icon: faStore, title: 'Fecha' },
    { icon: faImage, title: 'Multimedia' },
    { icon: faCheckCircle, title: 'Revisión' }
  ];

  return (
    <FormStepsContainer
      onSubmit={handleSubmit(onSubmitData)}
      title="Revisando producto"
      setActualStep={setStep}
      steps={steps}
      activeStep={step}
    >
      {step === 1 && <ProductForm control={control} register={register} errors={errors} />}
      {step === 2 && <PriceForm register={register} errors={errors} />}
      {step === 3 && <MultimediaForm />}
      {step === 4 && <ReviewForm control={control} register={register} errors={errors} />}
      {step === 5 && <SuccessStep setStep={setStep} title="Se ha actualizado una revisión!" />}
    </FormStepsContainer>
  );
};
export default FormSteps;
