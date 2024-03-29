import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, Media, Row, CardHeader } from 'reactstrap';
import { getLocalType } from '../../../utils/LocalType';
import Slider from '../slider';
import { useHistory } from 'react-router-dom';
import { RouteMap } from '../../../constants';

const LocalItem = ({
  local: {
    localDescription: { localName, localType },
    multimedia = [],
    id
  }
}) => {
  const [images, setImages] = useState([]);
  const history = useHistory();

  const goToLocal = () => {
    history.push(RouteMap.LocalMember.individual(id));
  };

  useEffect(() => {
    const images = multimedia.map(({ url, id }) => ({
      src: url,
      key: `image-local-${id}`,
      altText: `${localName}-${id}`,
      caption: ''
    }));
    setImages(images);
  }, [multimedia, localName]);

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
                <h5 className="fs-4">{localName}</h5>
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

export default React.memo(LocalItem);
