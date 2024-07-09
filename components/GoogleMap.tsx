'use client';
import React, { useEffect, useState } from 'react';
import loader from '../api/googleMapsLoader';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const position = {
  lat: 37.437041393899676,
  lng: -4.191635586788259
};

const GoogleMapComponent: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    loader.load().then(() => {
      const mapInstance = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        zoom: 4,
        center: position,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID
      });
      setMap(mapInstance);

      const { AdvancedMarkerElement } = google.maps.marker;
      if (AdvancedMarkerElement) {
        new AdvancedMarkerElement({
          map: mapInstance,
          position: position,
        });
      } else {
        console.error('AdvancedMarkerElement is not available');
      }
    }).catch(e => {
      console.error('Error loading Google Maps: ', e);
    });
  }, []);

  return (
    <div id="map" style={containerStyle}></div>
  );
};

export default GoogleMapComponent;
