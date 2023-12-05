import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function PlacesAutocomplete(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBLyW23PzMoK710i2I0-iDOID96x28ka0g',
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <PlaceContainer handleSelect={props.handleSelect}/>;
}

function PlaceContainer(props) {
  return (
    <>
      <div className="places-container">
        <Itens handleSelect={props.handleSelect}/>
      </div>
    </>
  );
}

const Itens = (props, { setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleLocationSelect = (place_id) => {
    fetch(
      `https://places.googleapis.com/v1/places/${place_id}?fields=location&key=AIzaSyBLyW23PzMoK710i2I0-iDOID96x28ka0g`
    )
      .then((response) => response.json())
      .then((data) => {
        const location = data.location;

        if (location) {
          props.handleSelect({
            lat: location.latitude,
            lng: location.longitude,
          })
        } else {
          console.error('Localização não encontrada nos detalhes:', data.result);
        }
      })
      .catch((error) => {
        console.error('Erro ao obter detalhes do local:', error);
      });
  };
  
  const handleSelect = async (address, place_id) => {
    setValue(address, false);
    clearSuggestions();
    handleLocationSelect(place_id)
  };

  return (
    <div>
      <Label htmlFor="Local">Local</Label>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar Endereço"
      />{data && value && data.length > 0 ?
        <ScrollArea className="h-72 w-400 rounded-md border" >
          <div className="p-4">
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <>
                  <div 
                    key={place_id} 
                    className="text-sm"
                    onClick={() => handleSelect(description, place_id)}>
                    {description}
                  </div>
                  <Separator className="my-2" style={{ marginTop: 10 }} />
                </>
              ))}
          </div>
        </ScrollArea>
        : <div className="h-72 w-400 rounded-md">
        </div>}
    </div>
  );
};