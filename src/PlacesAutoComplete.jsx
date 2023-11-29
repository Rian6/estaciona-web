import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function PlacesAutocomplete() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBLyW23PzMoK710i2I0-iDOID96x28ka0g',
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <PlaceContainer />;
}

function PlaceContainer() {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="places-container">
        <Itens setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const Itens = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search an address"
      />
      <>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <p key={place_id}>{description}</p>
            ))}
      </>
    </div>
  );
};