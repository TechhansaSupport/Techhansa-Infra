import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Home, Compass, Trees, Hammer } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-foreground pt-20 pb-10 border-t border-slate-200 relative overflow-hidden">
      {/* Decorative Light Graphics & Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      {/* Faint Geometric Golden Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Infrastructure Illustration Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/images/footer-illustration.jpg" alt="Modern Infrastructure" className="w-full h-full object-cover object-center opacity-30"  loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white/20 z-10" />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-gold transition-colors mb-6">
              <img src="/logo.png" alt="Techhansa Infra Logo" className="w-16 h-16 rounded-full object-contain border border-slate-200"  loading="lazy" />
              <span className="font-title font-semibold text-2xl tracking-tight text-gold">Techhansa Infra</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Building the future of real estate. Discover premium properties, get expert valuations, and find your dream home with us.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue hover:text-white transition-colors font-bold text-lg border border-slate-200">
                f
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue hover:text-white transition-colors font-bold text-lg border border-slate-200">
                X
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue hover:text-white transition-colors font-bold text-lg border border-slate-200">
                in
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-muted text-sm">
              <li><Link to="/" className="hover:text-blue transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-blue transition-colors">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-blue transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4 text-muted text-sm">
              <li><Link to="/projects" className="hover:text-blue transition-colors">Property Sales</Link></li>
              <li><Link to="/contact" className="hover:text-blue transition-colors">Property Valuations</Link></li>
              <li><Link to="/contact" className="hover:text-blue transition-colors">Home Loans</Link></li>
              <li><Link to="/disclaimer" className="hover:text-blue transition-colors">Legal Advisory</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-muted text-sm mb-4">Subscribe to our newsletter to get the latest updates on premium properties.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Email Address" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue" />
              <button className="bg-gradient-to-r from-blue to-blue-light text-white px-4 py-3 rounded-lg font-semibold hover-glow transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} Techhansa Infra. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-blue transition-colors">Privacy Policy</Link>
            <Link to="/disclaimer" className="hover:text-blue transition-colors">Terms of Service</Link>
            <Link to="/admin" className="ml-2 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs font-semibold transition-colors border border-slate-200">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
