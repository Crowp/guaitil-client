import React, { useContext, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import LocalAction from '../../../../../../../stores/local/LocalAction';

import { InputDropzone } from '../../../../../../components/forms/inputs';
import ModalConfirm from '../../../../../../components/modals/ModalConfirm';

import { MemberContext } from '../../../../../../context';

const MultimediaForm = ({ isUpdate }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const { local, handleLocalChange } = useContext(MemberContext);
  const { multimedia = [], newMultimedia = [], id } = local;

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
    const [image = null] = images.filter(item => item.id === idToDelete);
    if (image) {
      if (!!image.base64) {
        handleLocalChange({ name, value: multimedia.filter(item => item.id !== idToDelete) });
      } else {
        dispatch(LocalAction.deleteLocalMultimediaById(id, idToDelete));
      }
    }
    toggleModal();
  };

  const handleOnChangeImages = files => {
    if (isUpdate) {
      const images = files.filter(item => !multimedia.some(image => image.id === item.id));

      handleLocalChange({ name, value: [...newMultimedia, ...images] });
    } else {
      handleLocalChange({ name, value: [...multimedia, ...files] });
    }
  };

  return (
    <>
      <InputDropzone
        placeholder="Sube las imágenes del local"
        onChange={handleOnChangeImages}
        onImageRemove={onDeleteAction}
        images={images}
      />
      <ModalConfirm
        modal={modal}
        toggleModal={toggleModal}
        title="Eliminar Multimedia"
        description="¿Desea eliminar la imágen?"
        actions={[
          { color: 'primary', text: 'Cancelar', onClick: toggleModal },
          { color: 'secondary', text: 'Eliminar', onClick: onDeleteFile }
        ]}
      />
    </>
  );
};

export default MultimediaForm;
