'use client';
import React, { useEffect, useState } from 'react';
import loader from '@/api/googleMapsLoader';
import '@/styles/GoogleMapRoute.css';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const origin = {
  lat: 37.437041393899676,
  lng: -4.191635586788259
};

const destination = {
  lat: 37.440575591901045,
  lng: -4.231433159434073
};

const GoogleMapRouteComponent: React.FC = () => {
  const [travelTime, setTravelTime] = useState<string | null>(null);

  useEffect(() => {
    loader.load().then(() => {
      const mapInstance = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: origin,
        zoom: 10,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID
      });

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(mapInstance);

      const request: google.maps.DirectionsRequest = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK' && result) {
          directionsRenderer.setDirections(result);
          const route = result.routes[0].legs[0];
          setTravelTime(route.duration?.text ?? null);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });

      const { AdvancedMarkerElement } = google.maps.marker;
      if (AdvancedMarkerElement) {
        new AdvancedMarkerElement({
          position: origin,
          map: mapInstance,
          title: 'Origen'
        });

        new AdvancedMarkerElement({
          position: destination,
          map: mapInstance,
          title: 'Destino'
        });
      } else {
        console.error('AdvancedMarkerElement is not available');
      }
    }).catch(e => {
      console.error('Error loading Google Maps: ', e);
    });
  }, []);

  return (
    <div id="map" className="map-container" style={containerStyle}>
      {travelTime && <p className="travel-time">Tiempo de viaje estimado: {travelTime}</p>}
    </div>
  );
};

export default GoogleMapRouteComponent;