import React, { useState, useEffect } from "react";
import image1 from "../assets/folding_box.png";
import image2 from "../assets/squre_Box.png";
import image3 from "../assets/white_Box.png";
import image4 from "../assets/All_Box.png";

const images = [
  {
    src: image1,
    name: "Sfolding_box",
    desc: "Folding boxes are lightweight yet durable packaging solutions made from paperboard or cardboard.They are designed to be folded flat for easy storage and assembled quickly when needed. Perfect for packaging retail products, gifts, and food items.Folding boxes offer excellent printability, allowing for custom branding and designs.They are eco-friendly, cost-effective, and highly versatile for various industries.",
  },
  {
    src: image2,
    name: "squre_Box",
    desc: "Square boxes are sturdy and symmetrical packaging solutions ideal for various products.Their uniform shape provides excellent stacking strength and easy storage.They are widely used for packaging gifts, electronics, cosmetics, and food items.Square boxes can be fully customized with printing, branding, and special finishes.They offer a clean, professional look while ensuring product protection during transport.",
  },
  {
    src: image3,
    name: "white_Box",
    desc: "White boxes offer a clean, minimalistic packaging solution suitable for any product.Their plain surface makes them perfect for custom printing, labeling, or branding.They are commonly used for electronics, cosmetics, gifts, and retail packaging.White boxes provide a professional appearance while keeping the focus on the product inside.Made from high-quality materials, they are durable, versatile, and easy to customize.",
  },
  {
    src: image4,
    name: "All_Box",
    desc: "We offer a wide range of box sizes to fit every packaging need.From small, compact boxes to large, heavy-duty options, we have it all.Our boxes are designed for strength, durability, and maximum protection.Custom sizes are also available to match your specific product dimensions.No matter the size, every box is crafted with quality and care.",
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
  }, [current]); // re  -run interval when current changes

  return (
    <div className="shadow-md px-6 py-4 h-170 flex items-center">
      <div className="mb-6 w-200 h-auto">
        <div className="relative w-full max-w-4xl h-auto overflow-hidden flex flex-col justify-between">
          <div
            className="flex justify-evenly  h-130 transition-discrete"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((item, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col h-auto items-left justify-evenly  bg-transparent"
              >
                <p
                  className="text-orange-500 font-bold leading-tight text-6xl translate-2"
                  style={{ textShadow: "1px 1px 1px white" }}
                >
                  {item.name}
                </p>
                <p className="text-xl "style={{ textShadow: "1px 1px 1px white" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-180">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
