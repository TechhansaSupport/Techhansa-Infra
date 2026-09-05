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
      image: '/images/modern-property.jpg'
    },
    {
      _id: 2,
      name: 'THE CAMELLIAS',
      location: 'Rent in Dubai, UAE',
      agent: 'Priya S.',
      image: '/images/hero-bg.jpg'
    },
    {
      _id: 3,
      name: 'AURIS RESIDENCES',
      location: 'Rent in Mumbai, MH',
      agent: 'Alex Jam',
      image: '/images/modern-property.jpg'
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
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Modern Real Estate Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-8 pt-32 pb-16 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Content */}
        <div className="max-w-2xl text-gray-900">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#996515] via-[#c59124] to-[#996515] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            WE BUILD THE <br className="hidden md:block" /> FUTURE REAL ESTATE
          </h1>
          <p className="text-gray-800 text-xl max-w-xl leading-relaxed border-l-4 border-[#d09c3a] pl-6 py-1 mb-10">
            Discover a curated portfolio of premium residential and commercial developments designed for the modern visionary.
          </p>

          <div className="bg-white p-4 rounded-3xl shadow-xl flex flex-col md:flex-row gap-4 border border-gray-100 max-w-3xl">
            <select className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#d09c3a]">
              <option value="">Select City</option>
              <option value="new-york">New York</option>
              <option value="dubai">Dubai</option>
              <option value="california">California</option>
            </select>
            <select className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#d09c3a]">
              <option value="">Property Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
            <select className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#d09c3a]">
              <option value="">Budget</option>
              <option value="1M-5M">$1M - $5M</option>
              <option value="5M+">$5M+</option>
            </select>
            <button className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors whitespace-nowrap">
              Find Home
            </button>
          </div>

          {/* Floating Stats Cards */}
          <div className="mt-16 flex flex-col sm:flex-row gap-6">
            <div className="bg-white text-black p-6 rounded-2xl flex items-center gap-6 max-w-[320px] shadow-2xl">
              <div className="w-24 h-24 relative rounded-xl overflow-hidden flex-shrink-0">
                <img src="/images/modern-property.jpg" alt="Property" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1">12.8K+</h3>
                <p className="text-sm text-gray-600 leading-tight">World wide satisfied customer</p>
              </div>
            </div>

            <div className="bg-white text-black p-6 rounded-2xl flex items-center gap-6 max-w-[320px] shadow-2xl">
              <div className="w-24 h-24 relative rounded-xl overflow-hidden flex-shrink-0">
                <img src="/images/hero-bg.jpg" alt="Projects" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1">200+</h3>
                <p className="text-sm text-gray-600 leading-tight">Award winning properties</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Property Card */}
        <div className="hidden lg:block relative w-[400px] h-[500px] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-transparent">
          {properties.map((property, index) => {
            let positionClass = 'opacity-0 scale-90 translate-y-12 pointer-events-none z-0';
            if (index === currentIndex) {
              positionClass = 'opacity-100 scale-100 translate-y-0 z-10';
            } else if (index === (currentIndex - 1 + properties.length) % properties.length) {
              positionClass = 'opacity-0 scale-110 -translate-y-12 pointer-events-none z-0';
            }

            return (
              <div
                key={property._id}
                className={`absolute inset-0 bg-white text-black p-4 flex flex-col gap-4 rounded-[2rem] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${positionClass}`}
              >
                <div className="relative w-full h-[280px] rounded-[1.5rem] overflow-hidden bg-gray-100">
                  <img
                    src={property.coverImage || property.image || '/images/modern-property.jpg'}
                    alt={property.name}
                    className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${index === currentIndex ? 'scale-110' : 'scale-100'}`}
                  />
                </div>
                <div className="px-2 pb-2 bg-white relative z-20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-orange-200 overflow-hidden relative">
                      {/* Avatar placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#d09c3a] to-amber-200" />
                    </div>
                    <span className="font-semibold text-sm">{property.agent || 'Techhansa Agent'}</span>
                  </div>
                  <h4 className="font-bold text-xl mb-1 truncate">{property.name}</h4>
                  <p className="text-gray-500 text-sm mb-6 truncate">{property.location}</p>
                  <Link to={`/projects/${property._id}`} className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 hover:scale-105 transition-all duration-300 w-max block text-center">
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
