import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReviewForm from './steps/ReviewForm';
import SuccessStep from '../form/steps/SuccessStep';
import { ReviewContext } from '../../../../../context';
import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import '../../../../../../template/assets/styles-css/header-form/HeaderForm.css';

const FormSteps = ({ idLocal }) => {
  const [activeStep, setActiveStep] = useState(1);
  const { handleReviewUpdate, review } = useContext(ReviewContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmitData = () => {
    if (activeStep === 1) {
      onSubmitReview();
    }
    setActiveStep(activeStep + 1);
  };

  const onSubmitReview = () => {
    handleReviewUpdate(review);
  };
  const steps = [{ icon: 'user', title: 'Revición' }];

  return (
    <FormStepsContainer
      onSubmit={handleSubmit(onSubmitData)}
      title="Revisando producto"
      setActiveStep={setActiveStep}
      steps={steps}
      activeStep={activeStep}
    >
      {activeStep === 1 && <ReviewForm register={register} errors={errors} />}
      {activeStep === 2 && <SuccessStep setStep={activeStep} title="Se ha actualizado una revisión!" />}
    </FormStepsContainer>
  );
};
export default FormSteps;
