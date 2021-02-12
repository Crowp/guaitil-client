import React from 'react';
import FormProductContainer from './component/FormProductContainer';

const CreateProduct = ({
  match: {
    params: { localId }
  }
}) => {
  return <FormProductContainer localId={localId} />;
};
export default CreateProduct;
