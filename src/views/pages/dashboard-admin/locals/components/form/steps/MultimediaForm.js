import React, { useContext, useMemo } from 'react';

import { LocalContext } from '../../../../../../context';
import { InputDropzone } from '../../../../../../components/forms/inputs';
import '@/template/assets/styles-css/header-form/dashboard.css';

const MultimediaForm = () => {
  const { local, handleInputLocalChange } = useContext(LocalContext);
  const { multimedia = [] } = local;

  const name = useMemo(() => 'multimedia', []);

  const onDeleteFile = id => {
    handleInputLocalChange({ name, value: multimedia.filter(item => item.id !== id) });
  };

  const handleOnChangeImages = files => {
    handleInputLocalChange({ name, value: [...multimedia, ...files] });
  };
  return (
    <InputDropzone
      placeholder="Sube las imagenes del local"
      onChange={handleOnChangeImages}
      onImageRemove={onDeleteFile}
      images={multimedia}
    />
  );
};

export default MultimediaForm;
