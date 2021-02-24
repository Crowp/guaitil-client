import React, { useContext, useState } from 'react';
import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import { faMapMarkedAlt, faStore } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import ActivityForm from './steps/ActivityForm';
import LocalsForm from './steps/LocalsForm';
import AddressForm from './steps/AddressForm';
import MultimediaForm from './steps/MultimediaForm';
import Success from './steps/SuccessStep';
import { ActivityContext } from '@/views/context';
import WizardModal from '../../../../../components/WizardModal.js';
import '@/template/assets/styles-css/header-form/HeaderForm.css';

const FormSteps = ({ isUpdate }) => {
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState(false);
  const { handleActivityCreate, handleActivityUpdate } = useContext(ActivityContext);
  const { register, handleSubmit, errors } = useForm();

  const handleBackStep = targetStep => {
    if (step !== 5) {
      if (targetStep < step) {
        setStep(targetStep);
      }
    } else {
      toggle();
    }
  };
  const onSubmitData = () => {
    if (step === 4) {
      onSubmitActivity();
    }
    setStep(step + 1);
  };

  const toggle = () => setModal(!modal);

  const onSubmitActivity = () => (isUpdate ? handleActivityUpdate() : handleActivityCreate());

  const steps = [
    { icon: faMapMarkedAlt, title: 'Actividad' },
    { icon: faStore, title: 'Local' },
    { icon: 'user', title: 'Dirección' },
    { icon: 'user', title: 'Multimedia' }
  ];
  return (
    <>
      <WizardModal toggle={toggle} modal={modal} setModal={setModal} />
      <FormStepsContainer
        onSubmit={handleSubmit(onSubmitData)}
        title={isUpdate ? 'Actualizando actividad' : 'Creando actividad'}
        handleGoBack={handleBackStep}
        steps={steps}
        activeStep={step}
      >
        {step === 1 && <ActivityForm register={register} errors={errors} />}
        {step === 2 && <LocalsForm register={register} errors={errors} />}
        {step === 3 && <AddressForm register={register} errors={errors} />}
        {step === 4 && <MultimediaForm />}
        {step === 5 && (
          <Success
            setStep={setStep}
            title={isUpdate ? 'Se ha actualizado una actividad' : 'Se ha creado una Actividad'}
          />
        )}
      </FormStepsContainer>
    </>
  );
};

export default FormSteps;
