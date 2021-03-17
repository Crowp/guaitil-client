import React from 'react';
import { Col } from 'reactstrap';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Section from '../../../../../template/components/common/Section';
import SectionHeader from '../../../../../template/components/landing/SectionHeader';
import ButtonIcon from '../../../../../template/components/common/ButtonIcon';
import '@/template/assets/styles-css/style-landing/landing.css';
import { useGalleryEffect } from '../../../../hooks';
import { RouteMap } from '../../../../../constants';

const GallerySection = () => {
  const history = useHistory();
  const { multimedia } = useGalleryEffect();

  return (
    multimedia.length > 0 && (
      <Section fluid>
        <SectionHeader title="Galería de imágenes" subtitle="" />
        <div className="d-flex justify-content-center">
          <div className="grid-container w-100 w-sm-75">
            {multimedia.map((item, index) => {
              return (
                index < 3 && (
                  <img
                    key={`gallery-${item.id}`}
                    data-sizes="auto"
                    data-src={item.url}
                    className="lazyload grid-image-item"
                    alt={item.fileName}
                  />
                )
              );
            })}
          </div>
        </div>
        <Col xs={12} className="mt-3 d-flex justify-content-center">
          <ButtonIcon
            onClick={() => history.push(RouteMap.Home.gallery())}
            className="rounded-capsule mr-3 ml-3 mb-1"
            color="falcon-default"
            icon={faImages}
            transform="shrink-3"
          >
            Ir a Galeria
          </ButtonIcon>
        </Col>
      </Section>
    )
  );
};
export default GallerySection;
