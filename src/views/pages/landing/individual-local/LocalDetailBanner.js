import React, { useState } from 'react';
import Slider from 'react-slick/lib';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardImg, Col, Media, Row } from 'reactstrap';
import { isIterableArray } from '../../../../template/helpers/utils';
import '../../../../template/assets/styles-css/header-form/dashboard.css';
import defaultImage from '../../../../template/assets/img/background/default.png';
import { getLocalType } from '../../../../utils/LocalType';
import useLocalByIdEffect from '../../../hooks/useLocalByIdEffect';
import ModalContainer from './ModalContainer';

const sliderSettings = {
  infinite: true,
  speed: 500,
  dots: true,
  autoplay: true,
  lazyLoad: true,
  slidesToShow: 1,
  slidesToScroll: 1
};

export const LocalDetailBanner = ({ localName, localType, multimedia, id }) => {
  const { local } = useLocalByIdEffect(id);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <Card className="mb-3">
      {isIterableArray(multimedia) ? (
        <div className="position-relative rounded-top" style={{ maxHeight: 400 }}>
          {multimedia.length === 1 ? (
            <CardImg
              top
              key="local-image"
              style={{ objectFit: 'cover' }}
              data-src={multimedia[0].url}
              height={400}
              className="lazyload"
              alt={multimedia[0].fileName}
            />
          ) : (
            <Slider {...sliderSettings}>
              {multimedia.map(item => (
                <div className="w-100" key={`image-activity-${item.id}`}>
                  <img
                    height={400}
                    style={{ objectFit: 'cover' }}
                    className="lazyload rounded w-100"
                    data-src={item.url}
                    alt={item.fileName}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      ) : (
        <CardImg
          top
          data-src={defaultImage}
          height={400}
          data-sizes="auto"
          style={{ objectFit: 'cover' }}
          className="lazyload"
          alt="Card image"
        />
      )}
      <CardBody>
        <Row className="justify-content-between align-items-center">
          <Col>
            <Media>
              <Media body className="fs--1 ml-2">
                <h5 className="fs-0">{localName}</h5>
                <p className="mb-0">{getLocalType(localType)}</p>
              </Media>
            </Media>
          </Col>
          <Col md="auto" className="mt-4 mt-md-0">
            <Button onClick={toggle} color="falcon-primary" size="sm" className="px-4 px-sm-5">
              Contactar
            </Button>
            <ModalContainer toggle={toggle} modal={modal} item={local} size="lg" />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

LocalDetailBanner.propTypes = {
  localName: PropTypes.string.isRequired,
  localType: PropTypes.string.isRequired,
  multimedia: PropTypes.array,
  id: PropTypes.any
};

export default LocalDetailBanner;
