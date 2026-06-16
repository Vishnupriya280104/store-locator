import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons (known Leaflet + React issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Green icon for nearest store
const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Red icon for user location
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// This component moves the map when user location changes
function MapMover({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 12, { duration: 1.5 });
  }, [center, map]);
  return null;
}

function Map({ stores, userLocation }) {
  const defaultCenter = [12.9716, 77.5946]; // Bengaluru center

  return (
    <MapContainer
      center={defaultCenter}
      zoom={11}
      style={{ height: "100%", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Move map when user location is found */}
      {userLocation && (
        <MapMover center={[userLocation.lat, userLocation.lng]} />
      )}

      {/* User location marker */}
      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={redIcon}
        >
          <Popup>
            <strong>📍 You are here</strong>
          </Popup>
        </Marker>
      )}

      {/* Store markers */}
      {stores.map((store, index) => (
        <Marker
          key={store.id}
          position={[store.lat, store.lng]}
          icon={index === 0 && userLocation ? greenIcon : new L.Icon.Default()}
        >
          <Popup>
            <div style={{ minWidth: "160px" }}>
              <strong>{store.name}</strong>
              {index === 0 && userLocation && (
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#15803d",
                    fontSize: "11px",
                    padding: "1px 6px",
                    borderRadius: "999px",
                    marginLeft: "6px",
                  }}
                >
                  Nearest
                </span>
              )}
              <p style={{ margin: "6px 0 2px", fontSize: "12px", color: "#555" }}>
                {store.address}
              </p>
              {store.distance && (
                <p style={{ margin: 0, fontSize: "12px", color: "#6366f1", fontWeight: "600" }}>
                  {store.distance.toFixed(1)} km away
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
