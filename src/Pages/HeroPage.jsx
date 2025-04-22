import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // required for carousel styling
// import { Carousel } from 'react-responsive-carousel';
import image4 from "../assets/background_img.jpeg";

import Carousel from './Carousel';

const HeroPage = () => {
  return (
    <div
      className="shadow-md h-177"
      style={{
        backgroundImage: `url(${image4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity here
          zIndex: 1,
        }}
      ></div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Carousel />
      </div>
    </div>
  );
};

export default HeroPage;
