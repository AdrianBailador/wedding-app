import React from 'react';
import MapTabs from '../../components/MapTabs';
import GuestFormFormik from "@/components/GuestFormFormik";
import {useTranslations} from "next-intl";
import Image from "next/image";
import Gretting from '@/components/Gretting';

export default function Home() {
    const t = useTranslations('IndexPage');

    return (
        <main className="">
            <section id="hero" className="flex-col justify-center items-center flex pb-[76px] px-5">
                <div className="container-wide w-full max-w-[1200px] flex-col items-center flex;">
                    <div className="hero-content w-full text-center flex-col items-center flex relative mb-10">
                        <div className="hero-gallery w-full h-[600px] gap-x-5 gap-y-5 grid grid-cols-3">
                            <div className="hero-gallery-item w-full overflow-hidden relative">
                                <Image
                                    className="w-full h-[80vh] min-h-[600px] object-cover cover"
                                    fill={true}
                                    src="/images/img4.jpg"
                                    alt="Hero 1"/>
                            </div>
                            <div className="hero-gallery-item w-full overflow-hidden relative">
                                <Image
                                    className="w-full h-[80vh] min-h-[600px] object-cover cover"
                                    fill={true}
                                    src="/images/img2.jpg"
                                    alt="Hero 2"/>
                            </div>
                            <div className="hero-gallery-item  w-full overflow-hidden relative">
                                <Image
                                    className="w-full h-[80vh] min-h-[600px] object-cover cover"
                                    fill={true}
                                    src="/images/img3.jpg"
                                    alt="Hero 3"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="gretting" className="flex flex-col justify-center items-center pb-[76px] px-5">
                <div className="container-wide w-full max-w-[1200px] flex flex-col items-center">
                    <div className="guest-form-content w-full text-center flex flex-col items-center relative mb-10">
                        <Image
                            src="/rama.png"
                            alt="Rama"
                            width={140}
                            height={68}
                            className="filter sepia-[1] hue-rotate-[90deg] saturate-[6]"
                        />
                        <br></br>
                        <h1 className="font-marcellus text-[40px] font-normal leading-[50.16px] text-center">
                            {t('sections.grettingText')}
                        </h1>
                        <h2>Lectus sit turpis iaculis eu non sed turpis suscipit facilisi. Lorem morbi non morbi id aliquam.</h2>
                        <br />
                        <Gretting />
                    </div>
                </div>
            </section>

          <section id="guestFormFormik" className="flex-col justify-center items-center flex pb-[76px] px-5">
                <div className="container-wide w-full max-w-[1200px] flex-col items-center flex;">
                    <div className="guest-form-content w-full text-center flex-col items-center flex relative mb-10">
                        <h2 className="text-3xl font-bold mb-5">{t('sections.locations')}</h2>
                        <h1>{t('sections.locationsText')}</h1>
                        <h2>Lectus sit turpis iaculis eu non sed turpis suscipit facilisi. Lorem morbi non morbi id aliquam.</h2>
                       <MapTabs />
                        
                    </div>
                </div>
            </section>

            <section id="guest-form" className="flex-col justify-center items-center flex pb-[76px] px-5">
                <div className="container-wide w-full max-w-[1200px] flex-col items-center flex;">
                    <div className="guest-form-content w-full text-center flex-col items-center flex relative mb-10">
                        <h2 className="text-3xl font-bold mb-5">{t('sections.event_registration')}</h2>
                        <GuestFormFormik />
                    </div>
                </div>
            </section>
        </main>
    );
}