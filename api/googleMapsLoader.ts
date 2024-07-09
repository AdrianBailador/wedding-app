// googleMapsLoader.ts
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  version: '3.55',
  libraries: ['marker'],
  mapIds: [process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string]
});

export default loader;