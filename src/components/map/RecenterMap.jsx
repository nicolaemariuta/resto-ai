import { useMap } from "react-leaflet";

function RecenterMap({ lat, lng }) {
  const map = useMap();

  // Update the view when coordinates change
  map.setView([lat, lng], map.getZoom(), {
    animate: true,
  });

  return null;
}

export default RecenterMap