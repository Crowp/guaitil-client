import React, { useContext } from 'react';

import { Media, Row, Col, Card, CardImg } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import FalconDropzone from '../../../../components/common/FalconDropzone';
import cloudUpload from '../../../../../template/assets/img/icons/cloud-upload.svg';
import LightBoxGallery from '../../../../../template/components/common/LightBoxGallery';
import { LocalContext } from '../../../../context';

import '../../../../../template/assets/styles-css/header-form/dashboard.css';

const LocalForm = () => {
  const { local, handleInputChangeLocal } = useContext(LocalContext);
  const { multimedia = [] } = local;
  const onDeleteFile = index => () => {
    handleInputChangeLocal({ name: 'multimedia', value: multimedia.filter((item, i) => i !== index) });
  };
  return (
    <>
      <Media className="flex-center pb-3 d-block d-md-flex text-center mb-2">
        <Media body>
          <FalconDropzone
            files={multimedia}
            onChange={enterFiles => {
              const totalFiles = [...enterFiles, ...multimedia];
              handleInputChangeLocal({ name: 'multimedia', value: totalFiles });
            }}
            multiple={true}
            accept="image/*"
            placeholder={
              <>
                <Media className=" fs-0 mx-auto d-inline-flex align-items-center">
                  <img src={cloudUpload} alt="" width={25} className="mr-2" />
                  <Media>
                    <p className="fs-0 mb-0 text-700">Sube las imagenes del local</p>
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
          <LightBoxGallery images={multimedia}>
            {openImgIndex => (
              <Row noGutters className="m-n1 overflow-auto" style={{ maxHeight: 250 }}>
                {multimedia.map((src, index) => (
                  <Col xs={6} className="p-1 position-relative" key={index}>
                    <FontAwesomeIcon
                      className="position-absolute text-light icon-style"
                      icon={faTimesCircle}
                      size="lg"
                      onClick={onDeleteFile(index)}
                    />
                    <Card className="bg-dark text-white card-max-width" inverse onClick={() => openImgIndex(index)}>
                      <CardImg src={multimedia[index].base64} alt="Card image cap" />
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </LightBoxGallery>
        </Col>
      </Row>
    </>
  );
};

export default LocalForm;
