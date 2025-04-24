import React, { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("https://formspree.io/f/{your_form_id}", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: new FormData(e.target),
    });

    if (res.ok) {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setStatus("Message sent successfully!");
    } else {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white text-black">
      {/* Left Info */}
      <div className="w-full lg:w-1/2 p-10">
        <p className="text-sm text-orange-600 font-semibold mb-2">CONTACT US NOW</p>
        <h1 className="text-4xl font-extrabold mb-6">
          TYPE OF THIKENESS <br /> 3PLY 4PLY 5PLY  7PLY 9PLY
        </h1>
        <p className="text-lg mb-8">Call us for all your questions today.</p>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h2 className="font-bold uppercase mb-2">Our Address</h2>
            <p>Long Hills Dr 351,<br />New York 07078,<br />United States</p>
          </div>
          <div>
            <h2 className="font-bold uppercase mb-2">Emails</h2>
            <p>manufaktur@example.com<br />solutions@example.com</p>
          </div>
          <div>
            <h2 className="font-bold uppercase mb-2">Phones</h2>
            <p>Main: +238 65 723 22<br />Local: +238 65 723 44</p>
          </div>
          <div>
            <h2 className="font-bold uppercase mb-2">Social</h2>
            <div className="flex space-x-3 text-orange-600 text-xl">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-pinterest-p"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 bg-gray-100 p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-1"
            />
          </div>
          <div>
            <label className="block mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-1"
            />
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-1"
            />
          </div>
          <div>
            <label className="block mb-1">Message</label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-1 h-28"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="flex items-center space-x-2 bg-white border border-gray-300 px-5 py-2 hover:bg-gray-200 transition">
              <span className="text-black">Send message</span>
              <span className="text-orange-500 text-lg">→</span>
            </button>
          </div>
          {status && <p className="text-sm text-green-600">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
