import MapTabs from '@/components/MapTabs';
import GuestFormFormik from "@/components/GuestFormFormik";
import {useTranslations} from "next-intl";
import Navbar from "@/components/Navbar";
import image1 from "@/public/images/img1.jpg";
import image2 from "@/public/images/img2.jpg";
import image3 from "@/public/images/img3.jpg";
import Image from "next/image";

export default function Home() {
    const t = useTranslations("Home");

    return (
        <>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1 className="text-3xl">
                    {t("title")}
                </h1>
                <h2 className="text-3xl">
                    {t("sections.church")}


                    <MapTabs/>

                </h2>
                <h2 className="text-3xl">
                    {t("sections.farm")}

                </h2>
                <h1>
                    {t("sections.event_registration")}
                </h1>
                <GuestFormFormik/>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="grid gap-4">
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                 src={image3} alt=""/>
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                   src={image1} alt=""/>
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                   src={image1} alt=""/>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                   src={image1} alt=""/>
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                   src={image3} alt=""/>
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                   src={image1} alt=""/>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                   src={image3} alt=""/>
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                   src={image1} alt=""/>
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                   src={image1} alt=""/>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                   src={image1} alt=""/>
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                   src={image3} alt=""/>
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg"
                                   src={image1} alt=""/>
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
}