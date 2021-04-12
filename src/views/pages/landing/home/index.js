import React, { useEffect } from 'react';
import { LazyLoad } from 'react-observer-api';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import BannerSection from './sections/BannerSection';
import ProcessesSection from './sections/ProcessesSection';
import FooterSection from './sections/FooterSection';
import Loader from '../../../../template/components/common/Loader';

const CarouselSection = loadable(() => import('./sections/CarouselSection'), { fallback: <Loader /> });
const GallerySection = loadable(() => import('./sections/GallerySection'), { fallback: <Loader /> });
const MapSection = loadable(() => import('./sections/MapSection'), { fallback: <Loader /> });

const Home = ({ location }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <LazyLoad forceVisible>
        <BannerSection />
      </LazyLoad>
      <LazyLoad as="span">
        <ProcessesSection />
      </LazyLoad>
      <LazyLoad as="span">
        <CarouselSection />
      </LazyLoad>
      <LazyLoad as="span">
        <GallerySection />
      </LazyLoad>
      <LazyLoad as="span">
        <MapSection />
      </LazyLoad>
      <LazyLoad as="span" forceVisible>
        <FooterSection />
      </LazyLoad>
    </>
  );
};

Home.propTypes = { location: PropTypes.object.isRequired };

export default Home;
