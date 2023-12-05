import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import EstacionamentoIcon from '../../estacionamento.png'
import EstacionamentoIconSelecionado from '../../estacionamento-selecionado.png'
const Mapa = ({itemSelecionado,  locais }) => {

  return (
    <div>
    <LoadScript googleMapsApiKey="AIzaSyBLyW23PzMoK710i2I0-iDOID96x28ka0g">
      <GoogleMap
      mapContainerStyle={{width: '100%', height: '100vh'}}
        zoom={16}
        center={{lat: itemSelecionado.latitude ? itemSelecionado.latitude : 0, lng: itemSelecionado.longitude ? itemSelecionado.longitude : 0}}
      >
        {locais.map((local) => (
          console.log(local),
          <Marker
            key={local.id}
            position={{ lat: local.latitude, lng: local.longitude }}
            icon={{
              url: itemSelecionado && local.id === itemSelecionado.id ? EstacionamentoIconSelecionado : EstacionamentoIcon,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
    </div>
  );
};

export default Mapa;
