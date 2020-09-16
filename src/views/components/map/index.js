import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Marker, ZoomControl } from 'react-mapbox-gl';
import { Col, Button } from 'reactstrap';
import MarkerImg from '../../../template/assets/img/map/marker.svg';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaze, faGoogle } from '@fortawesome/free-brands-svg-icons';
import ButtonIcon from '../../../template/components/common/ButtonIcon';
import { goToWaze, goToGoogle } from '../../../utils/MapUtils';
import { MapConfig } from './config';

const MapContent = ReactMapboxGl({ accessToken: MapConfig.accessToken });

const Map = ({ longitude, latitude }) => {
  const [coordinates, setCoordinate] = useState([longitude, latitude]);
  const { styles } = MapConfig;
  return (
    <>
      <Col xs={12}>
        <MapContent
          style={styles.outdoor}
          center={coordinates}
          scrollable={false}
          minZoom={[11]}
          maxZoom={[14]}
          zoom={[12]}
          containerStyle={{
            minHeight: '380px',
            maxHeight: '600px',
            height: '100%',
            width: '100%',
            center: coordinates
          }}
        >
          <div style={{ position: 'absolute', right: 0 }}>
            <ZoomControl />
          </div>
          <Button
            size="sm"
            onClick={() => setCoordinate([...coordinates])}
            color="falcon-primary"
            className="position-absolute"
            style={{ right: 50, top: 10 }}
          >
            <FontAwesomeIcon icon={faCrosshairs} />
          </Button>
          <Marker coordinates={coordinates} anchor="bottom">
            <img src={MarkerImg} height={40} width={40} />
          </Marker>
        </MapContent>
      </Col>
      <Col xs={12} className="mt-3">
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
  longitude: PropTypes.string.isRequired,
  latitude: PropTypes.string.isRequired
};

export default Map;
