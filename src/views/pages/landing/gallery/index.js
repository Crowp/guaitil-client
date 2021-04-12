import React from 'react';
import Section from '../../../../template/components/common/Section';
import LightBoxGallery from '../../../../template/components/common/LightBoxGallery';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '../../../../template/helpers/utils';
import SectionHeader from '../../../../template/components/landing/SectionHeader';

import Loader from '../../../../template/components/common/Loader';

import { useHistory } from 'react-router-dom';
import { useGalleryEffect } from '../../../hooks';

const Gallery = () => {
  const history = useHistory();
  const { isRequesting, multimedia } = useGalleryEffect();
  console.log(multimedia);
  return (
    <Section>
      {isRequesting ? (
        <Loader />
      ) : isIterableArray(multimedia) ? (
        <>
          <SectionHeader title="Galería de imágenes" subtitle="" />
          <LightBoxGallery images={multimedia}>
            {openImgIndex => (
              <div className="grid-container">
                {multimedia.map((item, index) => {
                  const decorate =
                    index % 11 === 0 ? 'tall' : index % 5 === 0 ? 'wide' : index % 7 === 0 ? 'wide tall' : '';
                  return (
                    <img
                      key={`gallery-${item.id}`}
                      data-sizes="auto"
                      data-src={item.url}
                      className={`lazyload grid-image-item ${decorate}`}
                      alt={item.fileName}
                      onClick={() => openImgIndex(index)}
                    />
                  );
                })}
              </div>
            )}
          </LightBoxGallery>
        </>
      ) : (
        <Starter
          action={() => history.push('/')}
          actionName="Volver a la página principal"
          title="No hay imágenes"
          description="Estamos trabajando en ello..."
        />
      )}
    </Section>
  );
};

export default Gallery;
