import React, { useState } from 'react';

export default function Sell() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', propertyType: '' });
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          inquiryType: 'GeneralInterest'
        })
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', email: '', propertyType: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
  };
  return (
    <section id="contact" className="bg-white text-gray-900 py-24">
      <div className="container mx-auto px-8">
        <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 shadow-sm rounded-3xl p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f0c05a] opacity-20 blur-[100px] rounded-full" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Experience Luxury Living.</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                Discover our portfolio of premium residential and commercial spaces. Leave your details below and our property advisors will get in touch with you.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-[#d09c3a]" /> Exclusive Preview Access
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-[#d09c3a]" /> Guided Site Visits
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-[#d09c3a]" /> Dedicated Relationship Manager
                </li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Register Your Interest</h3>
              {submitStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl text-center">
                  <h4 className="text-xl font-bold mb-2">Request Received!</h4>
                  <p>Our property advisors will contact you within 24 hours.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#d09c3a]" 
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#d09c3a]" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address (Optional)" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#d09c3a]" 
                  />
                  <select 
                    required
                    value={formData.propertyType}
                    onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#d09c3a] appearance-none"
                  >
                    <option value="" disabled>Interest Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="retail">Retail</option>
                  </select>

                  {submitStatus === 'error' && (
                    <div className="text-red-400 text-sm">Failed to submit. Please try again.</div>
                  )}

                  <button 
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="w-full bg-[#f0c05a] text-black font-bold text-lg rounded-xl py-4 hover:bg-[#e0b04a] transition-colors mt-2 disabled:opacity-50"
                  >
                    {submitStatus === 'loading' ? 'Submitting...' : 'Submit Details'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
