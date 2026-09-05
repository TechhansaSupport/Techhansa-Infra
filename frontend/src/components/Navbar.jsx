import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'About Us' },
    { path: '/projects', label: 'Projects' },
    { path: '/sustainability', label: 'Sustainability' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-md border-b border-gray-200">
      <Link to="/" className="flex items-center gap-3 text-gray-900 hover:text-black transition-colors z-50">
        <img src="/logo.png" alt="Techhansa Infra Logo" className="w-20 h-20 rounded-full object-contain shadow-sm border border-gray-100" />
        <span className="font-title font-bold text-3xl tracking-tight text-[#d09c3a]">Techhansa Infra</span>
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        {navLinks.map(link => (
          <NavLink 
            key={link.path}
            to={link.path} 
            end={link.exact}
            className={({ isActive }) => 
              isActive 
                ? "text-[#d09c3a] font-bold transition-colors" 
                : "hover:text-black transition-colors"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <a href="tel:+1234567890" className="hidden lg:block text-sm font-semibold text-[#d09c3a] hover:text-black transition-colors">
          +91 98765 43210
        </a>
        <Link 
          to="/contact"
          className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Enquire Now
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden z-50 p-2 text-gray-600 hover:text-black"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed inset-0 bg-white z-40 flex flex-col pt-32 px-8 transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 text-xl font-medium text-gray-800">
          {navLinks.map(link => (
            <NavLink 
              key={link.path}
              to={link.path} 
              end={link.exact}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                isActive 
                  ? "text-[#d09c3a] font-bold" 
                  : "hover:text-black"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="mt-auto pb-12 flex flex-col gap-4">
          <a href="tel:+1234567890" className="text-center text-lg font-semibold text-[#d09c3a]">
            +91 98765 43210
          </a>
          <Link 
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-black text-white px-6 py-4 rounded-full text-center font-bold hover:bg-gray-800 transition-colors"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
