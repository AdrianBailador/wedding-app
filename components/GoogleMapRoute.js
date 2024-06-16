'use client'
import React from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

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
        // Get the duration of the route
        const route = response.routes[0].legs[0];
        setTravelTime(route.duration.text);
      } else {
        console.error('Directions request failed due to ' + response.status);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={origin}
        zoom={10}
      >
        <Marker position={origin} />
        <Marker position={destination} />
        <DirectionsService
          // required
          options={{
            destination: destination,
            origin: origin,
            travelMode: 'DRIVING'
          }}
          // required
          callback={directionsCallback}
        />
        {
          directions &&
          <DirectionsRenderer
            // required
            options={{
              directions: directions
            }}
          />
        }
      </GoogleMap>
      {travelTime && <p>Tiempo de viaje estimado: {travelTime}</p>}
    </LoadScript>
  );
};

export default GoogleMapRouteComponent;
