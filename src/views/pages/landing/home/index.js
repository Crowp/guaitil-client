import React, { useEffect } from 'react';
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
      <BannerSection />
      {/*<ProcessesSection />*/}
      {/*<CarouselSection />*/}
      {/*<GallerySection />*/}
      {/*<MapSection />*/}
      <FooterSection />
    </>
  );
};

Home.propTypes = { location: PropTypes.object.isRequired };

export default Home;
