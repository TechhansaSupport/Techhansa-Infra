import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [apiError, setApiError] = useState(false);

  const dummyProperties = [];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects`)
      .then(res => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          const featured = data.filter(p => p.isFeatured);
          setProperties(featured.length > 0 ? featured : data.slice(0, 5));
          setApiError(false);
        } else {
          setProperties(dummyProperties);
        }
      })
      .catch(err => {
        console.error(err);
        setProperties(dummyProperties);
        setApiError(true);
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
          src="/images/hero-bg-new.png"
          alt="Modern Real Estate Background"
          className="w-full h-full object-cover object-[60%_center] animate-slow-zoom"
        />
        {/* Gradient Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-32 pb-16 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Content */}
        <div className="max-w-2xl text-foreground animate-fade-in">
          <h1 className="text-3xl md:text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald to-emerald-light drop-shadow-[0_4px_12px_rgba(16,185,129,0.3)]">
            WE BUILD THE <br /> FUTURE <br /> REAL ESTATE
          </h1>
          <p className="text-muted text-xl max-w-xl leading-relaxed border-l-4 border-gold pl-6 py-1 mb-10">
            Discover a curated portfolio of premium residential and commercial developments designed for the modern visionary. At Techhansa Infra, we bring decades of excellence in crafting sustainable, ultra-luxury spaces that redefine urban living.
          </p>

          {apiError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-2 rounded-lg text-sm font-medium mb-6 inline-block shadow-sm">
              ⚠ Cannot connect to database. Showing offline preview data.
            </div>
          )}

          <div className="glass-panel p-4 rounded-3xl flex flex-col md:flex-row gap-4 max-w-3xl animate-slide-up">
            <select 
              value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all"
            >
              <option value="">Select City</option>
              {[...new Set(properties.map(p => p.city).filter(Boolean))].map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <select 
              value={selectedType} onChange={e => setSelectedType(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all"
            >
              <option value="">Property Type</option>
              {[...new Set(properties.map(p => p.propertyType).filter(Boolean))].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select 
              value={selectedBudget} onChange={e => setSelectedBudget(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all"
            >
              <option value="">Budget</option>
              <option value="Under 1Cr">Under ₹1 Cr</option>
              <option value="1Cr-5Cr">₹1 Cr - ₹5 Cr</option>
              <option value="5Cr+">₹5 Cr+</option>
            </select>
            <button 
              onClick={() => {
                const params = new URLSearchParams();
                if (selectedCity) params.append('city', selectedCity);
                if (selectedType) params.append('type', selectedType);
                if (selectedBudget) params.append('budget', selectedBudget);
                navigate(`/projects?${params.toString()}`);
              }}
              className="bg-gradient-to-r from-blue to-blue-light text-white px-4 md:px-8 py-3 rounded-xl font-bold hover-glow transition-all whitespace-nowrap"
            >
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
        <div className="hidden lg:block relative w-[400px] h-[460px] -mt-48 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-transparent">
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
                className={`absolute inset-0 bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${positionClass}`}
              >
                {/* Image Section */}
                <div className="relative w-full h-[55%] overflow-hidden bg-slate-100 group">
                  <img
                    src={property.coverImage || property.image || '/images/modern-property-light.jpg'}
                    alt={property.name}
                    className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${index === currentIndex ? 'scale-110' : 'scale-100'}`}
                  />
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-blue px-3 py-1.5 text-xs font-bold rounded-full shadow-sm border border-white">
                    {property.status || 'Premium'}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-white relative z-10">
                  <div>
                    <h4 className="font-bold text-2xl mb-1.5 text-foreground truncate">{property.name}</h4>
                    <p className="text-muted text-sm flex items-center gap-1.5 mb-4 truncate">
                      <MapPin size={14} className="text-gold" />
                      {property.location}
                    </p>
                  </div>

                  <Link to={`/projects/${property._id}`} className="group/btn flex items-center justify-center gap-2 bg-gradient-to-r from-blue to-blue-light text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_8px_20px_rgba(14,165,233,0.3)] hover:-translate-y-0.5">
                    View Details
                    <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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
