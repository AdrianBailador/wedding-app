// components/Gallery.js
import Image from 'next/image';

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h2>OUR JOURNEY IN THIS LIFE TOGETHER</h2>
      <p>Lectus sit turpis iaculis eu non sed turpis suscipit facilisi. Lorem morbi non morbi id aliquam.</p>
      <div className="gallery">
        <div className="item item-1">
          <Image src="/images/img1.jpg" alt="image1" layout="fill" objectFit="cover" />
        </div>
        <div className="item item-2">
          <Image src="/images/img2.jpg" alt="image2" layout="fill" objectFit="cover" />
        </div>
        <div className="item item-3">
          <Image src="/images/img3.jpg" alt="image3" layout="fill" objectFit="cover" />
        </div>
        <div className="item item-4">
          <Image src="/images/img4.jpg" alt="image4" layout="fill" objectFit="cover" />
        </div>
        <div className="item item-5">
          <Image src="/images/img5.jpg" alt="image5" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;