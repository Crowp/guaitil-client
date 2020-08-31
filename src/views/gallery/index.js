import React from 'react';
import { Row, Col, Card, CardImg, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import LightBoxGallery from '../../template/components/common/LightBoxGallery';
import GalleryAction from '../../stores/gallery/GalleryAction';

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
          <Row
            className="border-dashed border-2x border-300 bg-light rounded-soft bg-light m-1 p-3"
            style={{ minHeight: 500 }}
          >
            <Col>
              <LightBoxGallery images={galleryMultimedia}>
                {openImgIndex => (
                  <Row noGutters className="m-n1 overflow-auto" style={{ maxHeight: 500 }}>
                    {galleryMultimedia.map((src, index) => (
                      <Col xs={6} className="p-1 position-relative" key={index}>
                        <FontAwesomeIcon
                          className="position-absolute text-light"
                          icon={faTimesCircle}
                          size="lg"
                          style={{
                            cursor: 'pointer',
                            zIndex: 10,
                            right: 20,
                            top: 20
                          }}
                          onClick={onOpenModal(galleryMultimedia[index].id)}
                        />
                        <Card
                          className="bg-dark text-white"
                          inverse
                          style={{ maxWidth: '30rem' }}
                          onClick={() => openImgIndex(index)}
                        >
                          <CardImg src={galleryMultimedia[index].url} alt="Card image cap" />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </LightBoxGallery>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="d-flex justify-content-center">
              <Button
                onClick={() => history.push('/gallery/add')}
                color="info"
                size="lg"
                block
                style={{ maxWidth: 650 }}
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
