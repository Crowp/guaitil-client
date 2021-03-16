import React, { useContext, useState } from 'react';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Success from './steps/SuccessStep';
import SaleForm from './steps/SaleForm';
import { SaleContext } from '../../../../../context';
import ProductForm from './steps/ProductForm';
import FormStepsContainer from '../../../../../components/forms/form-steps/FormStepsContainer';
import '@/template/assets/styles-css/header-form/HeaderForm.css';

const FormSteps = ({ isUpdate }) => {
  const [step, setStep] = useState(1);
  const { handleSaleCreate, handleSaleUpdate } = useContext(SaleContext);
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmitData = () => {
    if (step === 2) {
      onSubmitSale();
    }
    setStep(step + 1);
  };

  const onSubmitSale = () => {
    if (isUpdate) {
      handleSaleUpdate();
    } else {
      handleSaleCreate();
    }
  };

  const steps = [{ icon: 'user', title: 'Producto' }, { icon: faStore, title: 'Detalles' }];

  return (
    <FormStepsContainer
      onSubmit={handleSubmit(onSubmitData)}
      title={isUpdate ? 'Actualizando venta' : 'Creando venta'}
      setActualStep={setStep}
      steps={steps}
      activeStep={step}
    >
      {step === 1 && <ProductForm register={register} errors={errors} />}
      {step === 2 && <SaleForm register={register} errors={errors} watch={watch} />}
      {step === 3 && (
        <Success setStep={setStep} title={isUpdate ? 'Se ha actualizado una venta' : 'Se ha creado una venta'} />
      )}
    </FormStepsContainer>
  );
};

export default FormSteps;
