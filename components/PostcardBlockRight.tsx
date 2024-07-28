import Image from 'next/image';
import React from 'react';
import rama from '@/public/rama.png';
import { useTranslations } from 'next-intl';

const PostcardBlockRight = () => {
    const t = useTranslations('PostcardBlockRight');
    return (
        <div style={{gridArea: '1 / 2 / 2 / 5'}} className="w-full bg-[white] flex-col justify-center items-stretch mb-[-25px] flex mt-[25px] pl-[50px] py-[85px]">
            <div className="w-full flex-col justify-center items-start flex px-[16%]">
                <Image
                    src={rama}
                    alt="Subtitle"
                    width={62}
                    height={62}
                    className="mb-4"
                    style={{
                        transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                        transformStyle: 'preserve-3d',
                        opacity: 1,
                    }}
                />
                <div className="subtitle uppercase">{t('PostcardBlockRightText')}<br /></div>
                <br></br>
                <h2
                    style={{fontFamily: 'Marcellus'}}
                    className="heading text-3xl font-bold uppercase">
                    {t('PostcardBlockRight')}
                </h2>

                <p className="paragraph mt-4"></p>
            </div>
        </div>
    );
};

export default PostcardBlockRight;
