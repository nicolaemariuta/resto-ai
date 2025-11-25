import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import RecenterMap from "./RecenterMap";

// To add markers:

// {markers.map((m, i) => (
//   <Marker key={i} position={[m.lat, m.lng]}>
//     <Popup>{m.title}</Popup>
//   </Marker>
// ))}

// Fix default icon paths
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Small component just to handle clicks
function LocationClickHandler({ onLocationChange }) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const DEFAULT_CENTER = [55.6761, 12.5683]; // fallback

function MapView({ userLocation, onUserLocationChange }) {

  const hasValidLocation =
    userLocation &&
    typeof userLocation.lat === "number" &&
    typeof userLocation.lng === "number";

  const center = hasValidLocation
    ? [userLocation.lat, userLocation.lng]
    : DEFAULT_CENTER;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker at current user location */}
        {hasValidLocation && (
          <>
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>You are here</Popup>
            </Marker>

            {/* This forces the map to move to user position */}
            <RecenterMap lat={userLocation.lat} lng={userLocation.lng} />
          </>
        )}

        {/* Click on map → update location */}
        <LocationClickHandler onLocationChange={onUserLocationChange} />
      </MapContainer>
    </div>
  );
}

export default MapView;