import React, { useContext, useMemo, useState } from 'react';

import { LocalContext } from '@/views/context';
import { InputDropzone } from '../../../../../../components/forms/inputs';
import ModalConfirm from '../../../../../../components/modals/ModalConfirm';

import '@/template/assets/styles-css/header-form/dashboard.css';

const MultimediaForm = () => {
  const [modal, setModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const { local, handleInputLocalChange } = useContext(LocalContext);
  const { multimedia = [], newMultimedia = [] } = local;

  const images = [...newMultimedia, ...multimedia];

  const name = useMemo(() => 'multimedia', []);

  const toggleModal = () => {
    setModal(!modal);
    if (!!idToDelete) {
      setIdToDelete(false);
    }
  };

  const onDeleteAction = id => {
    setIdToDelete(id);
    toggleModal();
  };

  const onDeleteFile = () => {
    handleInputLocalChange({ name, value: multimedia.filter(item => item.id !== idToDelete) });
    toggleModal();
  };

  const handleOnChangeImages = files => {
    handleInputLocalChange({ name, value: [...multimedia, ...files] });
  };

  return (
    <>
      <InputDropzone
        placeholder="Sube las imagenes del local"
        onChange={handleOnChangeImages}
        onImageRemove={onDeleteAction}
        images={images}
      />
      <ModalConfirm
        modal={modal}
        toggleModal={toggleModal}
        title="Eliminar Multimedia"
        description="¿Desea eliminar la imagen?"
        actions={[
          { color: 'primary', text: 'Cencelar', onClick: toggleModal },
          { color: 'secondary', text: 'Eliminar', onClick: onDeleteFile }
        ]}
      />
    </>
  );
};

export default MultimediaForm;
