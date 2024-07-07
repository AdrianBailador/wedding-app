import React from 'react';
import GoogleMapComponent from '../../components/GoogleMap';
import GoogleMapRouteComponent from '../../components/GoogleMapRoute';
import MapTabs from '../../components/MapTabs';
import Navbar from '../../components/Navbar'
import GuestFormFormik from "@/components/GuestFormFormik";
import Header from "@/components/Header";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <>
    <Navbar />
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-3xl">
          {t("title")}
        </h1>
        <h2 className="text-3xl">
          {t("sections.church")}
        
       
     
      <MapTabs />

        </h2>
        <h2 className="text-3xl">
          {t("sections.farm")}
          
        </h2>
        <h1>
          {t("sections.event_registration")}
        </h1>
        <GuestFormFormik/>
      </main>
    </>
  );
}