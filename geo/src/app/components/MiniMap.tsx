"use client";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { useState } from 'react';

interface MiniMapProps {
    streetViewPosition: {
        lat: number;
        lng: number;
    };
}

const calculateDistance = (point1: any, point2: any) => {
    const R = 6371; 
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(2);
};

const defaultMapStyle = {
    width: '350px',
    height: '250px',
    borderRadius: '10px',
    border: '2px solid white',
    transition: 'all 0.3s ease'
};

const expandedMapStyle = {
    width: '600px',
    height: '400px',
    borderRadius: '10px',
    border: '2px solid white',
    transition: 'all 0.3s ease'
};

const indiaCenter = {
    lat: 20.5937,
    lng: 78.9629
};

const miniMapOptions = {
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    draggable: true, // Enable dragging
    clickableIcons: false,
    zoom: 3.5
};

const MiniMap = ({ streetViewPosition }: MiniMapProps) => {
    const { user } = useUser();
    const updateUserScore = useMutation(api.scores.updateScore);
    
    const handleSubmitGuess = async (distance: number) => {
        if (user && distance) {
            await updateUserScore({
                userId: user.id,
                name: user.firstName || "Anonymous",
                distance: parseFloat(distance)
            });
        }
    };

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [hasGuessed, setHasGuessed] = useState(false);
    const [distance, setDistance] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleMapClick = (event) => {
        if (!hasGuessed) {
            const lat = event.latLng.lat().toFixed(4);
            const lng = event.latLng.lng().toFixed(4);
            setSelectedLocation({ lat, lng });
            
            if (streetViewPosition) {
                const dist = calculateDistance(
                    { lat: parseFloat(lat), lng: parseFloat(lng) },
                    streetViewPosition
                );
                setDistance(dist);
                handleSubmitGuess(dist);
                setHasGuessed(true);
            }
        }
    };

    return (
        <div 
            className="fixed bottom-4 right-4"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <GoogleMap
                mapContainerStyle={isExpanded ? expandedMapStyle : defaultMapStyle}
                center={indiaCenter}
                zoom={5}
                options={miniMapOptions}
                onClick={handleMapClick}
            >
                {selectedLocation && hasGuessed && (
                    <Polyline
                        path={[
                            { 
                                lat: parseFloat(selectedLocation.lat), 
                                lng: parseFloat(selectedLocation.lng) 
                            },
                            streetViewPosition
                        ]}
                        options={{
                            strokeColor: '#f6fbc1',
                            strokeOpacity: 0.6,
                            strokeWeight: 1,
                            icons: [{
                                icon: {
                                    path: "M 0,-1 0,1",
                                    strokeOpacity: 1,
                                    scale: 4,
                                },
                                offset: '0',
                                repeat: '20px'
                            }]
                        }}
                    />
                )}
                {selectedLocation && (
                    <Marker
                        position={{
                            lat: parseFloat(selectedLocation.lat),
                            lng: parseFloat(selectedLocation.lng)
                        }}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        }}
                    />
                )}
                {hasGuessed && (
                    <Marker
                        position={streetViewPosition}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                        }}
                    />
                )}
            </GoogleMap>
            {distance && (
                <div className="bg-black p-2 mt-2 rounded text-sm text-center text-white">
                    Distance: {distance} km
                </div>
            )}
        </div>
    );
};

export default MiniMap;