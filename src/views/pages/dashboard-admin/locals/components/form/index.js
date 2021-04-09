import React, { useContext, useState } from 'react';
import { faMapMarkedAlt, faStore, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';

import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import { LocalContext } from '@/views/context';

import LocalForm from './steps/LocalForm';
import AddressForm from './steps/AddressForm';
import MultimediaForm from './steps/MultimediaForm';
import Success from './steps/SuccessStep';
import MemberForm from './steps/MemberForm';

const FormSteps = ({ isUpdate }) => {
  const [step, setStep] = useState(1);
  const { local, handleLocalCreate, handleLocalUpdate } = useContext(LocalContext);
  const { register, handleSubmit, errors, watch, control } = useForm();

  const onSubmitData = () => {
    if (step === 4) {
      onSubmitLocal();
    }
    if (step === 1) {
      if (!local.member?.id) {
        return;
      }
    }
    setStep(step + 1);
  };

  const onSubmitLocal = () => {
    if (isUpdate) {
      handleLocalUpdate();
    } else {
      handleLocalCreate();
    }
  };

  const steps = [
    { icon: 'user', title: 'Personal' },
    { icon: faStore, title: 'Local' },
    { icon: faMapMarkedAlt, title: 'Dirección' },
    { icon: faCloudUploadAlt, title: 'Multimedia' }
  ];

  return (
    <FormStepsContainer
      onSubmit={handleSubmit(onSubmitData)}
      title={isUpdate ? 'Actualizando un local' : 'Creando local'}
      setActualStep={setStep}
      steps={steps}
      activeStep={step}
    >
      {step === 1 && <MemberForm control={control} register={register} errors={errors} isUpdate={isUpdate} />}
      {step === 2 && <LocalForm control={control} register={register} errors={errors} />}
      {step === 3 && <AddressForm register={register} errors={errors} />}
      {step === 4 && <MultimediaForm isUpdate={isUpdate} />}
      {step === 5 && (
        <Success setStep={setStep} title={isUpdate ? 'Se ha actualizado un local' : 'Se ha creado un local'} />
      )}
    </FormStepsContainer>
  );
};

export default FormSteps;
