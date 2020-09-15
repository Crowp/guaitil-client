import React, { useState } from 'react';
import ReactMapboxGl, { Marker, ZoomControl } from 'react-mapbox-gl';
import { Button } from 'reactstrap';
import MarkerImg from '../../../template/assets/img/map/marker.svg';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MapConfig } from './config';

const MapContent = ReactMapboxGl({ accessToken: MapConfig.accessToken });

const Map = ({ longitude, latitude }) => {
  const [coordinates, setCoordinate] = useState([longitude, latitude]);
  const { styles } = MapConfig;
  return (
    <MapContent
      style={styles.outdoor}
      center={coordinates}
      scrollable={false}
      minZoom={[11]}
      maxZoom={[14]}
      zoom={[12]}
      containerStyle={{
        height: '500px',
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
  );
};

export default Map;
