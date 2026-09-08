import React from 'react';
import Navbar from '../components/Navbar';
import { Droplet, Sun, Leaf, Award } from 'lucide-react';

export default function Sustainability() {
  return (
    <div className="pt-32 pb-24 text-foreground min-h-screen">
      <Navbar />
      <section className="py-16 relative z-10">
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 20%, white 80%, rgba(255,255,255,0) 100%)' }}></div>
        <div className="container mx-auto px-8 text-center max-w-4xl relative z-10">
          <h1 className="text-5xl font-bold mb-6 text-emerald drop-shadow-sm">Building a Greener Tomorrow</h1>
          <p className="text-xl text-muted leading-relaxed">
            We are deeply committed to minimizing our environmental impact. Through green building practices, renewable energy integration, and water conservation, we ensure that our developments are as responsible as they are luxurious.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-8 max-w-6xl mt-24">
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="glass-panel rounded-3xl p-8 text-center hover-scale">
            <div className="text-emerald mb-4 flex justify-center"><Droplet size={48} /></div>
            <h3 className="text-4xl font-bold text-emerald mb-2">50M+</h3>
            <p className="text-foreground font-medium">Liters Conserved Annually via Rainwater Harvesting</p>
          </div>
          <div className="glass-panel rounded-3xl p-8 text-center hover-scale">
            <div className="text-gold mb-4 flex justify-center"><Sun size={48} /></div>
            <h3 className="text-4xl font-bold text-gold mb-2">12 MW</h3>
            <p className="text-foreground font-medium">Clean Energy Powered by On-Site Solar</p>
          </div>
          <div className="glass-panel rounded-3xl p-8 text-center hover-scale">
            <div className="text-emerald mb-4 flex justify-center"><Leaf size={48} /></div>
            <h3 className="text-4xl font-bold text-emerald mb-2">-30%</h3>
            <p className="text-foreground font-medium">Reduction in Lifetime Carbon Emissions</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Certifications & Awards</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-48 h-48 bg-white shadow-[0_0_15px_rgba(16,185,129,0.3)] rounded-full border-4 border-emerald flex flex-col items-center justify-center font-bold text-foreground gap-2 hover-glow">
              <Award size={40} className="text-emerald" />
              <span className="text-center px-4">IGBC<br/>Platinum</span>
            </div>
            <div className="w-48 h-48 bg-white shadow-[0_0_15px_rgba(212,175,55,0.3)] rounded-full border-4 border-gold flex flex-col items-center justify-center font-bold text-foreground gap-2 hover-glow">
              <Award size={40} className="text-gold" />
              <span className="text-center px-4">LEED<br/>Gold</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
