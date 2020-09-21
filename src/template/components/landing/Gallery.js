import React, { useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import ImageItem from './components/ImageItem';
import { useSelector, useDispatch } from 'react-redux';
import LightBoxGallery from '../common/LightBoxGallery';
import Section from '../common/Section';
import GalleryAction from '../../../stores/gallery/GalleryAction';

const Gallery = () => {
  const galleryMultimedia = useSelector(state => state.gallery?.multimedia || []);
  const [error, updateError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GalleryAction.getGalery());
  }, [dispatch]);

  return (
    <>
      <Section fluid>
        <LightBoxGallery images={galleryMultimedia}>
          {openImgIndex => (
            <Col className="w-100 d-flex flex-wrap justify-content-center p-0 overflow-auto" style={{ height: 450 }}>
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
    </>
  );
};
export default Gallery;
