import Image from 'next/image';
import React from 'react';
import rama from '@/public/rama.png';

const PostcardBlockRight = () => {
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
                <div className="subtitle uppercase">About Us<br /></div>
                <h2
                    style={{fontFamily: 'Marcellus'}}
                    className="heading text-3xl font-bold uppercase">
                    OUR WEDDING SHOULD BE UNFORGETTABLE,
                    DEEPLY ROMANTIC, EXQUISITELY.
                </h2>
                <p className="paragraph mt-4">Cras urna sed purus magna morbi morbi congue suspendisse. Est faucibus hendrerit donec nisi, feugiat suscipit eu, sit. Orci euismod nibh.</p>
            </div>
        </div>
    );
};

export default PostcardBlockRight;
