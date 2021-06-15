import React, { useContext, useMemo, useState } from 'react';
import { ProductContext } from '../../../../../../context';
import PropTypes from 'prop-types';
import { InputDropzone } from '../../../../../../components/forms/inputs';
import ModalConfirm from '../../../../../../components/modals/ModalConfirm';

import '@/template/assets/styles-css/header-form/dashboard.css';
import { useDispatch } from 'react-redux';
import ProductAction from '../../../../../../../stores/product/ProductAction';

const MoltimediaForm = ({ isUpdate }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const { product, handleInputProductChange } = useContext(ProductContext);
  const { multimedia = [], newMultimedia = [], id } = product;
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
        handleInputProductChange({ name, value: multimedia.filter(item => item.id !== idToDelete) });
      } else {
        console.log(id, idToDelete);
        dispatch(ProductAction.deleteProductMultimediaById(id, idToDelete));
      }
    }
    toggleModal();
  };

  const handleOnChangeImages = files => {
    if (isUpdate) {
      const images = files.filter(item => !multimedia.some(image => image.id === item.id));

      handleInputProductChange({ name, value: [...newMultimedia, ...images] });
    } else {
      handleInputProductChange({ name, value: [...multimedia, ...files] });
    }
  };

  return (
    <>
      <InputDropzone
        placeholder="Sube las imágenes del producto"
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
export default React.memo(MoltimediaForm);

MoltimediaForm.propTypes = {
  isUpdate: PropTypes.bool
};
