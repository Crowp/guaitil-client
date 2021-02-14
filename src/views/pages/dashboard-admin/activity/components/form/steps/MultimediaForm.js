import React, { useContext, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { InputDropzone } from '../../../../../../components/forms/inputs';
import ModalConfirm from '../../../../../../components/modals/ModalConfirm';
import { ActivityContext } from '../../../../../../context';
import ActivityAction from '../../../../../../../stores/activity/ActivityAction';

import '@/template/assets/styles-css/header-form/dashboard.css';

const MultimediaForm = ({ isUpdate }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const { activity, handleInputChangeActivity } = useContext(ActivityContext);
  const { multimedia = [], newMultimedia = [] } = activity;

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
        handleInputChangeActivity({ name, value: multimedia.filter(item => item.id !== idToDelete) });
      } else {
        dispatch(ActivityAction.deleteActivityMultimediaById(idToDelete));
      }
    }
    toggleModal();
  };

  const handleOnChangeImages = files => {
    if (isUpdate) {
      const images = files.filter(item => !multimedia.some(image => image.id === item.id));

      handleInputChangeActivity({ name, value: [...newMultimedia, ...images] });
    } else {
      handleInputChangeActivity({ name, value: [...multimedia, ...files] });
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

export default React.memo(MultimediaForm);
