import React, { useContext, useState } from 'react';
import { faMapMarkedAlt, faStore, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';

import WizardModal from '@/views/components/WizardModal.js';
import FormStepsContainer from '@/views/components/forms/form-steps/FormStepsContainer';
import { LocalContext } from '@/views/context';

import LocalForm from './steps/LocalForm';
import AddressForm from './steps/AddressForm';
import MultimediaForm from './steps/MultimediaForm';
import Success from '../Success';
import MemberForm from './steps/MemberForm';

const FormSteps = () => {
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState(false);
  const { local } = useContext(LocalContext);
  const { register, handleSubmit, errors, control, watch } = useForm();

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
      onSubmitLocal();
    }
    if (step === 1) {
      if (!local.member?.id) {
        return;
      }
    }
    setStep(step + 1);
  };

  const onSubmitLocal = () => {};

  const steps = [
    { icon: 'user', title: 'Personal' },
    { icon: faStore, title: 'Local' },
    { icon: faMapMarkedAlt, title: 'Dirección' },
    { icon: faCloudUploadAlt, title: 'Multimedia' }
  ];

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
        {step === 1 && <MemberForm register={register} errors={errors} />}
        {step === 2 && <LocalForm register={register} errors={errors} watch={watch} />}
        {step === 3 && <AddressForm register={register} errors={errors} />}
        {step === 4 && <MultimediaForm />}
        {step === 5 && <Success setStep={setStep} title="Se ha creado un local!" />}
      </FormStepsContainer>
    </>
  );
};

export default FormSteps;
