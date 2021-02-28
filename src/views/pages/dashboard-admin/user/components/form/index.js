import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import { UserContext } from '@/views/context';

import Success from './steps/SuccessStep';
import UserForm from './steps/UserForm.js';

const FormSteps = ({ isUpdate }) => {
  const [step, setStep] = useState(1);
  const { handleUserCreate, handleUserUpdate } = useContext(UserContext);
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmitData = () => {
    if (step === 1) {
      onSubmitUser();
    }
    setStep(step + 1);
  };

  const onSubmitUser = () => {
    if (isUpdate) {
      handleUserUpdate();
    } else {
      console.log('12341234');
      handleUserCreate();
    }
  };

  const steps = [{ icon: 'user', title: 'Personal' }];

  return (
    <FormStepsContainer
      onSubmit={handleSubmit(onSubmitData)}
      title="Creando local"
      setActualStep={setStep}
      steps={steps}
      activeStep={step}
    >
      {step === 1 && <UserForm register={register} errors={errors} watch={watch} isUpdate={isUpdate} />}
      {step === 2 && (
        <Success setStep={setStep} title={isUpdate ? 'Se ha actualizado un local' : 'Se ha creado un local'} />
      )}
    </FormStepsContainer>
  );
};

export default FormSteps;
