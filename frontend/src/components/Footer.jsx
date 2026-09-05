import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 pt-20 pb-10 border-t border-gray-200">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-gray-900 mb-6">
              <img src="/logo.png" alt="Techhansa Infra Logo" className="w-16 h-16 rounded-full object-contain" />
              <span className="font-title font-semibold text-2xl tracking-tight text-[#d09c3a]">Techhansa Infra</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Building the future of real estate. Discover premium properties, get expert valuations, and find your dream home with us.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#d09c3a] hover:text-white transition-colors font-bold text-lg">
                f
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#d09c3a] hover:text-white transition-colors font-bold text-lg">
                X
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#d09c3a] hover:text-white transition-colors font-bold text-lg">
                in
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-black transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-black transition-colors">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link to="/projects" className="hover:text-black transition-colors">Property Sales</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Property Valuations</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Home Loans</Link></li>
              <li><Link to="/disclaimer" className="hover:text-black transition-colors">Legal Advisory</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-4">Subscribe to our newsletter to get the latest updates on premium properties.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d09c3a]" />
              <button className="bg-black text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Techhansa Infra. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link to="/disclaimer" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
