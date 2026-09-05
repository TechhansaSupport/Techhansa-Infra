import React from 'react';
import Navbar from '../components/Navbar';

export default function AboutUs() {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-8 text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">Our Vision & Legacy</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            At Techhansa Infra, we believe that real estate is about shaping the human experience. For over two decades, our vision has been to blend architectural brilliance with sustainable engineering to create spaces where people thrive. We don't just build homes and offices; we build legacies of trust, quality, and innovation.
          </p>
        </div>
      </section>



      {/* Board of Directors */}
      <section className="pt-12 pb-24 bg-white">
        <div className="container mx-auto px-8 max-w-6xl">
          <h2 className="text-4xl text-gray-900 mb-4">
            Our Core Board of <span className="text-[#d09c3a]">Directors</span>
          </h2>
          <div className="w-full h-px bg-gray-200 mb-16"></div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-16">
            {[
              { name: 'Ashish Mishra', role: 'Founder and CEO' },
              { name: 'Abhishek Mishra', role: 'Co-Founder and CTO' },
              { name: 'Muthu Ramaiah', role: 'Managing Director Singapore' },
              { name: 'Suman Mishra', role: 'President & Director' },
              { name: 'Todd Roth', role: 'Vice President US Operations' },
              { name: 'Archana Singh', role: 'Board Member' },
              { name: 'Rajesh Singh', role: 'Board Member' }
            ].map((director, i) => (
              <div key={i} className="flex flex-col items-center w-56">
                <div className="w-full aspect-[4/3] bg-gray-100 mb-4 overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center">
                   {/* Placeholder for actual images */}
                   <span className="text-gray-400 text-sm">No Image</span>
                </div>
                <h3 className="text-[17px] font-bold text-black text-center">{director.name}</h3>
                <p className="text-[#d09c3a] text-[13px] text-center mt-1">{director.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-24">
        <div className="container mx-auto px-8 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">Industry Excellence & Recognition</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="font-bold mb-2">Developer of the Year (Luxury) - 2023</h4>
              <p className="text-xs text-gray-500">Real Estate Excellence Awards</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="font-bold mb-2">Excellence in Sustainable Architecture - 2022</h4>
              <p className="text-xs text-gray-500">Global Green Building Council</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h4 className="font-bold mb-2">Best Commercial Project (Techhansa Cyber Park) - 2021</h4>
              <p className="text-xs text-gray-500">Asia Pacific Property Awards</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="font-bold mb-2">Most Trusted Brand in Real Estate - 2020</h4>
              <p className="text-xs text-gray-500">Consumer Choice Awards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
