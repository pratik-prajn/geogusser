"use client";
import { LoadScript } from '@react-google-maps/api';
import { MapComponent } from "../../app/googlemaps";
import { MapProvider } from "../../providers/map-provider";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

const MapWrapper = () => {
    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <MapProvider>
                <MapComponent/>
            </MapProvider>
        </LoadScript>
    );
};

export default MapWrapper;