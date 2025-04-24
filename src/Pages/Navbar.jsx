import React from 'react'
import logoImg from "../assets/Logo_img.png";

const Navbar = () => {
  return (
    <nav className="bg-black shadow-md h-22 px-6 py-4 flex justify-between items-center" >
      <div className=" flex items-center" style={{ textShadow: "1px white" }}>
        <img
          src={logoImg}
          alt="Logo"
          className="w-22 h-22 inline-block mr-2 transform rotate-[5deg]"
        />
        <p className="text-4xl font-bold  leading-tight text-orange-500 border-black"> Grace Packaging</p>
      </div>
      <ul className="hidden md:flex gap-6 text-white font-medium">
        <li className="hover:text-orange-500 cursor-pointer">Home</li>
        <li className="hover:text-orange-500 cursor-pointer">About</li>
        <li className="hover:text-orange-500 cursor-pointer">Products</li>
        <li className="hover:text-orange-500 cursor-pointer">Contact</li>
      </ul>
      <div className="md:hidden">
        <button className="text-gray-700 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
