import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import WizardModal from '../../../../../components/WizardModal.js';
import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import { UserContext } from '@/views/context';

import Success from './steps/SuccessStep';
import UserForm from './steps/UserForm.js';

const FormSteps = ({ isUpdate }) => {
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState(false);
  const { handleUserCreate, handleUserUpdate } = useContext(UserContext);
  const { register, handleSubmit, errors, watch } = useForm();

  const handleBackStep = targetStep => {
    if (step !== 5) {
      if (targetStep < step) {
        setStep(targetStep);
      }
    } else {
      toggle();
    }
  };

  const toggle = () => setModal(!modal);

  const onSubmitData = () => {
    if (step === 4) {
      onSubmitUser();
    }
    setStep(step + 1);
  };

  const onSubmitUser = () => {
    if (isUpdate) {
      handleUserUpdate();
    } else {
      handleUserCreate();
    }
  };

  const steps = [{ icon: 'user', title: 'Personal' }];

  return (
    <>
      <WizardModal toggle={toggle} modal={modal} setModal={setModal} />
      <FormStepsContainer
        onSubmit={handleSubmit(onSubmitData)}
        title="Creando local"
        handleGoBack={handleBackStep}
        steps={steps}
        activeStep={step}
      >
        {step === 1 && <UserForm register={register} errors={errors} watch={watch} isUpdate={isUpdate} />}
        {step === 5 && (
          <Success setStep={setStep} title={isUpdate ? 'Se ha actualizado un local' : 'Se ha creado un local'} />
        )}
      </FormStepsContainer>
    </>
  );
};

export default FormSteps;
