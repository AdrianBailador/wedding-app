import Image from 'next/image';
import React from 'react';
import rama from '@/public/rama.png';

const PostcardBlockRight = () => {
    return (
        <div className="w-full bg-white flex flex-col justify-center items-stretch mt-[25px] mb-[-25px] pt-[85px] pb-[85px] pl-[50px] sm:mt-[20px] sm:mb-0 sm:pl-0 md:pt-[75px] md:pb-[75px] lg:pt-[65px] lg:pb-[65px] lg:mt-[10px]">
            <div className="postcard-text">
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
                <div className="subtitle">who we are<br /></div>
                <h2 className="heading text-3xl font-bold">Weave story into every thread of your event</h2>
                <p className="paragraph mt-4">Cras urna sed purus magna morbi morbi congue suspendisse. Est faucibus hendrerit donec nisi, feugiat suscipit eu, sit. Orci euismod nibh.</p>
                <a href="/about/about-a" className="button w-button mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">more about us</a>
            </div>
        </div>
    );
};

export default PostcardBlockRight;
