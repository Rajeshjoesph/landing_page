import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left side */}
        <p className="text-sm">&copy; {new Date().getFullYear()} Grace Packaging. All rights reserved.</p>

        {/* Right side */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
