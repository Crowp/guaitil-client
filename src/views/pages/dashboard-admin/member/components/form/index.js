import React, { useContext, useEffect, useState } from 'react';
import { faMapMarkedAlt, faStore, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';

import WizardModal from '../../../../../components/WizardModal.js';
import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import { MemberContext } from '@/views/context';

import LocalForm from './steps/LocalForm';
import AddressForm from './steps/AddressForm';
import MultimediaForm from './steps/MultimediaForm';
import Success from './steps/SuccessStep';
import MemberForm from './steps/MemberForm';

const onlyMemberSteps = [{ icon: 'user', title: 'Personal' }];
const memberWithLocalSteps = [
  ...onlyMemberSteps,
  { icon: faStore, title: 'Local' },
  { icon: faMapMarkedAlt, title: 'Dirección' },
  { icon: faCloudUploadAlt, title: 'Multimedia' }
];

const FormSteps = ({ isUpdate }) => {
  const [actualStep, setActualStep] = useState(1);
  const [steps, setSteps] = useState(memberWithLocalSteps);
  const [modal, setModal] = useState(false);
  const { hasLocal, handleMemberCreate, handleMemberUpdate } = useContext(MemberContext);
  const { register, handleSubmit, errors, watch } = useForm();

  useEffect(() => {
    if (isUpdate) {
      setSteps(onlyMemberSteps);
    }
  }, [isUpdate]);

  useEffect(() => {
    if (hasLocal) {
      setSteps(memberWithLocalSteps);
    } else {
      setSteps(onlyMemberSteps);
    }
  }, [hasLocal]);

  const handleBackStep = targetStep => {
    if (actualStep !== 5) {
      if (targetStep < actualStep) {
        setActualStep(targetStep);
      }
    } else {
      toggle();
    }
  };

  const toggle = () => setModal(!modal);

  const onSubmitData = stepsLength => () => {
    if (actualStep === stepsLength) {
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

  return (
    <>
      <WizardModal toggle={toggle} modal={modal} setModal={setModal} />
      <FormStepsContainer
        onSubmit={handleSubmit(onSubmitData(steps.length))}
        title="Creando un miembro"
        handleGoBack={handleBackStep}
        steps={steps}
        activeStep={actualStep}
      >
        {actualStep === 1 && <MemberForm register={register} errors={errors} />}
        {actualStep === 2 && <LocalForm isUpdate={isUpdate} register={register} errors={errors} watch={watch} />}
        {actualStep === 3 && <AddressForm register={register} errors={errors} />}
        {actualStep === 4 && <MultimediaForm isUpdate={isUpdate} />}
        {actualStep === 5 && (
          <Success
            setStep={setActualStep}
            title={isUpdate ? 'Se ha actualizado un miembro' : 'Se ha creado un local'}
          />
        )}
      </FormStepsContainer>
    </>
  );
};

export default FormSteps;
