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
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
              <p className="text-gray-500 text-lg">{project.location} | RERA: {project.rera}</p>
            </div>
            <div className="bg-[#f0c05a] text-black px-4 py-2 rounded-full font-bold text-sm">
              {project.status}
            </div>
          </div>
          
          {/* Main Hero Image */}
          <div className="w-full h-[500px] bg-gray-200 rounded-3xl overflow-hidden mb-8">
            <img src="/images/modern-property.jpg" alt="Project Hero" className="w-full h-full object-cover" />
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-200 overflow-x-auto pb-4">
            {tabs.map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`font-bold text-lg whitespace-nowrap ${activeTab === tab ? 'text-black border-b-2 border-black pb-4 -mb-[18px]' : 'text-gray-400 hover:text-gray-600'}`}
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
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
                    <p className="text-gray-500 mb-2">Total Area</p>
                    <p className="text-2xl font-bold">{project.overview.acreage}</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
                    <p className="text-gray-500 mb-2">Total Units</p>
                    <p className="text-2xl font-bold">{project.overview.units}</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
                    <p className="text-gray-500 mb-2">Concept</p>
                    <p className="text-xl font-bold">{project.overview.concept}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Techhansa Cyber Park offers an unparalleled business environment in the heart of Gurgaon. Designed for maximum efficiency and aesthetic brilliance.
                </p>
              </div>
            )}

            {activeTab === 'Media' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Media Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-48 bg-gray-200 rounded-xl overflow-hidden">
                       <img src="/images/modern-property.jpg" alt="Gallery" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Pricing' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Configurations & Pricing</h2>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="p-4 font-bold text-gray-600">Unit Type</th>
                        <th className="p-4 font-bold text-gray-600">Area</th>
                        <th className="p-4 font-bold text-gray-600">Starting Price</th>
                        <th className="p-4 font-bold text-gray-600">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.pricing.map((p, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0">
                          <td className="p-4 font-medium">{p.type}</td>
                          <td className="p-4 text-gray-600">{p.area}</td>
                          <td className="p-4 font-bold">{p.price}</td>
                          <td className="p-4"><button className="text-[#d09c3a] font-bold hover:underline">Floor Plan</button></td>
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
                    <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                      <div className="w-2 h-2 rounded-full bg-[#d09c3a]"></div>
                      <span className="font-medium text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Construction' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Construction Updates</h2>
                <div className="space-y-8 pl-4 border-l-2 border-[#d09c3a]">
                  {project.construction.map((update, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[25px] top-1 w-4 h-4 bg-white border-4 border-[#d09c3a] rounded-full"></div>
                      <h3 className="font-bold text-lg mb-1">{update.date}</h3>
                      <p className="text-gray-600">{update.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Lead Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Interested in {project.name}?</h3>
              <p className="text-gray-600 mb-6">Leave your details to download the full brochure and pricing sheet.</p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {isSubmitted && (
                  <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm font-medium">
                    ✓ Brochure link sent to your email!
                  </div>
                )}
                <input 
                  type="text" placeholder="Your Name" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black focus:outline-none"
                />
                <input 
                  type="tel" placeholder="Phone Number" required
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black focus:outline-none"
                />
                <input 
                  type="email" placeholder="Email Address" required
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black focus:outline-none"
                />
                <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors">
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
