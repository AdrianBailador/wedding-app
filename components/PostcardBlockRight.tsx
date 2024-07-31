import Image from 'next/image';
import React from 'react';
import rama from '@/public/rama.png';
import { useTranslations } from 'next-intl';

const PostcardBlockRight = () => {
    const t = useTranslations('AboutUs');
    return (
        <div className="about-us- right md:order-1 derw-full bg-[white] flex-col justify-center items-stretch mb-[-25px] flex mt-[25px] pl-[50px] py-[85px]">
            <div className="w-full flex-col justify-center items-start flex px-[16%]">
                <Image
                    src={rama}
                    alt="Subtitle"
                    width={62}
                    height={62}
                    className="mb-4"
                />
                <span className="subtitle uppercase mb-4">
                    {t('sectionTitle')}
                </span>
                <h2
                    style={{fontFamily: 'Marcellus'}}
                    className="heading text-3xl font-bold uppercase">
                    {t('title')}
                </h2>
                <p className="paragraph mt-4">
                    {t('description')}
                </p>
            </div>
        </div>
    );
};

export default PostcardBlockRight;
