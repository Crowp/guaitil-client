import React, { useContext, useState } from 'react';
import { faStore, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import WizardModal from '../../../../../components/WizardModal.js';
import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import { useForm } from 'react-hook-form';
import Success from './steps/SuccessStep';
import { ProductContext } from '../../../../../context';
import '@/template/assets/styles-css/header-form/HeaderForm.css';
import ProductForm from './steps/ProductForm';
import { useSelector } from 'react-redux';
import PriceForm from './steps/PriceForm';
import MultimediaForm from './steps/MultimediaForm';

const FormSteps = ({ idLocal, isUpdate }) => {
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState(false);
  const { handleProductCreate, handleProductUpdate } = useContext(ProductContext);
  const { register, handleSubmit, errors } = useForm();

  const handleBackStep = targetStep => {
    if (step !== 4) {
      if (targetStep < step) {
        setStep(targetStep);
      }
    } else {
      toggle();
    }
  };

  const onSubmitData = () => {
    if (step === 3) {
      onSubmitProduct();
    }
    setStep(step + 1);
  };

  const toggle = () => setModal(!modal);

  const onSubmitProduct = () => {
    isUpdate ? handleProductUpdate() : handleProductCreate();
  };

  const steps = [
    { icon: 'user', title: 'Personal' },
    { icon: faStore, title: 'Local' },
    { icon: faCloudUploadAlt, title: 'Multimedia' }
  ];
  //6const { locals } = useSelector(state => state);
  //const localFounded = locals.filter(local => local.id === idLocal);
  //console.log(locals);

  return (
    <>
      <WizardModal toggle={toggle} modal={modal} setModal={setModal} />
      <FormStepsContainer
        onSubmit={handleSubmit(onSubmitData)}
        title="Creando producto"
        handleGoBack={handleBackStep}
        steps={steps}
        activeStep={step}
      >
        {step === 1 && <ProductForm register={register} errors={errors} />}
        {step === 2 && <PriceForm register={register} errors={errors} />}
        {step === 3 && <MultimediaForm isUpdate={isUpdate} />}
        {step === 4 && (
          <Success
            idLocal={idLocal}
            setStep={setStep}
            title={isUpdate ? 'Se ha actualizado un producto' : 'Se ha creado un producto'}
          />
        )}
      </FormStepsContainer>
    </>
  );
};

export default FormSteps;
