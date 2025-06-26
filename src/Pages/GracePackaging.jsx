import React, { useState } from 'react';
import { 
  Package, 
  Layers, 
  Palette, 
  Shield,
  Ruler,
  Leaf,
  Truck,
  DollarSign,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Menu,
  X,
  Star,
  CheckCircle
} from 'lucide-react';

const GracePackaging = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      alert('Thank you! We\'ll contact you soon.');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const products = [
    {
      icon: Package,
      title: "Single Wall Boxes",
      desc: "Lightweight, durable packaging for everyday shipping needs."
    },
    {
      icon: Layers,
      title: "Double Wall Boxes", 
      desc: "Enhanced protection with double-layer construction."
    },
    {
      icon: Palette,
      title: "Custom Printed Boxes",
      desc: "Branded packaging with high-quality printing."
    },
    {
      icon: Shield,
      title: "Heavy-Duty Cartons",
      desc: "Industrial-strength packaging for demanding applications."
    }
  ];

  const features = [
    { icon: Ruler, title: "Custom Sizes", desc: "Tailored to your needs" },
    { icon: Leaf, title: "Eco-Friendly", desc: "Sustainable materials" },
    { icon: Truck, title: "Fast Delivery", desc: "Quick turnaround times" },
    { icon: DollarSign, title: "Best Pricing", desc: "Competitive rates" }
  ];

  const contacts = [
    { icon: Phone, label: "Phone", value: "+91 93809 42056" },
    { icon: MessageCircle, label: "WhatsApp", value: "+91 93809 42056" },
    { icon: Mail, label: "Email", value: "gracepackaging1999@gmail.com" },
    { icon: MapPin, label: "Address", value: "123 Industrial Area, City" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-600 text-white fixed w-full z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Grace Packaging
            </h1>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {['Home', 'About', 'Products', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-200 transition-colors duration-300 font-medium"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-blue-800">
              {['Home', 'About', 'Products', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative text-white pt-24 pb-16 min-h-screen flex items-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-indigo-900/90"></div>
        
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-lg">
              Reliable Corrugated Packaging Solutions
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 drop-shadow-md">
              Delivering strength and quality with every box 
            </p>
            <a
              href="#contact"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Get a Quote
            </a>
            <div className="flex justify-center items-center mt-8 space-x-6 text-blue-200">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-amber-400 mr-1" />
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400 mr-1" />
                <span>ISO Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
            About Grace Packaging
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              Since 1999, Grace Packaging has been India's trusted corrugated box manufacturer. 
              We combine cutting-edge technology with sustainable practices to deliver premium packaging 
              solutions that protect your products and strengthen your brand.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Our Products
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3 text-center">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {product.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-600 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Why Choose Grace Packaging
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Contact Us
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6">Get in Touch</h3>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <contact.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{contact.label}</p>
                      <p className="text-gray-600 text-sm">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6">Send Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-amber-500 mb-4">Grace Packaging</h3>
              <p className="text-gray-400 text-sm">
                Your trusted partner for reliable corrugated packaging solutions since 1999.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                {['Home', 'About', 'Products', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="block text-gray-400 hover:text-amber-500 transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p><strong>Call:</strong> +91 93809 42056</p>
                <p><strong>Whatsapp:</strong> +91 93809 42056</p>

                <p><strong>Email:</strong> gracepackaging1999@gmail.com</p>
                <p><strong>Address:</strong> 81B B.v.colony 2nd street,<br/>Vyaserpadi chennai-600039</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Grace Packaging. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GracePackaging;