import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, Media, Row, CardHeader } from 'reactstrap';
import { getLocalType } from '../../../utils/LocalType';
import Slider from '../slider';
import { useHistory } from 'react-router-dom';

const LocalItem = ({ local: { multimedia = [], name, localType, id } }) => {
  const [images, setImages] = useState([]);
  const history = useHistory();

  const goToLocal = () => {
    history.push(`/member/locals/dashboard/${id}`);
  };

  useEffect(() => {
    const images = multimedia.map(({ url, id }) => ({
      src: url,
      key: `image-local-${id}`,
      altText: `${name}-${id}`,
      caption: ''
    }));
    setImages(images);
  }, [multimedia, name]);

  return (
    <Card className="mb-3">
      <CardHeader>
        <Slider images={images} />
      </CardHeader>
      <CardBody>
        <Row className="justify-content-between align-items-center">
          <Col>
            <Media>
              <Media body className="fs--1 ml-2">
                <h5 className="fs-4">{name}</h5>
                <p className="mb-0">{getLocalType(localType)}</p>
              </Media>
            </Media>
          </Col>
          <Col md="auto" className="mt-4 mt-md-0">
            <Button onClick={goToLocal} color="falcon-primary" size="sm" className="px-4 px-sm-5">
              Entrar al local
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default LocalItem;
