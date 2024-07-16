import { redirect } from 'next/navigation';

import GoogleMapComponent from '../components/GoogleMap';
import GoogleMapRouteComponent from '../components/GoogleMapRoute';

export default function RootPage() {
  redirect('/en');
}