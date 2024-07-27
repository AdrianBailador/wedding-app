import {marcellus} from "@/styles/fonts";
import Image from 'next/image';
import rama from '@/public/rama.png';
import logo from '@/public/isotipo_transparent.svg';
import {Button} from "@/components/ui/button";

const CardHero = () => {
    return (
        <div
            className="relative bottom-[30px] sm:bottom-[-80px] sm:absolute w-[96%] sm:w-[90%] max-w-[780px] z-20">
            <div
                className="relative z-20 bg-white text-center flex flex-col justify-center items-center gap-6 p-[38px_10%] sm:p-[45px_10%]">
                <Image
                    src={logo}
                    alt="Subtitle"
                    width={62}
                    className="object-contain h-auto"
                />
                <p className="subtitle text-accent uppercase">Acompañanos en nuestra boda</p>
                <h1
                    style={marcellus.style}
                    className="heading-hero font-medium uppercase text-6xl">Adrian & Ana</h1>
                <Image
                    src={rama}
                    alt="Subtitle"
                    width={52}
                    className="object-contain h-auto"
                />

            </div>
        </div>
    );
};

export default CardHero;