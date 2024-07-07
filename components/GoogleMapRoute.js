// components/googleMapRoute.js
'use client'
import React from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import '../styles/GoogleMapRoute.css';

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

const GoogleMapRouteComponent = () => {
  const [directions, setDirections] = React.useState(null);
  const [travelTime, setTravelTime] = React.useState(null);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
        const route = response.routes[0].legs[0];
        setTravelTime(route.duration.text);
      } else {
        console.error('Directions request failed due to ' + response.status);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={origin}
          zoom={10}
        >
          <Marker position={origin} />
          <Marker position={destination} />
          <DirectionsService
            options={{
              destination: destination,
              origin: origin,
              travelMode: 'DRIVING'
            }}
            callback={directionsCallback}
          />
          {directions && <DirectionsRenderer options={{ directions: directions }} />}
        </GoogleMap>
        {travelTime && <p className="travel-time">Tiempo de viaje estimado: {travelTime}</p>}
      </div>
    </LoadScript>
  );
};

export default GoogleMapRouteComponent;