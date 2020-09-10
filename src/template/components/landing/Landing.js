import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import NavbarStandard from '../navbar/NavbarStandard';
import Banner from './Banner';
import Processes from './Processes';
import Cta from './Cta';
import FooterStandard from './FooterStandard';
import LocalImage from './components/LocalImages';

const Landing = ({ location, match }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Fragment>
      <NavbarStandard location={location} match={match} />
      <Banner />
      <LocalImage tittle="Talleres" />
      <Processes />
      <Cta />
      <FooterStandard />
    </Fragment>
  );
};

Landing.propTypes = { location: PropTypes.object.isRequired };

export default Landing;
