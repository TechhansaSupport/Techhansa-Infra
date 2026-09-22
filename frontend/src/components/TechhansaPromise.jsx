import React from 'react';
import { ShieldCheck, Target, Clock, Layout } from 'lucide-react';

export default function TechhansaPromise() {
  const promises = [
    {
      icon: <ShieldCheck size={32} className="text-emerald" />,
      title: 'Absolute Transparency',
      desc: 'From the first site visit to the final handover, experience zero hidden costs and complete legal clarity. We believe an informed client is a happy client.',
      image: '/images/modern-property-light.jpg'
    },
    {
      icon: <Target size={32} className="text-blue" />,
      title: 'Uncompromising Quality',
      desc: 'We partner with globally renowned architects and use premium-grade materials. Your safety and comfort are our highest priorities.',
      image: '/images/sustainability-hero.jpg'
    },
    {
      icon: <Clock size={32} className="text-gold" />,
      title: 'On-Time Delivery, Guaranteed',
      desc: 'We respect your time and investments. Our agile project management ensures you get your keys exactly when promised.',
      image: '/images/construction.jpg'
    },
    {
      icon: <Layout size={32} className="text-emerald" />,
      title: 'Client-Centric Design',
      desc: 'Every square foot is optimized for your lifestyle—maximizing natural light, cross-ventilation, and functional space.',
      image: '/images/surreal_city_door.jpg'
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue opacity-5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald opacity-5 blur-3xl rounded-full"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">The Techhansa Promise</h2>
          <p className="text-lg text-muted">Why do our clients choose us? Because we build our foundations on trust, transparency, and a relentless commitment to your peace of mind.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300 border border-slate-100 overflow-hidden flex flex-col group">
              <div className="h-40 overflow-hidden bg-slate-200">
                <img src={promise.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={promise.title} />
              </div>
              <div className="p-8 flex-1">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                  {promise.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{promise.title}</h3>
                <p className="text-muted leading-relaxed">{promise.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
