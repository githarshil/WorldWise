import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import useGeolocation from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { position, isLoading, error, getPosition } = useGeolocation();
  const { cities } = useCities();
  const [lat, lng] = useUrlPosition();

  useEffect(
    function () {
      if (lat && lng) {
        setMapPosition([parseFloat(lat), parseFloat(lng)]);
      }
    },
    [lat, lng],
  );

  useEffect(
    function () {
      if (position.lat && position.lng) {
        setMapPosition([position.lat, position.lng]);
      }
    },
    [position],
  );
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={false}
      >
        <Button type="position" onClick={getPosition}>
          GET YOUR POSITION
        </Button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities &&
          cities.map((city) => {
            if (!city.position) return null;
            const cityName = city.cityName;
            return (
              <Marker
                position={[city.position.lat, city.position.lng]}
                key={city.id}
              >
                <Popup>{cityName}</Popup>
              </Marker>
            );
          })}
        <ChangeCentre position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCentre({ position }) {
  const map = useMap();
  useEffect(
    function () {
      map.setView(position);
    },
    [position, map],
  );
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
