import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '@/template/components/common/Loader';

import { InputDropzone } from '../../../components/forms/inputs';
import ModalConfirm from '../../../components/modals/ModalConfirm';

import { useGalleryEffect, useIsRequesting } from '../../../hooks';

import '@/template/assets/styles-css/header-form/dashboard.css';

import GalleryAction from '../../../../stores/gallery/GalleryAction';
import { Button, Card, Row, Spinner } from 'reactstrap';
import Flex from '../../../../template/components/common/Flex';

export default () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const [files, setFiles] = useState([]);

  const { multimedia: savedFiles, isRequesting } = useGalleryEffect();

  const isRequestingSave = useIsRequesting([GalleryAction.REQUEST_GALLERY_ADD_MULTIMEDIA]);

  const images = [...files, ...savedFiles];

  useEffect(() => {
    setFiles([]);
  }, [savedFiles]);

  const onSubmitFiles = () => {
    if (files.length) {
      dispatch(GalleryAction.addMultimedia(files));
    }
  };

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
        setFiles(files.filter(item => item.id !== idToDelete));
      } else {
        dispatch(GalleryAction.deleteMultimedia(idToDelete));
      }
    }
    toggleModal();
  };

  const handleOnChangeImages = files => {
    setFiles(files);
  };

  return (
    <>
      <Card className="theme-wizard p-5">
        <Flex justify="center" className="mb-3">
          <h5>Galería de imagenes</h5>
        </Flex>
        <InputDropzone
          placeholder="Sube las imagenes del local"
          onChange={handleOnChangeImages}
          onImageRemove={onDeleteAction}
          maxHeight={250}
          images={images}
        />
        <Button color={files.length ? 'warning' : 'falcon-default'} disabled={!files.length} onClick={onSubmitFiles}>
          {isRequestingSave ? <Spinner /> : 'Guardar'}
        </Button>
      </Card>
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
