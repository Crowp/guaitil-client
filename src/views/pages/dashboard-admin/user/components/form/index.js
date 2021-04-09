import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import { UserContext } from '@/views/context';

import Success from './steps/SuccessStep';
import UserForm from './steps/UserForm.js';

const FormSteps = ({ isUpdate }) => {
  const [step, setStep] = useState(1);
  const { handleUserCreate, handleUserUpdate } = useContext(UserContext);
  const { register, handleSubmit, errors, watch, control } = useForm();

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
      handleUserCreate();
    }
  };

  const steps = [{ icon: 'user', title: 'Personal' }];

  return (
    <FormStepsContainer
      onSubmit={handleSubmit(onSubmitData)}
      title={isUpdate ? 'Resetear contraseña de administrador' : 'Creando un administrador'}
      setActualStep={setStep}
      steps={steps}
      activeStep={step}
    >
      {step === 1 && <UserForm control={control} register={register} errors={errors} />}
      {step === 2 && (
        <Success setStep={setStep} title={isUpdate ? 'Se ha actualizado un local' : 'Se ha creado un local'} />
      )}
    </FormStepsContainer>
  );
};

export default FormSteps;
