import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import LightBoxGallery from '@/template/components/common/LightBoxGallery';
import GalleryAction from '../../../../stores/gallery/GalleryAction';
import '@/template/assets/styles-css/header-form/dashboard.css';

export default () => {
  const [idFile, setIdFile] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const galleryMultimedia = useSelector(state => state.gallery?.multimedia || []);

  const onOpenModal = id => () => {
    setIdFile(id);
  };

  const onDeleteFile = () => {
    dispatch(GalleryAction.deleteMultimedia(idFile));
    setIdFile(false);
  };
  useEffect(() => {
    dispatch(GalleryAction.getGalery());
  }, [dispatch]);
  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col className="d-flex justify-content-center align-items-center mb-2 mt-2">
              <h2>Galería</h2>
            </Col>
          </Row>
          <LightBoxGallery images={galleryMultimedia} className="h-75 overflow-auto">
            {openImgIndex => (
              <div className="grid-container">
                {galleryMultimedia.map((item, index) => (
                  <div className="position-relative" key={`gallery-${item.id}`}>
                    <FontAwesomeIcon
                      className="position-absolute text-light icon-style"
                      icon={faTimesCircle}
                      size="lg"
                      onClick={onOpenModal(galleryMultimedia[index].id)}
                    />
                    <img
                      data-sizes="auto"
                      data-src={item.url}
                      className="lazyload grid-image-item"
                      alt={item.fileName}
                      onClick={() => openImgIndex(index)}
                    />
                  </div>
                ))}
              </div>
            )}
          </LightBoxGallery>

          <Row className="mt-2">
            <Col className="d-flex justify-content-center">
              <Button
                onClick={() => history.push('/admin/gallery/add')}
                color="info"
                size="lg"
                block
                className="button-image"
              >
                Añadir Multimedia
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal isOpen={!!idFile} toggle={() => setIdFile(false)}>
        <ModalHeader>Eliminar Multimedia</ModalHeader>
        <ModalBody>¿Desea eliminar este archivo multimedia?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setIdFile(false)}>
            Cancelar
          </Button>
          <Button onClick={onDeleteFile}>Eliminar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
