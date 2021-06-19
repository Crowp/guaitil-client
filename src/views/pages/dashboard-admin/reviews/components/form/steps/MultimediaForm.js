import React, { useContext } from 'react';
import { InputDropzone } from '../../../../../../components/forms/inputs';

import '@/template/assets/styles-css/header-form/dashboard.css';
import { ReviewContext } from '../../../../../../context';

const MoltimediaForm = () => {
  const { stateForm } = useContext(ReviewContext);
  const { product } = stateForm;
  const { multimedia = [] } = product;
  return (
    <>
      <InputDropzone placeholder="Sube las imágenes del producto" images={multimedia} readOnly />
    </>
  );
};

export default React.memo(MoltimediaForm);
