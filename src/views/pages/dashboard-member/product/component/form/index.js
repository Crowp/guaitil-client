import React, { useContext, useState } from 'react';
import { faStore, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import { useForm } from 'react-hook-form';
import Success from './steps/SuccessStep';
import { ProductContext } from '../../../../../context';
import '@/template/assets/styles-css/header-form/HeaderForm.css';
import ProductForm from './steps/ProductForm';
import PriceForm from './steps/PriceForm';
import MultimediaForm from './steps/MultimediaForm';

const FormSteps = ({ isUpdate }) => {
  const [step, setStep] = useState(1);
  const { handleProductCreate, handleProductUpdate } = useContext(ProductContext);
  const { register, handleSubmit, errors, control } = useForm();

  const onSubmitData = () => {
    if (step === 3) {
      onSubmitProduct();
    }
    setStep(step + 1);
  };

  const onSubmitProduct = () => {
    isUpdate ? handleProductUpdate() : handleProductCreate();
  };

  const steps = [
    { icon: 'user', title: 'Personal' },
    { icon: faStore, title: 'Local' },
    { icon: faCloudUploadAlt, title: 'Multimedia' }
  ];

  return (
    <FormStepsContainer
      onSubmit={handleSubmit(onSubmitData)}
      title="Creando producto"
      setActualStep={setStep}
      steps={steps}
      activeStep={step}
    >
      {step === 1 && <ProductForm control={control} register={register} errors={errors} />}
      {step === 2 && <PriceForm register={register} errors={errors} />}
      {step === 3 && <MultimediaForm isUpdate={isUpdate} />}
      {step === 4 && (
        <Success setStep={setStep} title={isUpdate ? 'Se ha actualizado un producto' : 'Se ha creado un producto'} />
      )}
    </FormStepsContainer>
  );
};

export default FormSteps;
