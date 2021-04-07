import React, { useContext, useState } from 'react';
import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import { faMapMarkedAlt, faStore, faCloudUploadAlt, faHiking } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import ActivityForm from './steps/ActivityForm';
import LocalsForm from './steps/LocalsForm';
import AddressForm from './steps/AddressForm';
import MultimediaForm from './steps/MultimediaForm';
import Success from './steps/SuccessStep';
import { ActivityContext } from '@/views/context';
import '@/template/assets/styles-css/header-form/HeaderForm.css';

const FormSteps = ({ isUpdate }) => {
  const [step, setStep] = useState(2);
  const { handleActivityCreate, handleActivityUpdate } = useContext(ActivityContext);
  const { register, handleSubmit, errors, control } = useForm();

  const onSubmitData = () => {
    if (step === 4) {
      onSubmitActivity();
    }
    setStep(step + 1);
  };

  const onSubmitActivity = () => (isUpdate ? handleActivityUpdate() : handleActivityCreate());

  const steps = [
    { icon: faHiking, title: 'Actividad' },
    { icon: faStore, title: 'Local' },
    { icon: faMapMarkedAlt, title: 'Dirección' },
    { icon: faCloudUploadAlt, title: 'Multimedia' }
  ];
  return (
    <FormStepsContainer
      onSubmit={handleSubmit(onSubmitData)}
      title={isUpdate ? 'Actualizando actividad' : 'Creando actividad'}
      setActualStep={setStep}
      steps={steps}
      activeStep={step}
    >
      {step === 1 && <ActivityForm control={control} register={register} errors={errors} />}
      {step === 2 && <LocalsForm control={control} register={register} errors={errors} />}
      {step === 3 && <AddressForm register={register} errors={errors} />}
      {step === 4 && <MultimediaForm isUpdate={isUpdate} />}
      {step === 5 && (
        <Success
          setStep={setStep}
          title={isUpdate ? 'Se ha actualizado una actividad' : 'Se ha creado una Actividad'}
        />
      )}
    </FormStepsContainer>
  );
};

export default FormSteps;
