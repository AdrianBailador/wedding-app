import React from 'react';
import GoogleMapComponent from '../components/GoogleMap';
import GoogleMapRouteComponent from '../components/GoogleMapRoute';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={"text-3xl"}>
        Wedding App - Home Page
      </h1>
      <h2 className={"text-3xl"}>
        Iglesia San Francisco
        <GoogleMapComponent />
      </h2>
      <h2 className={"text-3xl"}>
        Finca Genilla
        <GoogleMapRouteComponent />
      </h2>
    </main>
  );
}
