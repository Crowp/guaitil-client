import React, { useEffect } from 'react';
import { Col } from 'reactstrap';
import ImageItem from './components/ImageItem';
import { useSelector, useDispatch } from 'react-redux';
import LightBoxGallery from '../common/LightBoxGallery';
import Section from '../common/Section';
import GalleryAction from '../../../stores/gallery/GalleryAction';
import SectionHeader from './SectionHeader';
import '../../assets/styles-css/style-landing/landing.css';

const Gallery = () => {
  const galleryMultimedia = useSelector(state => state.gallery?.multimedia || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GalleryAction.getGalery());
  }, [dispatch]);

  return (
    galleryMultimedia.length > 0 && (
      <Section fluid>
        <SectionHeader title="Galería de imágenes" subtitle="" />
        <LightBoxGallery images={galleryMultimedia}>
          {openImgIndex => (
            <Col className="w-100 d-flex flex-wrap justify-content-center p-0 overflow-auto gallery-col-height">
              {galleryMultimedia.map((item, index) => (
                <ImageItem
                  key={`gallery-${item.id}`}
                  src={item.url}
                  altText={item.fileName}
                  onClick={() => openImgIndex(index)}
                />
              ))}
            </Col>
          )}
        </LightBoxGallery>
      </Section>
    )
  );
};
export default React.memo(Gallery);
