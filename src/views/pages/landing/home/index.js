import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import NavbarStandard from '../../../../template/components/navbar/NavbarStandard';
import BannerSection from './sections/BannerSection';
import ProcessesSection from './sections/ProcessesSection';
import FooterSection from './sections/FooterSection';
import Loader from '../../../../template/components/common/Loader';

const CarouselSection = loadable(() => import('./sections/CarouselSection'), { fallback: <Loader /> });
const GallerySection = loadable(() => import('./sections/GallerySection'), { fallback: <Loader /> });
const MapSection = loadable(() => import('./sections/MapSection'), { fallback: <Loader /> });

const Home = ({ location, match }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <NavbarStandard location={location} match={match} />
      <BannerSection />
      <ProcessesSection />
      <CarouselSection />
      <GallerySection />
      <MapSection />
      <FooterSection />
    </>
  );
};

Home.propTypes = { location: PropTypes.object.isRequired };

export default Home;
