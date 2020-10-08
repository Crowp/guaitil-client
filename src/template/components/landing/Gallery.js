import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LightBoxGallery from '../common/LightBoxGallery';
import Section from '../common/Section';
import GalleryAction from '../../../stores/gallery/GalleryAction';
import SectionHeader from './SectionHeader';
import LazyImage from '../../../views/components/images/LazyImage';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { Col } from 'reactstrap';
import ButtonIcon from '../../../template/components/common/ButtonIcon';
import '../../assets/styles-css/style-landing/landing.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Gallery = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const galleryMultimedia = useSelector(state => state.gallery?.multimedia || []);

  useEffect(() => {
    dispatch(GalleryAction.getGalery());
  }, [dispatch]);

  return (
    galleryMultimedia.length > 0 && (
      <Section fluid>
        <SectionHeader title="Galería de imágenes" subtitle="" />
        <LightBoxGallery images={galleryMultimedia} className="d-flex justify-content-center">
          {openImgIndex => (
            <div className="grid-container w-75">
              {galleryMultimedia.map((item, index) => {
                return (
                  index < 3 && (
                    <LazyImage
                      key={`gallery-${item.id}`}
                      data-sizes="auto"
                      data-src={item.url}
                      className="lazyload grid-image-item"
                      alt={item.fileName}
                      onClick={() => openImgIndex(index)}
                    />
                  )
                );
              })}
            </div>
          )}
        </LightBoxGallery>
        <Col xs={12} className="mt-3 d-flex justify-content-center">
          <ButtonIcon
            onClick={() => history.push('/galeria')}
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
export default React.memo(Gallery);
