import React, { useContext, useMemo } from 'react';

import { LocalContext } from '@/views/context';
import { InputDropzone } from '../../../../../../components/forms/inputs';
import '@/template/assets/styles-css/header-form/dashboard.css';

const MultimediaForm = ({ isUpdate }) => {
  const { local, handleInputLocalChange } = useContext(LocalContext);
  const { multimedia = [], newMultimedia = [] } = local;

  const name = useMemo(() => (isUpdate ? 'newMultimedia' : 'multimedia'), [isUpdate]);

  const onDeleteFile = id => {
    handleInputLocalChange({ name, value: multimedia.filter(item => item.id !== id) });
  };

  const handleOnChangeImages = files => {
    if (isUpdate) {
      const images = files.filter(item => !multimedia.some(image => image.id === item.id));
      handleInputLocalChange({ name, value: [...newMultimedia, ...images] });
    } else {
      handleInputLocalChange({ name, value: [...multimedia, ...files] });
    }
  };

  const images = [...newMultimedia, ...multimedia];

  return (
    <InputDropzone
      placeholder="Sube las imagenes del local"
      onChange={handleOnChangeImages}
      onImageRemove={onDeleteFile}
      images={images}
    />
  );
};

export default MultimediaForm;
