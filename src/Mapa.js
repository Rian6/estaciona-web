// Mapa.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Mapa = ({ locais }) => {
  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 0,
    lng: 0,
  };

  return (
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={2}
        center={defaultCenter}
      >
        {locais.map((local) => (
          <Marker
            key={local.id}
            position={{ lat: local.latitude, lng: local.longitude }}
          />
        ))}
      </GoogleMap>
  );
};

export default Mapa;
