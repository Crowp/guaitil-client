import React, { useContext, useState } from 'react';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Success from './steps/SuccessStep';
import PersonForm from './steps/PersonForm';
import ReservationForm from './steps/ReservationForm';
import { ReservationContext } from '../../../../../context';
import WizardModal from '../../../../../components/WizardModal.js';
import TourForm from './steps/TourForm';
import '@/template/assets/styles-css/header-form/HeaderForm.css';

const FormSteps = ({ isUpdate }) => {
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState(false);
  const { handleReservationCreate, handleReservationUpdate } = useContext(ReservationContext);
  const { register, handleSubmit, errors, watch } = useForm();

  const handleBackStep = targetStep => {
    if (step !== 3) {
      if (targetStep < step) {
        setStep(targetStep);
      }
    } else {
      toggle();
    }
  };

  const toggle = () => setModal(!modal);

  const onSubmitData = () => {
    if (step === 3) {
      onSubmitReservation();
    }
    setStep(step + 1);
  };

  const onSubmitReservation = () => {
    if (isUpdate) {
      handleReservationUpdate();
    } else {
      handleReservationCreate();
    }
  };

  const steps = [
    { icon: faMapMarkedAlt, title: 'Tour' },
    { icon: faStore, title: 'Fecha' },
    { icon: 'user', title: 'Personal' }
  ];

  return (
    <>
      <WizardModal toggle={toggle} modal={modal} setModal={setModal} />
      <FormStepsContainer
        onSubmit={handleSubmit(onSubmitData)}
        title="Creando reservación"
        handleGoBack={handleBackStep}
        steps={steps}
        activeStep={step}
      >
        {step === 1 && <TourForm register={register} errors={errors} />}
        {step === 2 && <ReservationForm isUpdate={isUpdate} register={register} errors={errors} watch={watch} />}
        {step === 3 && <PersonForm register={register} errors={errors} />}
        {step === 4 && (
          <Success setStep={setStep} title={isUpdate ? 'Se ha actualizado un local' : 'Se ha creado un local'} />
        )}
      </FormStepsContainer>
    </>
  );
};
export default FormSteps;
