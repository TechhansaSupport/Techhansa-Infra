import React from 'react';
import Navbar from '../components/Navbar';

export default function AboutUs() {
  return (
    <div className="pt-32 pb-24 text-foreground min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 relative z-10">
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 20%, white 80%, rgba(255,255,255,0) 100%)' }}></div>
        <div className="container mx-auto px-8 text-center max-w-4xl relative z-10">
          <h1 className="text-5xl font-bold mb-6 text-blue drop-shadow-sm">Our Vision & Legacy</h1>
          <p className="text-xl text-muted leading-relaxed">
            At Techhansa Infra, we believe that real estate is about shaping the human experience. For over two decades, our vision has been to blend architectural brilliance with sustainable engineering to create spaces where people thrive. We don't just build homes and offices; we build legacies of trust, quality, and innovation.
          </p>
        </div>
      </section>



      {/* Board of Directors */}
      <section className="pt-12 pb-24">
        <div className="container mx-auto px-8 max-w-6xl">
          <h2 className="text-4xl text-foreground mb-4">
            Our Core Board of <span className="text-gold">Directors</span>
          </h2>
          <div className="w-full h-px bg-slate-200 mb-16"></div>
          
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
                <div className="w-full aspect-[4/3] bg-slate-100 mb-4 overflow-hidden border border-slate-200 shadow-md flex items-center justify-center">
                   {/* Placeholder for actual images */}
                   <span className="text-muted text-sm">No Image</span>
                </div>
                <h3 className="text-[17px] font-bold text-foreground text-center">{director.name}</h3>
                <p className="text-emerald font-semibold text-[13px] text-center mt-1">{director.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-24">
        <div className="container mx-auto px-8 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Industry Excellence & Recognition</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl hover-scale text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="font-bold mb-2 text-foreground">Developer of the Year (Luxury) - 2023</h4>
              <p className="text-xs text-muted">Real Estate Excellence Awards</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl hover-scale text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="font-bold mb-2 text-foreground">Excellence in Sustainable Architecture - 2022</h4>
              <p className="text-xs text-muted">Global Green Building Council</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl hover-scale text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h4 className="font-bold mb-2 text-foreground">Best Commercial Project (Techhansa Cyber Park) - 2021</h4>
              <p className="text-xs text-muted">Asia Pacific Property Awards</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl hover-scale text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="font-bold mb-2 text-foreground">Most Trusted Brand in Real Estate - 2020</h4>
              <p className="text-xs text-muted">Consumer Choice Awards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
