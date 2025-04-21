import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // required for carousel styling
// import { Carousel } from 'react-responsive-carousel';
import image4 from "../assets/background_img.jpg";

import Carousel from './Carousel';

const HeroPage = () => {
  return (
    <div
      className="shadow-md h-177"
      style={{ backgroundImage: `url(${image4})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
       <Carousel/>
    </div>
  );
};

export default HeroPage;
