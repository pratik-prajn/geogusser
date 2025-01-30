"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 0, // Latitude (equator)
  lng: 0, // Longitude (Greenwich)
};

const GoogleMapComponent = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2} />
    </LoadScript>
  );
};

export default GoogleMapComponent;
