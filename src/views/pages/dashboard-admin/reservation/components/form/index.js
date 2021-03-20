import React, { useContext, useState } from 'react';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Success from './steps/SuccessStep';
import PersonForm from './steps/PersonForm';
import ReservationForm from './steps/ReservationForm';
import { ReservationContext } from '../../../../../context';
import TourForm from './steps/TourForm';
import '@/template/assets/styles-css/header-form/HeaderForm.css';

const FormSteps = ({ isUpdate }) => {
  const [step, setStep] = useState(1);
  const { handleReservationCreate, handleReservationUpdate } = useContext(ReservationContext);
  const { register, handleSubmit, errors, watch, control } = useForm();

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
    <FormStepsContainer
      onSubmit={handleSubmit(onSubmitData)}
      title={isUpdate ? 'Actualizando reservación' : 'Creando reservación'}
      setActualStep={setStep}
      steps={steps}
      activeStep={step}
    >
      {step === 1 && <TourForm register={register} errors={errors} control={control} />}
      {step === 2 && <ReservationForm isUpdate={isUpdate} register={register} errors={errors} watch={watch} />}
      {step === 3 && <PersonForm control={control} register={register} errors={errors} />}
      {step === 4 && (
        <Success
          setStep={setStep}
          title={isUpdate ? 'Se ha actualizado una reservacion' : 'Se ha creado una reservacion'}
        />
      )}
    </FormStepsContainer>
  );
};
export default FormSteps;
