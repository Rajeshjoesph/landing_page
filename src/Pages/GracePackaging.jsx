import React, { useState } from 'react';
import {
  Package, Layers, Palette, Shield, Ruler, Leaf, Truck, DollarSign,
  Phone, MessageCircle, Mail, MapPin, Menu, X, Star, CheckCircle, Box,
} from 'lucide-react';
import logoEmblem from "../assets/Eco Leaf Packaging Emblem.png"
// '../assets/Logo_emblem.png';

// Brand colours sampled from the logo
const GREEN = '#014a2e';
const BROWN = '#804525';

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
  { label: '3D Box Designer', href: '#/box-designer', highlight: true },
];

const GracePackaging = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      alert("Thank you! We'll contact you soon.");
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const products = [
    { icon: Package, title: 'Single Wall Boxes', desc: 'Lightweight, durable packaging for everyday shipping needs.' },
    { icon: Layers, title: 'Double Wall Boxes', desc: 'Enhanced protection with double-layer construction.' },
    { icon: Palette, title: 'Custom Printed Boxes', desc: 'Branded packaging with high-quality printing.' },
    { icon: Shield, title: 'Heavy-Duty Cartons', desc: 'Industrial-strength packaging for demanding applications.' },
  ];

  const features = [
    { icon: Ruler, title: 'Custom Sizes', desc: 'Tailored to your needs' },
    { icon: Leaf, title: 'Eco-Friendly', desc: 'Sustainable materials' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Quick turnaround times' },
    { icon: DollarSign, title: 'Best Pricing', desc: 'Competitive rates' },
  ];

  const contacts = [
    { icon: Phone, label: 'Phone', value: '+91 93809 42056' },
    { icon: MessageCircle, label: 'WhatsApp', value: '+91 93809 42056' },
    { icon: Mail, label: 'Email', value: 'gracepackaging1999@gmail.com' },
    { icon: MapPin, label: 'Address', value: '81B B.v.colony 2nd street, Vyaserpadi, Chennai-600039' },
  ];

  const linkClass = (item) =>
    item.highlight
      ? 'rounded-full px-4 py-1.5 text-white font-semibold shadow hover:opacity-90 transition'
      : 'font-medium text-gray-700 hover:text-[#804525] transition-colors duration-300';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white fixed w-full z-50 shadow-md border-b-4" style={{ borderColor: BROWN }}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <a href="#home" className="flex items-center gap-3">
              <img src={logoEmblem} alt="Grace Packaging logo" className="h-12 w-auto" />
              <span className="leading-tight">
                <span className="block text-2xl font-extrabold" style={{ color: GREEN }}>Grace Packaging</span>
                <span className="block text-[10px] tracking-[0.25em] font-semibold" style={{ color: BROWN }}>YOUR PACKAGING PARTNER</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center space-x-6">
              {NAV.map((item) => (
                <a key={item.label} href={item.href} className={linkClass(item)} style={item.highlight ? { background: GREEN } : undefined}>
                  {item.highlight && <Box size={14} className="inline mr-1 -mt-0.5" />}
                  {item.label}
                </a>
              ))}
            </nav>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2" style={{ color: GREEN }} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-3 pb-3 border-t border-gray-200">
              {NAV.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}
                  className="block py-2 font-medium text-gray-700 hover:text-[#804525]">
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative text-white pt-28 pb-16 min-h-screen flex items-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#012a1a]/90 via-[#014a2e]/80 to-[#3b1e0e]/85"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Reliable Corrugated Packaging Solutions
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-green-50 drop-shadow-md">
              Delivering strength and quality with every box
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#contact" className="inline-block text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl" style={{ background: BROWN }}>
                Get a Quote
              </a>
              <a href="#/box-designer" className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl" style={{ color: GREEN }}>
                <Box size={20} /> Design Your Box in 3D
              </a>
            </div>
            <div className="flex flex-wrap justify-center items-center mt-8 gap-4 text-green-50">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-amber-400 mr-1" /><span>15+ Years Experience</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400 mr-1" /><span>ISO Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <img src={logoEmblem} alt="" className="h-20 w-auto mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: GREEN }}>About Grace Packaging</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: GREEN }}>Our Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.title} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: GREEN }}>
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center" style={{ color: GREEN }}>{product.title}</h3>
                <p className="text-gray-600 text-center text-sm">{product.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Designer promo */}
      <section className="py-14" style={{ background: BROWN }}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Try our 3D Corrugated Box Designer</h2>
            <p className="text-orange-100">
              Pick a box style, enter your size, rotate it in 3D, view the flat dieline and export your design before you order.
            </p>
          </div>
          <a href="#/box-designer" className="inline-flex items-center gap-2 bg-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition" style={{ color: GREEN }}>
            <Box size={18} /> Open the Designer
          </a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16" style={{ background: GREEN }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Why Choose Grace Packaging</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:bg-white/20 transition-all duration-300 text-white">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: BROWN }}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-green-100 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: GREEN }}>Contact Us</h2>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: GREEN }}>Get in Touch</h3>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.label} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0" style={{ background: GREEN }}>
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

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: GREEN }}>Send Message</h3>
              <div className="space-y-4">
                {[['Name', 'name', 'text'], ['Email', 'email', 'email']].map(([label, key, type]) => (
                  <div key={key}>
                    <label className="block text-gray-700 font-medium mb-2">{label}</label>
                    <input type={type} value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#014a2e] focus:ring-2 focus:ring-green-200 outline-none transition-all" />
                  </div>
                ))}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#014a2e] focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"></textarea>
                </div>
                <button onClick={handleSubmit} className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg" style={{ background: GREEN }}>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12" style={{ background: '#012a1a' }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-white rounded-full p-1.5"><img src={logoEmblem} alt="Grace Packaging" className="h-10 w-auto" /></span>
                <h3 className="text-xl font-bold text-orange-300">Grace Packaging</h3>
              </div>
              <p className="text-green-100/70 text-sm">Your trusted partner for reliable corrugated packaging solutions since 1999.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                {NAV.map((l) => (
                  <a key={l.label} href={l.href} className="block text-green-100/70 hover:text-orange-300 transition-colors">{l.label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-green-100/70">
                <p><strong>Call:</strong> +91 93809 42056</p>
                <p><strong>Whatsapp:</strong> +91 93809 42056</p>
                <p><strong>Email:</strong> gracepackaging1999@gmail.com</p>
                <p><strong>Address:</strong> 81B B.v.colony 2nd street,<br />Vyaserpadi chennai-600039</p>
              </div>
            </div>
          </div>
          <div className="border-t border-green-900 pt-8 text-center text-green-100/70 text-sm">
            <p>&copy; 2025 Grace Packaging. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GracePackaging;