import { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import EventMarker from "./EventMarker";

import "../App.css";

const LIBRARIES = ["marker"];
const containerStyle = { width: "100%", height: "100%" };
const center = { lat: 40.7128, lng: -74.006 };

export default function MapPage({ user }) {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [events, setEvents] = useState([]); // for event markers

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 12,
    });

    setMapInstance(map);
  }, [isLoaded]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Logged-in user visual */}
      {user && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "5px 10px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={user.photoURL}
            alt="Profile"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              marginRight: "8px",
            }}
          />
          <span style={{ fontWeight: "500" }}>{user.displayName}</span>
        </div>
      )}

      {/* Map container */}
      <div ref={mapRef} style={containerStyle}></div>

      {/* Event markers */}
      {mapInstance && events.length > 0 && (
        <EventMarker map={mapInstance} events={events} />
      )}
    </div>
  );
}
