'use client'

import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api';
import MiniMap from './components/MiniMap';
import locationsData from './data/locations.json';

interface Location {
    name: string;
    state: string;
    country: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

const getRandomLocation = (): Location => {
    const locations = locationsData.locations;
    return locations[Math.floor(Math.random() * locations.length)];
};

const randomLocation = getRandomLocation();

const defaultMapContainerStyle = {
    width: '100%',
    height: '90vh',
    borderRadius: '15px 0px 0px 15px',
};

const defaultMapCenter = {
    lat: 28.5946473,
    lng: 77.3825407
}

const defaultMapZoom = 0

const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'satellite',
};

const defaultStreetViewPosition = {
    lat: randomLocation.coordinates.latitude,
    lng: randomLocation.coordinates.longitude
};

const defaultStreetViewOptions = {
  addressControl: false,
  fullscreenControl: false,
  linksControl: false,
  showRoadLabels: false,
  zoomControl: true,
  panControl: false,
  enableCloseButton: false,
  motionTracking: false,
  motionTrackingControl: false,
  visible: true
};

const MapComponent = () => {
    return (
        <>
            <div className="w-full" style={{ filter: 'invert(1)' }}>
                <GoogleMap
                    mapContainerStyle={defaultMapContainerStyle}
                    center={defaultMapCenter}
                    zoom={defaultMapZoom}
                    options={defaultMapOptions}
                >
                    <StreetViewPanorama
                        position={defaultStreetViewPosition}
                        options={defaultStreetViewOptions}
                    />
                </GoogleMap>
            </div>
            <MiniMap streetViewPosition={defaultStreetViewPosition} />
        </>
    )
};

export { MapComponent };