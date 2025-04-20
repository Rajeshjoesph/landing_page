

import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // required for carousel styling
// import { Carousel } from 'react-responsive-carousel';

import Carousel from './Carousel';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);
        // You can integrate email sending logic or backend API call here
    };

    return (
        <div className="bg-[#94abbd] shadow-md p-3 flex w-full">
            <div className='w-1/2'>
                <h1>Our Clients</h1>
                <h2>Grace Packagning</h2>
            </div>
            <div className=" w-1/2 flex justify-center items-center p-5">
            <div className="w-1/2 p-8 bg-white  shadow-md rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Message</label>
                        <textarea
                            name="message"
                            rows="4"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#94abbd] text-black font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
            </div>
        </div>
    );
};

export default ContactSection;