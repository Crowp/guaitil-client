import React from 'react';
import NavbarStandard from '../../../../template/components/navbar/NavbarStandard';
import Section from '../../../../template/components/common/Section';
import LightBoxGallery from '../../../../template/components/common/LightBoxGallery';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '../../../../template/helpers/utils';
import SectionHeader from '../../../../template/components/landing/SectionHeader';

import Loader from '../../../../template/components/common/Loader';

import { useHistory } from 'react-router-dom';
import { useGalleryEffect } from '../../../hooks';

const Gallery = ({ match, location }) => {
  const history = useHistory();
  const { isRequesting, multimedia } = useGalleryEffect();
  console.log(multimedia);
  return (
    <>
      <NavbarStandard location={location} match={match} hasColor />
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
            actionName="Volver a la pagina principal"
            title="No hay imagenes"
            description="Estamos trabajando en ello..."
          />
        )}
      </Section>
    </>
  );
};

export default React.memo(Gallery);
