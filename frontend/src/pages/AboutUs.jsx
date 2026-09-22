import React from 'react';
import Navbar from '../components/Navbar';

export default function AboutUs() {
  return (
    <div className="pt-32 pb-24 text-foreground min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="py-24 relative z-10 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: 'url("/images/about-us-hero.jpg")' }}
      >
        <div className="absolute inset-0 z-0 bg-white/20"></div>
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-white/50">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Born from a Desire to Elevate the Real Estate Standard</h1>
            <p className="text-xl text-slate-800 font-medium leading-relaxed">
              A decade ago, the real estate market was plagued with a common narrative: project delays, opaque pricing, and broken promises. We started Techhansa Infra to bring corporate governance, ethical transparency, and world-class engineering to the Indian real estate sector. Today, we are proud to be one of the nation’s most trusted developers, not just building structures, but nurturing vibrant, secure communities.
            </p>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="rounded-3xl hover-scale glass-panel shadow-lg border border-slate-200 overflow-hidden flex flex-col group">
              <div className="h-64 relative overflow-hidden">
                <img src="/images/lake-apartment.jpg" alt="Vision" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
              </div>
              <div className="p-10 flex-1">
                <h2 className="text-3xl font-bold text-emerald-600 mb-4">Our Vision</h2>
                <p className="text-lg text-slate-800 font-medium leading-relaxed">
                  To be the most trusted, innovative, and customer-centric real estate brand globally. We envision a future where every Techhansa development is a benchmark for sustainable luxury and community well-being.
                </p>
              </div>
            </div>
            <div className="rounded-3xl hover-scale glass-panel shadow-lg border border-slate-200 overflow-hidden flex flex-col group">
              <div className="h-64 relative overflow-hidden">
                <img src="/images/colony-gate.jpg" alt="Mission" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </div>
              <div className="p-10 flex-1">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Mission</h2>
                <p className="text-lg text-slate-800 font-medium leading-relaxed">
                  To consistently deliver premium residential and commercial spaces that exceed client expectations in design, quality, and delivery timelines. We are dedicated to creating eco-friendly environments that enrich lives and generate exceptional value for our investors.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl text-center font-bold mb-12">The Core Values We Live By</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="rounded-2xl glass-panel shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden flex flex-col">
              <div className="h-40 overflow-hidden bg-slate-200">
                <img src="/images/modern-property-light.jpg" alt="Integrity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-bold text-foreground group-hover:text-blue transition-colors mb-3">Integrity First</h3>
                <p className="text-slate-700 font-medium leading-relaxed">We do the right thing, especially when no one is looking. Ethical dealings are the bedrock of our client relationships.</p>
              </div>
            </div>
            <div className="rounded-2xl glass-panel shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden flex flex-col delay-100">
              <div className="h-40 overflow-hidden bg-slate-200">
                <img src="/images/sustainability-hero.jpg" alt="Sustainability" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-bold text-foreground group-hover:text-emerald transition-colors mb-3">Sustainability as a Standard</h3>
                <p className="text-slate-700 font-medium leading-relaxed">We owe it to the next generation. We build green, minimizing our carbon footprint while maximizing your living experience.</p>
              </div>
            </div>
            <div className="rounded-2xl glass-panel shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden flex flex-col delay-200">
              <div className="h-40 overflow-hidden bg-slate-200">
                <img src="/images/hero-bg.jpg" alt="Innovation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-bold text-foreground group-hover:text-blue transition-colors mb-3">Relentless Innovation</h3>
                <p className="text-slate-700 font-medium leading-relaxed">From smart-home automation to modern structural engineering, we constantly evolve to give our clients the best the world has to offer.</p>
              </div>
            </div>
            <div className="rounded-2xl glass-panel shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden flex flex-col delay-300">
              <div className="h-40 overflow-hidden bg-slate-200">
                <img src="/images/surreal_city_door.jpg" alt="Empathy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-bold text-foreground group-hover:text-gold transition-colors mb-3">Empathy in Execution</h3>
                <p className="text-slate-700 font-medium leading-relaxed">We build homes by putting ourselves in your shoes. Every design choice is made thinking about how your family will live, play, and grow.</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Board of Directors */}
      <section className="pt-12 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="text-3xl md:text-4xl text-foreground mb-4">
            Our Core Board of <span className="text-gold">Directors</span>
          </h2>
          <div className="w-full h-px bg-slate-200 mb-16"></div>
          
          <div className="flex flex-col items-center gap-y-16">
            {/* Top Row: 3 Directors */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
              {[
                { name: 'Ashish Mishra', role: 'Founder and CEO', image: '/images/directors/media_1788862298579.png' },
                { name: 'Abhishek Mishra', role: 'Co-Founder and CTO', image: '/images/directors/media_1788862298403.png' },
                { name: 'Muthu Ramaiah', role: 'Managing Director Singapore', image: '/images/directors/media_1788862298688.png' }
              ].map((director, i) => (
                <div key={i} className="flex flex-col items-center w-36">
                  <div className="w-full aspect-square bg-slate-100 mb-4 overflow-hidden border border-slate-200 shadow-md flex items-center justify-center rounded-xl bg-white/50 backdrop-blur-sm">
                     {director.image ? (
                       <img src={director.image} alt={director.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"  loading="lazy" />
                     ) : (
                       <span className="text-muted text-sm italic">No Image</span>
                     )}
                  </div>
                  <h3 className="text-[15px] font-bold text-foreground text-center">{director.name}</h3>
                  <p className="text-emerald font-semibold text-[12px] text-center mt-1">{director.role}</p>
                </div>
              ))}
            </div>

            {/* Bottom Row: 2 Directors */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
              {[
                { name: 'Suman Mishra', role: 'President & Director', image: '/images/directors/media_1788862721987.png' },
                { name: 'Todd Roth', role: 'Vice President US Operations', image: '/images/directors/media_1788862725252.png' }
              ].map((director, i) => (
                <div key={i} className="flex flex-col items-center w-36">
                  <div className="w-full aspect-square bg-slate-100 mb-4 overflow-hidden border border-slate-200 shadow-md flex items-center justify-center rounded-xl bg-white/50 backdrop-blur-sm">
                     {director.image ? (
                       <img src={director.image} alt={director.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"  loading="lazy" />
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
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">Industry Excellence & Recognition</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl hover-scale text-center">
              <div className="text-3xl md:text-4xl mb-4">🏆</div>
              <h4 className="font-bold mb-2 text-foreground">Developer of the Year</h4>
              <p className="text-xs text-muted">Real Estate Excellence Awards</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl hover-scale text-center">
              <div className="text-3xl md:text-4xl mb-4">🌍</div>
              <h4 className="font-bold mb-2 text-foreground">Excellence in Sustainable Architecture</h4>
              <p className="text-xs text-muted">Global Green Building Council</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl hover-scale text-center">
              <div className="text-3xl md:text-4xl mb-4">🏢</div>
              <h4 className="font-bold mb-2 text-foreground">Best Commercial Project</h4>
              <p className="text-xs text-muted">Asia Pacific Property Awards</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl hover-scale text-center">
              <div className="text-3xl md:text-4xl mb-4">🤝</div>
              <h4 className="font-bold mb-2 text-foreground">Most Trusted Brand in Real Estate</h4>
              <p className="text-xs text-muted">Consumer Choice Awards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
