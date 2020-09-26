import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import NavbarStandard from '../navbar/NavbarStandard';
import Banner from './Banner';
import Processes from './Processes';
import FooterStandard from './FooterStandard';
import CarouselImg from './components/CarouselImg';
import Gallery from './Gallery';
import MapSection from './MapSection';

const Landing = ({ location, match }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Fragment>
      <NavbarStandard location={location} match={match} />
      <Banner />
      <Processes />
      <CarouselImg />
      <Gallery />
      <MapSection />
      <FooterStandard />
    </Fragment>
  );
};

Landing.propTypes = { location: PropTypes.object.isRequired };

export default Landing;
