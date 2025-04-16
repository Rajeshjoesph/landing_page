import React, { useState, useEffect } from "react";
import image1 from "../assets/red-cosmetic-bottle.avif";
import image2 from "../assets/wireless.png";
import image3 from "../assets/watch (2).png";

const images = [
  {
    src: image1,
    name: "Sporty Sneaker",
  },
  {
    src: image2,
    name: "Casual White Shoe",
  },
  {
    src: image3,
    name: "Leather Classic",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // change slide every 3 seconds

    return () => clearInterval(interval); // clean up on unmount
  }, [current]); // re-run interval when current changes

  return (
    <div className="shadow-md px-6 py-4 h-170 flex items-center">
    <div className="mb-6 w-200">
    <div className="relative w-full max-w-4xl overflow-hidden">
        <div
          className="flex transition-discrete"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((item, index) => (
            <div
              key={index}
              className="min-w-full flex flex-col items-center bg-transparent"
            >
              
              <h1 className="  text-gray-700 translate-2">
                {item.name}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  
    <div className="flex flex-col items-center w-180">
      <h2 className="text-2xl font-semibold mb-4 text-center">Featured Products</h2>
  
      <div className="relative w-full max-w-4xl overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((item, index) => (
            <div
              key={index}
              className="min-w-full flex flex-col items-center bg-transparent"
            >
              <img
                src={item.src}
                alt={item.name}
                className="object-contain h-96 w-full"
              />
              <p className="mt-2 text-xl font-medium text-gray-700">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Carousel;
