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
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1962.9646349486886!2d-85.51054518650818!3d10.267282848886675!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2scr!4v1618430226529!5m2!1ses-419!2scr"
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
