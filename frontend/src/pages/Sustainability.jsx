import React from 'react';
import Navbar from '../components/Navbar';
import { Droplet, Sun, Leaf, Award } from 'lucide-react';

export default function Sustainability() {
  return (
    <div className="pt-32 pb-24 text-foreground min-h-screen">
      <Navbar />
      <section 
        className="py-24 relative z-10 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: 'url("/images/sustainability-hero.jpg")' }}
      >
        <div className="absolute inset-0 z-0 bg-white/20"></div>
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-white/50">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-emerald-700">Building a Greener Tomorrow</h1>
            <p className="text-xl text-slate-800 font-medium leading-relaxed">
              We are deeply committed to minimizing our environmental impact. Through green building practices, renewable energy integration, and water conservation, we ensure that our developments are as responsible as they are luxurious.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl mt-24">
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="rounded-3xl hover-scale glass-panel border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
            <div className="h-48 overflow-hidden bg-slate-200">
              <img src="/images/lake-apartment.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 text-center flex-1">
              <div className="text-emerald mb-4 flex justify-center"><Droplet size={48} /></div>
              <h3 className="text-3xl md:text-4xl font-bold text-emerald mb-2">50M+</h3>
              <p className="text-slate-700 font-bold">Liters Conserved Annually via Rainwater Harvesting</p>
            </div>
          </div>
          <div className="rounded-3xl hover-scale glass-panel border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
            <div className="h-48 overflow-hidden bg-slate-200">
              <img src="/images/hero-bg.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 text-center flex-1">
              <div className="text-gold-600 mb-4 flex justify-center"><Sun size={48} /></div>
              <h3 className="text-3xl md:text-4xl font-bold text-gold-600 mb-2">12 MW</h3>
              <p className="text-slate-700 font-bold">Clean Energy Powered by On-Site Solar</p>
            </div>
          </div>
          <div className="rounded-3xl hover-scale glass-panel border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
            <div className="h-48 overflow-hidden bg-slate-200">
              <img src="/images/sustainability-hero.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 text-center flex-1">
              <div className="text-emerald mb-4 flex justify-center"><Leaf size={48} /></div>
              <h3 className="text-3xl md:text-4xl font-bold text-emerald mb-2">-30%</h3>
              <p className="text-slate-700 font-bold">Reduction in Lifetime Carbon Emissions</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Certifications & Awards</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-64 h-64 rounded-full border-4 border-emerald flex flex-col items-center justify-center text-foreground hover-glow relative overflow-hidden group shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <img src="/images/modern-property-light.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-20" />
              <div className="relative z-10 flex flex-col items-center">
                <Award size={40} className="text-emerald mb-2 drop-shadow-sm" />
                <span className="text-center font-bold px-4 text-emerald drop-shadow-sm">IGBC<br/>Platinum</span>
              </div>
            </div>
            <div className="w-64 h-64 rounded-full border-4 border-gold flex flex-col items-center justify-center text-foreground hover-glow relative overflow-hidden group shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <img src="/images/modern-property.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-20" />
              <div className="relative z-10 flex flex-col items-center">
                <Award size={40} className="text-gold-600 mb-2 drop-shadow-sm" />
                <span className="text-center font-bold px-4 text-gold-600 drop-shadow-sm">LEED<br/>Gold</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
