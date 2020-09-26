import React, { useContext, useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardImg,
  Media,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Spinner
} from 'reactstrap';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import FalconDropzone from '../../../../../components/common/FalconDropzone';
import cloudUpload from '../../../../../../template/assets/img/icons/cloud-upload.svg';
import LightBoxGallery from '../../../../../../template/components/common/LightBoxGallery';
import { ReviewContext } from '../../../../../context';
import { selectRequesting } from '../../../../../../selectors/requesting/RequestingSelector';
import ProductAction from '../../../../../../stores/product/ProductAction';

const MultimediaForm = () => {
  const [idFile, setIdFile] = useState(false);
  const dispatch = useDispatch();
  const { review, handleInputChangeProductReview } = useContext(ReviewContext);
  const { product } = review;

  const isRequesting = useSelector(state =>
    selectRequesting(state, [ProductAction.REQUEST_PRODUCT_DELETE_MULTIMEDIA_BY_ID])
  );

  const { multimedia = [], newMultimedia = [] } = product;

  const allMultimedia = [...multimedia, ...newMultimedia];

  const onDeleteFile = index => () => {
    const media = allMultimedia[index];
    if (media?.base64) {
      onDeleteFileClient(media.base64);
    }
    if (media?.url) {
      onOpenModal(media.id);
    }
  };

  const onDeleteFileClient = base64 => {
    handleInputChangeProductReview({
      name: 'newMultimedia',
      value: newMultimedia.filter((item, i) => item.base64 !== base64)
    });
  };

  const onOpenModal = id => {
    setIdFile(id);
  };

  const onDeleteFileServer = () => {
    dispatch(ProductAction.deleteProductMultimediaById(product.id, idFile));
    setIdFile(false);
  };

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : (
    <>
      <Media className="flex-center pb-3 d-block d-md-flex text-center mb-2">
        <Media body>
          <FalconDropzone
            files={newMultimedia}
            onChange={enterFiles => {
              const totalFiles = [...enterFiles, ...newMultimedia];
              handleInputChangeProductReview({ name: 'newMultimedia', value: totalFiles });
            }}
            multiple={true}
            accept="image/*"
            placeholder={
              <>
                <Media className=" fs-0 mx-auto d-inline-flex align-items-center">
                  <LazyLoad once>
                    <img src={cloudUpload} alt="" width={25} className="mr-2" />
                  </LazyLoad>
                  <Media>
                    <p className="fs-0 mb-0 text-700">Sube las imagenes del Product</p>
                  </Media>
                </Media>
                <p className="mb-0 w-75 mx-auto text-500">Upload a 300x300 jpg image with a maximum size of 400KB</p>
              </>
            }
          />
        </Media>
      </Media>
      <Row>
        <Col>
          <LightBoxGallery images={allMultimedia}>
            {openImgIndex => (
              <Row noGutters className="m-n1 overflow-auto" style={{ maxHeight: 250 }}>
                {allMultimedia.map((src, index) => (
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
                      onClick={onDeleteFile(index)}
                    />
                    <Card
                      className="bg-dark text-white"
                      inverse
                      style={{ maxWidth: '30rem' }}
                      onClick={() => openImgIndex(index)}
                    >
                      <LazyLoad once>
                        <CardImg src={allMultimedia[index]?.base64 ?? allMultimedia[index].url} alt="Card image cap" />
                      </LazyLoad>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </LightBoxGallery>
        </Col>
      </Row>
      <Modal isOpen={!!idFile} toggle={() => setIdFile(false)}>
        <ModalHeader>Eliminar Multimedia</ModalHeader>
        <ModalBody>¿Desea eliminar este archivo multimedia?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setIdFile(false)}>
            Cancelar
          </Button>
          <Button onClick={onDeleteFileServer}>Eliminar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MultimediaForm;
