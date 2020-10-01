import React, { useState } from 'react';
import { Media, Row, Col, Card, CardImg, Button, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FalconDropzone from '../../../template/components/common/FalconDropzone';
import cloudUpload from '../../../template/assets/img/icons/cloud-upload.svg';
import { isIterableArray } from '../../../template/helpers/utils';
import LightBoxGallery from '../../../template/components/common/LightBoxGallery';
import GalleryAction from '../../../stores/gallery/GalleryAction';
import { selectRequesting } from '../../../selectors/requesting/RequestingSelector';

import '../../../template/assets/styles-css/header-form/dashboard.css';

export default () => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const isRequesting = useSelector(state => selectRequesting(state, [GalleryAction.REQUEST_GALLERY_ADD_MULTIMEDIA]));

  const onDeleteFile = index => () => {
    setFiles(files.filter((item, i) => i !== index));
  };

  const onSubmitFiles = () => () => {
    dispatch(GalleryAction.addMultimedia(files));
    setFiles([]);
  };

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : (
    <Row>
      <Col>
        <Row>
          <Col className="d-flex justify-content-center align-items-center mb-3 mt-2">
            <h2>¡Añade Multimedia!</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Media className="flex-center pb-2 d-block d-md-flex text-center mb-1">
              <Media body>
                <FalconDropzone
                  files={files}
                  onChange={enterFiles => {
                    const totalFiles = [...enterFiles, ...files];
                    setFiles(totalFiles);
                  }}
                  multiple={true}
                  accept="image/*"
                  placeholder={
                    <>
                      <Media className=" fs-0 mx-auto d-inline-flex align-items-center my-auto">
                        <img data-src={cloudUpload} alt="" width={25} className="mr-2 lazyload" />
                        <Media>
                          <p className="fs-0 mb-0 text-700">Sube las imagenes del local</p>
                        </Media>
                      </Media>
                      <p className="mb-0 w-75 mx-auto text-500">Subir imagenes de buena calidad</p>
                    </>
                  }
                />
              </Media>
            </Media>
          </Col>
        </Row>
        <Row className="border-dashed border-2x border-300 bg-light rounded-soft bg-light m-1 p-3 row-min-height">
          {isIterableArray(files) ? (
            <Col>
              <LightBoxGallery images={files}>
                {openImgIndex => (
                  <Row noGutters className="m-n1 overflow-auto row-max-height">
                    {files.map((src, index) => (
                      <Col xs={6} className="p-1 position-relative" key={index}>
                        <FontAwesomeIcon
                          className="position-absolute text-light icon-style"
                          icon={faTimesCircle}
                          size="lg"
                          onClick={onDeleteFile(index)}
                        />
                        <Card className="bg-dark text-white card-max-width" inverse onClick={() => openImgIndex(index)}>
                          <CardImg src={files[index].base64} alt="Card image cap" />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </LightBoxGallery>
            </Col>
          ) : (
            <Col className="d-flex justify-content-center align-items-center">
              <p className="mx-auto">No hay imagenes</p>
            </Col>
          )}
        </Row>
        <Row className="mt-2">
          <Col className="d-flex justify-content-center">
            {isIterableArray(files) ? (
              <Button onClick={onSubmitFiles()} color="primary" size="lg" block className="button-image">
                Subir imagenes
              </Button>
            ) : (
              <Button
                onClick={() => history.push('/admin/gallery')}
                color="info"
                size="lg"
                block
                className="button-image"
              >
                Ir a Galería
              </Button>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
