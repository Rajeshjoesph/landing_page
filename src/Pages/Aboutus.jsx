import React from "react";

const AboutUs = () => {
  return (
    <div>
      <div className="flex justify-between items-center bg-[#94abbd] shadow-md h-70 px-6 py-4">
        {/* Left Side */}
        <div className="flex flex-col items-start w-1/3">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            Your Company Name
          </h2>

          <p className="text-gray-700 mb-4 items-start">
            We specialize in manufacturing high-quality corrugated boxes
            tailored to your packaging needs. With years of experience and a
            commitment to excellence, we ensure every product is durable,
            reliable, and cost-effective. Trust us for your customized packaging
            solutions.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex  items-start w-1/2">
          <div className="flex flex-col items-start p-3 w-1/2">
            <h4 className="text-2xl font-semibold mb-4 text-left">
              Our Products
            </h4>
            <ul className="list-disc list-inside text-gray-700">
              <li>Single Wall Corrugated Boxes</li>
              <li>Double Wall Corrugated Boxes</li>
              <li>Triple Wall Corrugated Boxes</li>
              <li>Custom Printed Corrugated Boxes</li>
              <li>Die-Cut Corrugated Boxes</li>
            </ul>
          </div>
          <div className="flex flex-col items-start p-3 w-1/2">
            <h3 className="text-2xl font-semibold mb-4 text-left">
              Contact Information
            </h3>
            <ul>
              <li>
                <strong>Phone:</strong>
                <a href="tel:+919380842056">+91 93809 42056</a>
              </li>
              <li>
                <strong>Whatsapp:</strong>
                <a
                  href="https://wa.me/919380842056"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91 93809 42056
                </a>
              </li>
              <li>
                <strong>Email:</strong>
                <a
                  href="mailto:gracepackaging1999@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  gracepackaging1999@gmail.com
                </a>
              </li>
              <li>
                <strong>Address:</strong> 123 Industrial Area, City, Country
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
