/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import { faWaze, faGoogle } from '@fortawesome/free-brands-svg-icons';
import ButtonIcon from '../../../template/components/common/ButtonIcon';
import { goToWaze, goToGoogle } from '../../../utils/MapUtils';

import '../../../template/assets/styles-css/style-landing/landing.css';

const Map = ({ longitude, latitude }) => {
  return (
    <>
      <Col xs={12} className="mt-3">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.9518221950907!2d-85.51047418520362!3d10.265465692669475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDE1JzU1LjciTiA4NcKwMzAnMjkuOCJX!5e0!3m2!1sen!2scr!4v1620357286735!5m2!1sen!2scr"
          style={{ border: 0, width: '100%', height: 300 }}
          allowFullScreen=""
          loading="lazy"
        />
      </Col>
      <Col xs={12} className="mt-3 d-flex justify-content-center">
        <ButtonIcon
          onClick={() => goToWaze(latitude, longitude)}
          className="rounded-capsule mr-3 ml-3 mb-1"
          color="falcon-default"
          icon={faWaze}
          transform="shrink-3"
        >
          Abrir en Waze
        </ButtonIcon>
        <ButtonIcon
          onClick={() => goToGoogle(latitude, longitude)}
          className="rounded-capsule mr-3 ml-3 mb-1"
          color="falcon-default"
          icon={faGoogle}
          transform="shrink-3"
        >
          Abrir en Maps
        </ButtonIcon>
      </Col>
    </>
  );
};

Map.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired
};

export default Map;
