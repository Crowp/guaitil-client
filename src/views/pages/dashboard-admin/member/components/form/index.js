import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import { MemberContext } from '@/views/context';

import LocalForm from './steps/LocalForm';
import AddressForm from './steps/AddressForm';
import MultimediaForm from './steps/MultimediaForm';
import Success from './steps/SuccessStep';
import MemberForm from './steps/MemberForm';
import { useMemberSteps } from '../../../../../hooks';

const FormSteps = ({ isUpdate }) => {
  const [actualStep, setActualStep] = useState(1);
  const { hasLocal, handleMemberCreate, handleMemberUpdate } = useContext(MemberContext);
  const { register, handleSubmit, errors, watch, control } = useForm();

  const steps = useMemberSteps({ isUpdate, hasLocal });

  const onSubmitData = stepsLength => () => {
    if (actualStep === stepsLength - 1) {
      onSubmitLocal();
    }
    setActualStep(actualStep + 1);
  };
  const onSubmitLocal = () => {
    if (isUpdate) {
      handleMemberUpdate();
    } else {
      handleMemberCreate();
    }
  };
  const totalSteps = steps.length + 1;
  return (
    <FormStepsContainer
      onSubmit={handleSubmit(onSubmitData(totalSteps))}
      title={isUpdate ? 'Actualizar un miembro' : 'Creando un miembro'}
      setActualStep={setActualStep}
      steps={steps}
      activeStep={actualStep}
    >
      {actualStep === 1 && <MemberForm control={control} register={register} errors={errors} isUpdate={isUpdate} />}
      {!isUpdate && hasLocal && (
        <>
          {actualStep === 2 && <LocalForm isUpdate={isUpdate} register={register} errors={errors} watch={watch} />}
          {actualStep === 3 && <AddressForm register={register} errors={errors} />}
          {actualStep === 4 && <MultimediaForm isUpdate={isUpdate} />}
        </>
      )}
      {actualStep === totalSteps && (
        <Success
          setStep={setActualStep}
          title={isUpdate ? 'Se ha actualizado un miembro' : 'Se ha creado un miembro'}
        />
      )}
    </FormStepsContainer>
  );
};

export default FormSteps;
