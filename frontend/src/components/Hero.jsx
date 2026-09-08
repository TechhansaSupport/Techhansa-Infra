import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [properties, setProperties] = useState([]);

  const dummyProperties = [
    {
      _id: 1,
      name: 'TECHHANSA CYBER PARK',
      location: 'Rent in Gurgaon, HR',
      agent: 'Rajiv T.',
      image: '/images/modern-property-light.jpg'
    },
    {
      _id: 2,
      name: 'THE CAMELLIAS',
      location: 'Rent in Dubai, UAE',
      agent: 'Priya S.',
      image: '/images/hero-bg-light.jpg'
    },
    {
      _id: 3,
      name: 'AURIS RESIDENCES',
      location: 'Rent in Mumbai, MH',
      agent: 'Alex Jam',
      image: '/images/modern-property-light.jpg'
    }
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProperties(data);
        } else {
          setProperties(dummyProperties);
        }
      })
      .catch(err => {
        console.error(err);
        setProperties(dummyProperties);
      });
  }, []);

  useEffect(() => {
    if (properties.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % properties.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [properties]);
  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
      >
        <img
          src="/images/hero-bg-light.jpg"
          alt="Modern Real Estate Background"
          className="w-full h-full object-cover object-center animate-slow-zoom"
        />
        {/* Gradient Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30" />
      </div>

      <div className="relative z-10 container mx-auto px-8 pt-32 pb-16 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Content */}
        <div className="max-w-2xl text-foreground animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald to-emerald-light drop-shadow-[0_4px_12px_rgba(16,185,129,0.3)]">
            WE BUILD THE <br className="hidden md:block" /> FUTURE REAL ESTATE
          </h1>
          <p className="text-muted text-xl max-w-xl leading-relaxed border-l-4 border-gold pl-6 py-1 mb-10">
            Discover a curated portfolio of premium residential and commercial developments designed for the modern visionary. At Techhansa Infra, we bring decades of excellence in crafting sustainable, ultra-luxury spaces that redefine urban living.
          </p>

          <div className="glass-panel p-4 rounded-3xl flex flex-col md:flex-row gap-4 max-w-3xl animate-slide-up">
            <select className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all">
              <option value="">Select City</option>
              <option value="new-york">New York</option>
              <option value="dubai">Dubai</option>
              <option value="california">California</option>
            </select>
            <select className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all">
              <option value="">Property Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
            <select className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all">
              <option value="">Budget</option>
              <option value="1M-5M">$1M - $5M</option>
              <option value="5M+">$5M+</option>
            </select>
            <button className="bg-gradient-to-r from-blue to-blue-light text-white px-8 py-3 rounded-xl font-bold hover-glow transition-all whitespace-nowrap">
              Find Home
            </button>
          </div>

          {/* Floating Stats Cards */}
          <div className="mt-16 flex flex-col sm:flex-row gap-6">
            <div className="glass-panel text-foreground p-6 rounded-2xl flex items-center gap-6 max-w-[320px] hover-scale">
              <div className="w-24 h-24 relative rounded-xl overflow-hidden flex-shrink-0">
                <img src="/images/modern-property-light.jpg" alt="Property" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1 text-blue">12.8K+</h3>
                <p className="text-sm text-muted leading-tight">World wide satisfied customer</p>
              </div>
            </div>

            <div className="glass-panel text-foreground p-6 rounded-2xl flex items-center gap-6 max-w-[320px] hover-scale">
              <div className="w-24 h-24 relative rounded-xl overflow-hidden flex-shrink-0">
                <img src="/images/hero-bg-light.jpg" alt="Projects" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1 text-blue">200+</h3>
                <p className="text-sm text-muted leading-tight">Award winning properties</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Property Card */}
        <div className="hidden lg:block relative w-[400px] h-[500px] -mt-32 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-transparent">
          {properties.map((property, index) => {
            let positionClass = 'opacity-0 scale-95 translate-x-16 pointer-events-none z-0';
            if (index === currentIndex) {
              positionClass = 'opacity-100 scale-100 translate-x-0 z-10';
            } else if (index === (currentIndex - 1 + properties.length) % properties.length) {
              positionClass = 'opacity-0 scale-105 -translate-x-16 pointer-events-none z-0';
            }

            return (
              <div
                key={property._id}
                className={`absolute inset-0 glass-panel p-4 flex flex-col gap-4 rounded-[2rem] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${positionClass}`}
              >
                <div className="relative w-full h-[280px] rounded-[1.5rem] overflow-hidden bg-slate-100">
                  <img
                    src={property.coverImage || property.image || '/images/modern-property-light.jpg'}
                    alt={property.name}
                    className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${index === currentIndex ? 'scale-110' : 'scale-100'}`}
                  />
                </div>
                <div className="px-2 pb-2 relative z-20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                      {/* Avatar placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-gold to-gold-light" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">{property.agent || 'Techhansa Agent'}</span>
                  </div>
                  <h4 className="font-bold text-xl mb-1 truncate text-gold">{property.name}</h4>
                  <p className="text-muted text-sm mb-6 truncate">{property.location}</p>
                  <Link to={`/projects/${property._id}`} className="bg-gradient-to-r from-blue to-blue-light text-white px-6 py-3 rounded-full text-sm font-medium hover-glow transition-all duration-300 w-max block text-center shadow-lg">
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
