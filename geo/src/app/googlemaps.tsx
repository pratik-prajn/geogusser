'use client'

import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api';
import MiniMap from './components/MiniMap';

const defaultMapContainerStyle = {
    width: '100%',
    height: '100vh',
    borderRadius: '15px 0px 0px 15px',
};

const defaultMapCenter = {
    lat: 28.5946473,
    lng: 77.3825407
}

const defaultMapZoom = 18

const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'satellite',
};

const defaultStreetViewPosition = {
    lat: 28.5946473,
    lng: 77.3825407  
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
                        options={{
                            ...defaultStreetViewOptions,
                            styles: [
                                {
                                    featureType: "all",
                                    elementType: "all",
                                    stylers: [{ invert_lightness: true }]
                                }
                            ]
                        }}
                    />
                </GoogleMap>
            </div>
            <MiniMap streetViewPosition={defaultStreetViewPosition} />
        </>
    )
};

export { MapComponent };