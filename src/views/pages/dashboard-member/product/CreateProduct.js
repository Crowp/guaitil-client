import React from 'react';
import FormProductContainer from './component/FormProductContainer';

const CreateProduct = ({
  match: {
    params: { idLocal }
  }
}) => {
  return <FormProductContainer idLocal={idLocal} />;
};
export default CreateProduct;
