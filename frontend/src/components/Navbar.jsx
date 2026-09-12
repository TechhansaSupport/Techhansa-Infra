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
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 glass-nav transition-all duration-300">
      <Link to="/" className="flex items-center gap-3 text-foreground hover:text-blue transition-colors z-50 hover-scale">
        <img src="/logo.png" alt="Techhansa Infra Logo" className="w-20 h-20 rounded-full object-contain shadow-lg border border-slate-200" />
        <span className="font-title font-bold text-3xl tracking-tight text-gold drop-shadow-sm">Techhansa Infra</span>
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
        {navLinks.map(link => (
          <NavLink 
            key={link.path}
            to={link.path} 
            end={link.exact}
            className={({ isActive }) => 
              isActive 
                ? "text-gold font-bold transition-colors" 
                : "hover:text-gold transition-colors"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <a href="tel:+919711888951" className="hidden lg:block text-sm font-semibold text-gold hover:text-gold-light transition-colors">
          +91 9711888951
        </a>
        <Link 
          to="/contact"
          className="bg-gradient-to-r from-blue to-blue-light text-white px-6 py-2 rounded-full text-sm font-medium hover-glow transition-all"
        >
          Enquire Now
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden z-50 p-2 text-muted hover:text-blue"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed inset-0 bg-white z-40 flex flex-col pt-32 px-8 transition-transform duration-300 ease-in-out md:hidden border-l border-slate-100 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 text-xl font-medium text-foreground">
          {navLinks.map(link => (
            <NavLink 
              key={link.path}
              to={link.path} 
              end={link.exact}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                isActive 
                  ? "text-gold font-bold" 
                  : "hover:text-gold"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="mt-auto pb-12 flex flex-col gap-4">
          <a href="tel:+919711888951" className="text-center text-lg font-semibold text-gold">
            +91 9711888951
          </a>
          <Link 
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-gradient-to-r from-blue to-blue-light text-white px-6 py-4 rounded-full text-center font-bold hover-glow transition-all"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
