import React, { useEffect } from 'react';
import NavbarStandard from '../../../../template/components/navbar/NavbarStandard';
import Section from '../../../../template/components/common/Section';
import GalleryAction from '../../../../stores/gallery/GalleryAction';
import LightBoxGallery from '../../../../template/components/common/LightBoxGallery';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '../../../../template/helpers/utils';
import SectionHeader from '../../../../template/components/landing/SectionHeader';

import Loader from '../../../../template/components/common/Loader';

import loadable from '@loadable/component';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LazyImage = loadable(() => import('../../../components/images/LazyImage'), { fallback: <Loader /> });

const Gallery = ({ match, location }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const galleryMultimedia = useSelector(state => state.gallery?.multimedia || []);
  const isRequesting = useSelector(state => selectRequesting(state, [GalleryAction.REQUEST_GALLERY]));
  useEffect(() => {
    dispatch(GalleryAction.getGalery());
  }, [dispatch]);
  return (
    <>
      <NavbarStandard location={location} match={match} hasColor />
      <Section>
        {isRequesting ? (
          <Loader />
        ) : isIterableArray(galleryMultimedia) ? (
          <>
            <SectionHeader title="Galería de imágenes" subtitle="" />
            <LightBoxGallery images={galleryMultimedia}>
              {openImgIndex => (
                <div className="grid-container">
                  {galleryMultimedia.map((item, index) => {
                    const decorate =
                      index % 11 === 0 ? 'tall' : index % 5 === 0 ? 'wide' : index % 7 === 0 ? 'wide tall' : '';
                    return (
                      <LazyImage
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
