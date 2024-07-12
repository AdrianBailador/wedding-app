import React from 'react';
import GoogleMapComponent from '../../components/GoogleMap';
import GoogleMapRouteComponent from '../../components/GoogleMapRoute';
import MapTabs from '../../components/MapTabs';
import Navbar from '../../components/Navbar';
import GuestFormFormik from "@/components/GuestFormFormik";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {t("title")}
          </h1>
        </header>
        
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {t("sections.church")}
          </h2>
         
        </section>
        
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {t("sections.farm")}
          </h2>
          <MapTabs />
        </section>

        <section className="text-center mb-12">
          <h3 className="text-2xl font-semibold mb-4">
            {t("sections.event_registration")}
          </h3>
          <GuestFormFormik />
        </section>
      </main>
    </>
  );
}
