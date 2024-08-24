import Image from 'next/image';
import React from 'react';
import rama from '@/public/rama.png';
import { useTranslations } from 'next-intl';

const PostcardBlockRight = () => {
    const t = useTranslations('AboutUs');
    return (
        <div className="about-us- right md:order-1 derw-full bg-[white] flex-col justify-center items-stretch mb-[-25px] flex mt-[25px] md:pl-[50px] py-[85px]">
            <div className="w-full flex-col justify-center items-start flex px-[10%] md:px-[16%]">
                <Image
                    src={rama}
                    alt="Subtitle"
                    width={62}
                    height={62}
                    className="mb-4"
                />
                <h2
                    style={{fontFamily: 'Marcellus'}}
                    className="text-[23px] md:text-[32px] font-normal md:leading-[50.16px] text-center">
                    {t('sectionTitle')}
                </h2>
                <p className="paragraph mt-4">
                    {t('description')}
                </p>
            </div>
        </div>
    );
};

export default PostcardBlockRight;
