import React from 'react';

export default function HomeLoans() {
  return (
    <section id="loans" className="bg-slate-50 text-foreground py-24 border-t border-slate-200">
      <div className="container mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">Flexible Home Loans</h2>
          <p className="text-lg text-muted">
            We partner with top-tier financial institutions to bring you the lowest interest rates and a seamless approval process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Lowest Rates', desc: 'Starting from 8.25% p.a. for premium properties.', icon: '%' },
            { title: 'Fast Approval', desc: 'Get your loan approved within 48 hours of document submission.', icon: '⚡' },
            { title: 'Zero Fees', desc: 'No hidden processing fees on our exclusive partnered projects.', icon: '0' }
          ].map((feature, i) => (
            <div key={i} className="glass-panel border-slate-200 rounded-3xl p-8 hover-scale hover-glow transition-all text-center group">
              <div className="w-16 h-16 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-blue group-hover:bg-blue group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-blue to-blue-light text-white shadow-lg px-8 py-4 rounded-full text-lg font-bold hover-glow transition-colors">
            Check Eligibility
          </button>
        </div>
      </div>
    </section>
  );
}
