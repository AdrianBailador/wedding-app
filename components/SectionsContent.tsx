import React from 'react';
import Image, {StaticImageData} from "next/image";
import rama from "@/public/rama.png";
import GuestFormFormikEs from "@/components/GuestFormFormikEs";

interface SectionsContentProps {
    image: StaticImageData;
    subtitle: string;
    title: string;
    description: string;
}

const SectionsContent: React.FC<SectionsContentProps> = ({image, subtitle, title, description}) => {
    return (
        <div className="w-full text-center flex-col items-center flex relative">
            <Image
                src={image}
                width={80}
                alt="Rama"
                className="h-auto object-contain mb-[14px]"
            />

            <span className="subtitle uppercase mb-4">
                            {subtitle}
                        </span>
            <h2
                style={{fontFamily: 'Marcellus'}}
                className="heading text-3xl font-bold uppercase">
                {title}
            </h2>
            <p className="paragraph mt-4">
                {description}
            </p>
        </div>
    );
};

export default SectionsContent;