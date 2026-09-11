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
          
          <div className="flex flex-col items-center gap-y-16">
            {/* Top Row: 4 Directors */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
              {[
                { name: 'Ashish Mishra', role: 'Founder and CEO', image: '/images/directors/media_1788862298579.png' },
                { name: 'Abhishek Mishra', role: 'Co-Founder and CTO', image: '/images/directors/media_1788862298403.png' },
                { name: 'Muthu Ramaiah', role: 'Managing Director Singapore', image: '/images/directors/media_1788862298688.png' },
                { name: 'Suman Mishra', role: 'President & Director', image: '/images/directors/media_1788862721987.png' }
              ].map((director, i) => (
                <div key={i} className="flex flex-col items-center w-36">
                  <div className="w-full aspect-square bg-slate-100 mb-4 overflow-hidden border border-slate-200 shadow-md flex items-center justify-center rounded-xl bg-white/50 backdrop-blur-sm">
                     {director.image ? (
                       <img src={director.image} alt={director.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                     ) : (
                       <span className="text-muted text-sm italic">No Image</span>
                     )}
                  </div>
                  <h3 className="text-[15px] font-bold text-foreground text-center">{director.name}</h3>
                  <p className="text-emerald font-semibold text-[12px] text-center mt-1">{director.role}</p>
                </div>
              ))}
            </div>

            {/* Bottom Row: 3 Directors */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
              {[
                { name: 'Todd Roth', role: 'Vice President US Operations', image: '/images/directors/media_1788862725252.png' },
                { name: 'Archana Singh', role: 'Board Member', image: '/images/directors/media_1788862298740.png' },
                { name: 'Rajesh Singh', role: 'Board Member', image: '/images/directors/media_1788862298521.png' }
              ].map((director, i) => (
                <div key={i} className="flex flex-col items-center w-36">
                  <div className="w-full aspect-square bg-slate-100 mb-4 overflow-hidden border border-slate-200 shadow-md flex items-center justify-center rounded-xl bg-white/50 backdrop-blur-sm">
                     {director.image ? (
                       <img src={director.image} alt={director.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                     ) : (
                       <span className="text-muted text-sm italic">No Image</span>
                     )}
                  </div>
                  <h3 className="text-[15px] font-bold text-foreground text-center">{director.name}</h3>
                  <p className="text-emerald font-semibold text-[12px] text-center mt-1">{director.role}</p>
                </div>
              ))}
            </div>
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
