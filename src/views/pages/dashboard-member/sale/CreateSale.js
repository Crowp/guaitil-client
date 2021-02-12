import React from 'react';
import { useSalesEffect } from '../../../hooks';
import FormSaleContainer from './components/FormSaleContainer';

const CreateSale = () => {
  const { isRequesting } = useSalesEffect();
  return <FormSaleContainer isloading={isRequesting} />;
};

export default CreateSale;
