import React from 'react';
import { useSalesEffect } from '../../../hooks';
import FormSaleContainer from './components/FormSaleContainer';

const CreateSale = () => {
  const { isRequesting: isRequestingSales } = useSalesEffect();
  return <FormSaleContainer isloading={isRequestingSales} />;
};

export default CreateSale;
