import React, { useState } from 'react';
import { TrendingUp, Shield, HeartHandshake, FileText, BarChart3, PieChart, Landmark } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Investors() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    investmentSize: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', company: '', email: '', phone: '', investmentSize: '', message: '' });
    }, 3000);
  };

  return (
    <div className="pt-28 pb-20 text-foreground min-h-screen">
      <Navbar />
      {/* Header */}
      <section 
        className="py-24 relative z-10 bg-fixed bg-center bg-cover mb-16"
        style={{ backgroundImage: 'url("/images/investors-hero.jpg")' }}
      >
        <div className="absolute inset-0 bg-white/20 z-0"></div>
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-white/50">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 pb-2 text-foreground leading-normal">
              Partnering for Prosperity
            </h1>
            <p className="text-xl text-slate-900 font-medium leading-relaxed">
              Real estate remains one of the safest, most lucrative asset classes—if you choose the right partner. Discover why high-net-worth clients and institutional stakeholders trust Techhansa Infra.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Financial Highlights */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Financial Highlights & Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel border border-slate-200 shadow-sm rounded-2xl text-center group hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col">
              <div className="h-32 overflow-hidden bg-slate-200">
                <img src="/images/modern-property-light.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex-1">
                <div className="w-16 h-16 mx-auto bg-blue/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 size={32} className="text-blue" />
                </div>
                <h3 className="text-4xl font-black text-foreground mb-2">24%</h3>
                <p className="text-slate-700 font-bold">YoY Revenue Growth</p>
              </div>
            </div>
            <div className="glass-panel border border-slate-200 shadow-sm rounded-2xl text-center group hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col">
              <div className="h-32 overflow-hidden bg-slate-200">
                <img src="/images/sustainability-hero.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex-1">
                <div className="w-16 h-16 mx-auto bg-emerald/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PieChart size={32} className="text-emerald" />
                </div>
                <h3 className="text-4xl font-black text-foreground mb-2">₹100 Cr</h3>
                <p className="text-slate-700 font-bold">Assets Under Management</p>
              </div>
            </div>
            <div className="glass-panel border border-slate-200 shadow-sm rounded-2xl text-center group hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col">
              <div className="h-32 overflow-hidden bg-slate-200">
                <img src="/images/surreal_city_door.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex-1">
                <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Landmark size={32} className="text-gold" />
                </div>
                <h3 className="text-4xl font-black text-foreground mb-2">Zero</h3>
                <p className="text-slate-700 font-bold">Debt on Completed Projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Invest Section */}
          <div className="rounded-2xl hover-scale glass-panel shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row overflow-hidden group">
            <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-slate-200">
               <img src="/images/hero-bg.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 md:w-2/3 flex flex-col justify-center">
              <div className="w-14 h-14 rounded-xl bg-emerald/10 flex items-center justify-center mb-6">
                <TrendingUp size={28} className="text-emerald" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Proven Track Record of ROI</h3>
              <p className="text-slate-700 font-medium leading-relaxed">
                Our clients consistently see property appreciation rates that outperform the market average, driven by our strategic land acquisitions and premium build quality.
              </p>
            </div>
          </div>

          <div className="rounded-2xl hover-scale glass-panel shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row-reverse overflow-hidden group">
            <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-slate-200">
               <img src="/images/media-hero.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 md:w-2/3 flex flex-col justify-center">
              <div className="w-14 h-14 rounded-xl bg-blue/10 flex items-center justify-center mb-6">
                <Shield size={28} className="text-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Flawless Corporate Governance</h3>
              <p className="text-slate-700 font-medium leading-relaxed">
                We operate with audited financial transparency, zero regulatory violations, and strict compliance with RERA and all local governing bodies.
              </p>
            </div>
          </div>

          <div className="rounded-2xl hover-scale glass-panel shadow-sm border border-slate-200 flex flex-col md:flex-row overflow-hidden group">
            <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-slate-200">
               <img src="/images/construction.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 md:w-2/3 flex flex-col justify-center">
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                <FileText size={28} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Risk-Mitigated Portfolios</h3>
              <p className="text-slate-700 font-medium leading-relaxed">
                Our diverse portfolio spanning residential, commercial, and plotted developments ensures a balanced, risk-adjusted growth strategy.
              </p>
            </div>
          </div>

        {/* CSR Section */}
        <div className="bg-slate-50 rounded-3xl p-10 md:p-16 mb-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <HeartHandshake size={32} className="text-red-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Building More Than Just Buildings</h2>
              <p className="text-lg text-muted mb-6">
                Our commitment extends beyond our property lines. A portion of every investment made with us goes towards Corporate Social Responsibility (CSR).
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue mt-2"></div>
                  <p className="text-foreground"><strong>Education & Skill Development:</strong> Funding schools for underprivileged children near our construction sites.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald mt-2"></div>
                  <p className="text-foreground"><strong>Environmental Stewardship:</strong> Planting 10 trees for every apartment built and cleaning local water bodies.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold mt-2"></div>
                  <p className="text-foreground"><strong>Labor Welfare:</strong> Providing health camps, safe housing, and fair wages for the thousands of workers who physically build our visions.</p>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <img src="/images/hero-bg-light.jpg" alt="CSR Initiatives" className="rounded-2xl shadow-lg w-full h-[400px] object-cover" />
            </div>
          </div>
        </div>

        {/* Investor Contact Section */}
        <div className="glass-panel rounded-3xl p-8 md:p-16 max-w-4xl mx-auto shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue to-emerald"></div>
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Connect with Investor Relations</h2>
            <p className="text-muted">Interested in exploring partnership opportunities or receiving our latest financial disclosures? Fill out the form below and our relations team will be in touch securely.</p>
          </div>

          {isSubmitted && (
            <div className="mb-8 p-4 bg-emerald/10 border border-emerald/20 rounded-xl text-emerald flex items-center justify-center font-medium animate-fade-in">
              Thank you for your interest. Our Investor Relations team will contact you shortly.
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company / Institution</label>
                <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue transition-colors" placeholder="Capital Partners LLC" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Work Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue transition-colors" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue transition-colors" placeholder="+91 98765 43210" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Intended Investment Size (Optional)</label>
              <select value={formData.investmentSize} onChange={e => setFormData({...formData, investmentSize: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue transition-colors">
                <option value="">Select Range</option>
                <option value="Under 5Cr">Under ₹5 Cr</option>
                <option value="5Cr - 20Cr">₹5 Cr - ₹20 Cr</option>
                <option value="20Cr - 50Cr">₹20 Cr - ₹50 Cr</option>
                <option value="50Cr+">₹50 Cr+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message or Inquiry</label>
              <textarea required rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue transition-colors resize-none" placeholder="Please let us know how we can assist you..."></textarea>
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-blue to-blue-light text-white font-bold text-lg py-4 rounded-xl hover-glow transition-all">
              Submit Request
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
