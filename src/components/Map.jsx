import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import Button from "../components/Button";
import PropTypes from "prop-types";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useCities } from "../contexts/citiesContext";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";

function Map() {
  let { cities } = useCities();
  console.log(cities);

  let [searchParams] = useSearchParams();
  const [mapPostition, setMapPosition] = useState([40, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </Button>

      <MapContainer
        center={mapPostition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPostition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

ChangeCenter.propTypes = {
  position: PropTypes.any,
};

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;

// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
//   useMapEvent,
// } from "react-leaflet";
// import PropTypes from "prop-types";
// import styles from "./Map.module.css";
// import Button from "../components/Button";
// import { useGeolocation } from "../hooks/useGeoLocation";
// import { useCities } from "../contexts/citiesContext";
// import Spinner from "./Spinner";

// function Map() {
//   const { cities, isLoading, error } = useCities();
//   const [searchParams] = useSearchParams();
//   const [mapPosition, setMapPosition] = useState([40, 0]); // Default: central point
//   const {
//     isLoading: isLoadingPosition,
//     position: geolocationPosition,
//     getPosition,
//   } = useGeolocation();
//   const lat = searchParams.get("lat");
//   const lng = searchParams.get("lng");

//   useEffect(() => {
//     if (geolocationPosition) {
//       setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
//     }
//   }, [geolocationPosition]);

//   useEffect(() => {
//     if (lat && lng) setMapPosition([Number(lat), Number(lng)]);
//   }, [lat, lng]);

//   // Set default position to last city or geolocation
//   useEffect(() => {
//     if (cities.length > 0 && !lat && !lng) {
//       const lastCity = cities[cities.length - 1];
//       setMapPosition([lastCity.position.lat, lastCity.position.lng]);
//     }
//   }, [cities, lat, lng]);

//   const handleGeolocation = () => {
//     getPosition(
//       () => toast.success("Using your location"),
//       () => toast.error("Failed to get your location")
//     );
//   };

//   if (isLoading) return <Spinner />;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className={styles.mapWrapper}>
//       <Button type="position" onClick={handleGeolocation}>
//         {isLoadingPosition ? "Loading..." : "Use your position"}
//       </Button>
//       <MapContainer
//         center={mapPosition}
//         zoom={13}
//         scrollWheelZoom={true}
//         className={styles.map}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {cities.map((city) => (
//           <Marker
//             position={[city.position.lat, city.position.lng]}
//             key={city.id}
//           >
//             <Popup>
//               <span>{city.emoji}</span>
//               <span>{city.cityName}</span>
//             </Popup>
//           </Marker>
//         ))}
//         <ChangeCenter position={mapPosition} />
//         <DetectClick />
//       </MapContainer>
//     </div>
//   );
// }

// function ChangeCenter({ position }) {
//   const map = useMap();
//   map.setView(position);
//   return null;
// }

// ChangeCenter.propTypes = {
//   position: PropTypes.arrayOf(PropTypes.number).isRequired,
// };

// function DetectClick() {
//   const navigate = useNavigate();
//   useMapEvent({
//     click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
//   });
//   return null;
// }

// export default Map;
