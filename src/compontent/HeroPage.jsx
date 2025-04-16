import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // required for carousel styling
// import { Carousel } from 'react-responsive-carousel';
import image1 from '../assets/image1.jpg';
import Carousel from './Carousel';

const HeroPage = () => {
  return (
    <div className="bg-[#94abbd] shadow-md h-177 ">
       <Carousel/>
    </div>
  );
};

export default HeroPage;
