import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function ProjectDetail() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Downloading Brochure for:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', email: '' });
    }, 3000);
  };

  const project = {
    name: 'Techhansa Cyber Park',
    location: 'Sector 54, Gurgaon',
    status: 'Ongoing',
    rera: 'HRERA-12345',
    overview: { acreage: '5 Acres', units: '250', concept: 'Modern Commercial Hub' },
    pricing: [
      { type: 'Office Space', area: '1000 sq ft', price: '₹1.5 Cr' },
      { type: 'Retail Shop', area: '500 sq ft', price: '₹80 Lac' }
    ],
    amenities: ['24/7 Security', 'High-Speed Elevators', 'Food Court', 'Gymnasium'],
    construction: [
      { date: 'Oct 2026', desc: 'Foundation completed.' },
      { date: 'Dec 2026', desc: 'Structure up to 5th floor.' }
    ]
  };

  const tabs = ['Overview', 'Media', 'Pricing', 'Amenities', 'Construction'];

  return (
    <div className="text-foreground min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 border-b border-slate-200">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-blue">{project.name}</h1>
              <p className="text-muted text-lg">{project.location} | RERA: {project.rera}</p>
            </div>
            <div className="bg-emerald-100 text-emerald border border-emerald-200 px-4 py-2 rounded-full font-bold text-sm shadow-md">
              {project.status}
            </div>
          </div>
          
          {/* Main Hero Image */}
          <div className="w-full h-[500px] bg-slate-100 rounded-3xl overflow-hidden mb-8 shadow-xl">
            <img src="/images/modern-property-light.jpg" alt="Project Hero" className="w-full h-full object-cover" />
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-slate-200 overflow-x-auto pb-4">
            {tabs.map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`font-bold text-lg whitespace-nowrap transition-colors ${activeTab === tab ? 'text-blue border-b-2 border-blue pb-4 -mb-[18px]' : 'text-muted hover:text-foreground'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 relative">
        <div className="container mx-auto px-8 max-w-6xl grid lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2">
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="glass-panel p-6 rounded-2xl hover-scale text-center">
                    <p className="text-muted mb-2">Total Area</p>
                    <p className="text-2xl font-bold text-blue">{project.overview.acreage}</p>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl hover-scale text-center">
                    <p className="text-muted mb-2">Total Units</p>
                    <p className="text-2xl font-bold text-blue">{project.overview.units}</p>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl hover-scale text-center">
                    <p className="text-muted mb-2">Concept</p>
                    <p className="text-xl font-bold text-blue">{project.overview.concept}</p>
                  </div>
                </div>
                <p className="text-muted leading-relaxed">
                  Techhansa Cyber Park offers an unparalleled business environment in the heart of Gurgaon. Designed for maximum efficiency and aesthetic brilliance.
                </p>
              </div>
            )}

            {activeTab === 'Media' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Media Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-48 bg-slate-100 rounded-xl overflow-hidden shadow-md">
                       <img src="/images/modern-property-light.jpg" alt="Gallery" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Pricing' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Configurations & Pricing</h2>
                <div className="glass-panel rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-4 font-bold text-muted">Unit Type</th>
                        <th className="p-4 font-bold text-muted">Area</th>
                        <th className="p-4 font-bold text-muted">Starting Price</th>
                        <th className="p-4 font-bold text-muted">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.pricing.map((p, i) => (
                        <tr key={i} className="border-b border-slate-200 last:border-0 hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-medium text-foreground">{p.type}</td>
                          <td className="p-4 text-muted">{p.area}</td>
                          <td className="p-4 font-bold text-blue">{p.price}</td>
                          <td className="p-4"><button className="text-emerald font-bold hover:underline">Floor Plan</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'Amenities' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {project.amenities.map((amenity, i) => (
                    <div key={i} className="glass-panel p-4 rounded-xl flex items-center gap-3 hover-scale">
                      <div className="w-2 h-2 rounded-full bg-blue shadow-[0_0_8px_rgba(14,165,233,0.3)]"></div>
                      <span className="font-medium text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Construction' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Construction Updates</h2>
                <div className="space-y-8 pl-4 border-l-2 border-blue">
                  {project.construction.map((update, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[25px] top-1 w-4 h-4 bg-white border-4 border-blue rounded-full shadow-[0_0_8px_rgba(14,165,233,0.3)]"></div>
                      <h3 className="font-bold text-lg mb-1 text-blue">{update.date}</h3>
                      <p className="text-muted">{update.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Lead Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 glass-panel p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4 text-blue">Interested in {project.name}?</h3>
              <p className="text-muted mb-6">Leave your details to download the full brochure and pricing sheet.</p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {isSubmitted && (
                  <div className="bg-emerald-100 border border-emerald-200 text-emerald-600 px-4 py-3 rounded-xl mb-4 text-sm font-medium shadow-md">
                    ✓ Brochure link sent to your email!
                  </div>
                )}
                <input 
                  type="text" placeholder="Your Name" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-foreground focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue transition-colors"
                />
                <input 
                  type="tel" placeholder="Phone Number" required
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-foreground focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue transition-colors"
                />
                <input 
                  type="email" placeholder="Email Address" required
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-foreground focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue transition-colors"
                />
                <button type="submit" className="w-full bg-gradient-to-r from-blue to-blue-light text-white font-bold py-4 rounded-xl hover-glow transition-all">
                  Download Brochure
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
