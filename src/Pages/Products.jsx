import React from "react";

import box1 from "../Matrials/box.avif";
import box2 from "../Matrials/opentype.jpg";
import box3 from "../Matrials/Box OverView.jpg";
import box4 from "../Matrials/board.webp";
import box5 from "../Matrials/die cut.png";
import box6 from "../Matrials/opentype.jpg";



const metals = [
  { name: "Rust", image: "/path-to-lead.jpg", bgColor: "#B24403" },
  { name: "Dark Gold", image: "/path-to-copper.jpg", bgColor: "##A97835" },
  { name: "Aztec Gold", image: "/path-to-steel.jpg", bgColor: "#C08F4F" },
  { name: "Anti-Flash White", image: "/path-to-brass.jpg", bgColor: "#EBF2F6" },
  { name: "Aluminum", image: "/path-to-aluminum.jpg", bgColor: "#DCE2E2" },
];

const products = [
  { name: "Mini Bars", price: 40, status: "new", image: box1 },
  { name: "Round Pipe", price: 40, status: "new", image: box2 },
  {
    name: "Round Bar ALU",
    price: 80,
    status: "new",
    image: box3,
  },
  {
    name: "Copper Bars",
    price: 150,
    status: "new",
    image: box4,
  },
  {
    name: "TIPS Aluminum 3MM",
    price: 80,
    status: "sold",
    image: box5,
  },
  {
    name: "Aluminum Coil",
    price: 115,
    status: "new",
    image: box6,
  },
];

const Product = () => {
  return (
    <div className="bg-white px-8 py-16 space-y-20">
      {/* Metal Alloys Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <button className="text-orange-500 font-semibold tracking-wide uppercase text-sm mb-2">
              View All
            </button>
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">
              Broad Range of <br /> Metal Alloys
            </h2>
          </div>
          <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100">
            <span className="font-semibold">Shop now</span>
            <span className="text-orange-500 text-2xl">&#8594;</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {metals.map((metal, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div
                className="w-32 h-32 bg-gray-100 overflow-hidden "
                style={{ backgroundColor: metal.bgColor }}
              >
                {/* <img src={metal.image} alt={metal.name} className="w-full h-full object-cover" /> */}
              </div>
              <p className="mt-4 text-sm font-bold text-gray-800 uppercase">
                {metal.name}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* /* Top Selling Products Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <button className="text-orange-500 font-semibold tracking-wide uppercase text-sm mb-2">
              View All
            </button>
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">
              Top Selling <br /> Products
            </h2>
          </div>
          <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100">
            <span className="font-semibold">Shop now</span>
            <span className="text-orange-500 text-2xl">&#8594;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="relative bg-gray-50 p-6 w-full rounded-md overflow-hidden"
              style={{
                backgroundImage: `url(${product.image})`,
                // backgroundSize: "cover",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                // height: "100vh",
                // width: "100%",
              }}
            >
              {product.status === "new" && (
                <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </span>
              )}
              {product.status === "sold" && (
                <span className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                  SOLD
                </span>
              )}
              <div className="h-32 w-full overflow-hidden rounded-md mb-4">
                {/* <img src={product.image} alt={product.name} className="w-full h-full object-cover" /> */}
              </div>
              <div className="text-center">
                <p className="text-orange-500 font-bold text-lg mb-1">
                  ${product.price.toFixed(2)}
                </p>
                <h4 className="text-sm font-semibold text-gray-800 uppercase">
                  {product.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Information Banner */}
      <section className="relative bg-white border overflow-hidden rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center p-8">
            <p className="text-sm font-bold text-gray-800">
              FOR ALL INFORMATION YOU NEED
            </p>
            <p className="text-orange-500 font-bold text-xl mt-2">
              CALL US: +367868787
            </p>
          </div>
          <div>
            <img
              src="/path-to-banner-image.jpg"
              alt="Info Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
