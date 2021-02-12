import React, { useContext, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { LocalContext } from '@/views/context';
import { InputDropzone } from '../../../../../../components/forms/inputs';
import LocalAction from '../../../../../../../stores/local/LocalAction';
import ModalConfirm from '../../../../../../components/modals/ModalConfirm';

import '@/template/assets/styles-css/header-form/dashboard.css';

const MultimediaForm = ({ isUpdate }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const { local, handleInputLocalChange } = useContext(LocalContext);
  const { multimedia = [], newMultimedia = [] } = local;

  const images = [...newMultimedia, ...multimedia];

  const name = useMemo(() => (isUpdate ? 'newMultimedia' : 'multimedia'), [isUpdate]);

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
    const [image = null] = images.filter(item => item.id === idToDelete);
    if (image) {
      if (!!image.base64) {
        handleInputLocalChange({ name, value: multimedia.filter(item => item.id !== idToDelete) });
      } else {
        dispatch(LocalAction.deleteLocalMultimediaById(idToDelete));
      }
    }
    toggleModal();
  };

  const handleOnChangeImages = files => {
    if (isUpdate) {
      const images = files.filter(item => !multimedia.some(image => image.id === item.id));

      handleInputLocalChange({ name, value: [...newMultimedia, ...images] });
    } else {
      handleInputLocalChange({ name, value: [...multimedia, ...files] });
    }
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
