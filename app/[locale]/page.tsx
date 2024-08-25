import { marcellus } from "@/styles/fonts";
import Image from "next/image";
import Gretting from '@/components/Gretting';
import img5 from '@/public/images/img5.jpg';
import img9 from '@/public/images/img9.jpg';
import img10 from '@/public/images/img10.jpg';
import CardHero from "@/components/CardHero";
import rama from '@/public/branch-r.svg';
import PostcardBlockRight from "@/components/PostcardBlockRight";
import img4 from '@/public/images/img4.jpg';
import MapTabsES from '@/components/MapTabsES';
import MapTabsEN from '@/components/MapTabsEN';
import GuestFormFormik from "@/components/GuestFormFormikEs";
import { useLocale, useTranslations } from "next-intl";
import { galleryImages } from "@/static_content";
import GuestFormFormikEn from "@/components/GuestFormFormikEn";
import GuestFormFormikEs from "@/components/GuestFormFormikEs";
import React from "react";
import SectionsContent from "@/components/SectionsContent";
import TestingTranslations from "@/components/TestingTranslations";

export default function Home() {
    const t = useTranslations('IndexPage');
    const locale = useLocale();

    return (
        <>
            <section id="hero" className="w-ful flex flex-col justify-center items-center px-5 pb-13.5 sm:pb-14.5 md:pb-16.5 lg:pb-18">
                <div className="container-wide w-full md:max-w-[1200px] flex-col items-center flex;">
                    <div className="hero-content w-full text-center flex-col items-center flex relative mb-10">
                        <div className="hero-gallery w-full grid grid-cols-3 xl:gap-5 lg:gap-4.5 md:gap-3.5 gap-1">
                            <div className="hero-gallery-item w-full overflow-hidden relative">
                                <Image
                                    priority
                                    className="w-full object-cover h-[70vw] md:h-80vh min-h-auto md:min-h-[600px]"
                                    src={img9}
                                    alt="Hero 1" />
                            </div>
                            <div className="hero-gallery-item w-full overflow-hidden relative">
                                <Image
                                    priority
                                    className="w-full object-cover h-[70vw] md:h-80vh min-h-auto md:min-h-[600px]"
                                    src={img5}
                                    alt="Hero 2" />
                            </div>
                            <div className="hero-gallery-item w-full overflow-hidden relative">
                                <Image
                                    priority
                                    className="w-full object-cover h-[70vw] md:h-80vh min-h-auto md:min-h-[600px]"
                                    src={img10}
                                    alt="Hero 3" />
                            </div>
                        </div>
                        <CardHero />
                    </div>
                </div>
            </section>

            <section id="greeting" className="container flex flex-col justify-center items-center py-20 px-5">
                <div className="container-wide w-full max-w-[1200px] flex flex-col items-center">
                    <div className="guest-form-content w-full text-center flex flex-col items-center gap-6 relative">
                        <Image
                            src={rama}
                            width={80}
                            height={0}
                            alt="Rama"
                            className="h-auto object-contain mb-[14px]"
                        />
                        <div className="text-content flex flex-col gap-6">
                            <h2
                                style={marcellus.style}
                                className="text-[23px] md:text-[32px] font-normal md:leading-[50.16px] text-center">
                                {t('sections.grettingText')}
                            </h2>
                            <p>{t('sections.locationsText1')}</p>
                        </div>
                        <Gretting />
                    </div>
                </div>
            </section>

            <section id="about-us" className="section-styles container-full">
                <div className="content w-full flex flex-col items-center">
                    <div className="grid w-full gap-x-0 gap-y-0 grid-rows-[auto] grid-cols-[1fr] md:grid-cols-2">
                        <PostcardBlockRight />
                        <div
                            className="about-us-left postcard---image relative flex justify-center items-stretch md:-order-1 w-full"
                        >
                            <div className="w-full z-10 bg-amber-100 relative overflow-hidden">
                                <Image
                                    className="image"
                                    src={img4}
                                    alt=""
                                    width={805}
                                    height={0}
                                    style={{
                                        opacity: 1,
                                    }}
                                    sizes="(max-width: 479px) 96vw, (max-width: 767px) 95vw, 96vw"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="localitations" className="flex-col justify-center items-center flex pb-[76px] px-5">
                <div className="container-wide w-full max-w-[1200px] flex-col items-center flex;">
                    <div className="guest-form-content w-full text-center flex-col items-center flex relative mb-10">
                        <Image
                            src={rama}
                            width={80}
                            alt="Rama"
                            className="h-auto object-contain mb-[14px]"
                        />
                        <br></br>
                        <h2
                            style={marcellus.style}
                            className="text-[23px] md:text-[32px] font-normal md:leading-[50.16px] text-center">
                            {t('sections.locationsText')}
                        </h2>
                        <br></br>
                        <h2>{t('sections.locations1')}</h2>
                        {locale === 'es' ? <MapTabsES /> : <MapTabsEN />}
                    </div>
                </div>
            </section>

            <section id="gallery" className='container-full section-styles'>
                <div className="content-section flex flex-col items-center justify-start gap-8">
                    <div className="title-section container ">
                        <div className="container-wide w-full max-w-[1200px] flex flex-col items-center">
                            <div
                                className="guest-form-content w-full text-center flex flex-col items-center gap-6 relative">
                                <Image
                                    src={rama}
                                    width={80}
                                    alt="Rama"
                                    className="h-auto object-contain mb-[14px]"
                                />
                                <div className="text-content flex flex-col gap-6">
                                    <h2
                                        style={marcellus.style}
                                        className="text-[23px] md:text-[32px] font-normal md:leading-[50.16px] text-center">
                                        {t('sections.gallery')}
                                    </h2>
                                    <p>{t('sections.galleryText')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gallery-masonry columns-3 md:columns-6 w-full md:max-w-7xl mx-auto space-y-4">
                        {galleryImages.map((el, index) => (
                            <div key={el.id} className='gallery-item overflow-hidden'>
                                <Image
                                    src={el.url}
                                    alt={el.title}
                                    height={300}
                                    width={200}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="guestFormFormik" className="container flex-col justify-center items-center flex pb-[76px] px-5">
                <div className="content-section flex flex-col items-center justify-start gap-8">
                    <SectionsContent image={rama}
                                     subtitle={t('sections.subtitle')}
                                     title={t('sections.title')}
                                     description={t('sections.descriptionForm')}
                    />

                    <div className="guest-form-content w-full flex-col items-center flex relative mb-10">
                        <GuestFormFormikEs/>
                    </div>
                </div>
            </section>
        </>
    );
}
