import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Property Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Submitting Contact Form:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: 'Property Inquiry', message: '' });
    }, 3000);
  };
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-8 max-w-6xl">
        <h1 className="text-5xl font-bold mb-12 text-center text-gray-900">Contact Us</h1>
        
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Let's Start a Conversation</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you are looking for your dream home, a premium office space, or a lucrative investment, our team of experts is here to guide you every step of the way.
              </p>
              <p className="text-[#d09c3a] font-medium hover:underline mb-2"><a href="tel:+1234567890">+91 98765 43210</a></p>
              <p className="text-[#d09c3a] font-medium hover:underline"><a href="mailto:corporate@techhansainfra.com">corporate@techhansainfra.com</a></p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Department Contacts</h2>
              <ul className="space-y-4 text-gray-600">
                <li><strong>Sales:</strong> <a href="mailto:sales@techhansainfra.com" className="text-[#d09c3a] hover:underline">sales@techhansainfra.com</a></li>
                <li><strong>Vendors:</strong> <a href="mailto:vendors@techhansainfra.com" className="text-[#d09c3a] hover:underline">vendors@techhansainfra.com</a></li>
                <li><strong>Media:</strong> <a href="mailto:pr@techhansainfra.com" className="text-[#d09c3a] hover:underline">pr@techhansainfra.com</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-10 rounded-3xl border border-gray-200 shadow-sm relative">
            {isSubmitted && (
              <div className="absolute inset-0 bg-white/90 rounded-3xl z-10 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4">✓</div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. Our team will get back to you shortly.</p>
              </div>
            )}
            
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Request a Consultation</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#d09c3a] transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#d09c3a] transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#d09c3a] transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#d09c3a] transition-colors" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#d09c3a] transition-colors text-gray-700">
                  <option value="Property Inquiry">Property Inquiry</option>
                  <option value="Partnership/Vendor">Partnership/Vendor</option>
                  <option value="Media/PR">Media/PR</option>
                  <option value="General Support">General Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea required rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#d09c3a] transition-colors resize-none" placeholder="How can we help you today?"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#0a1f2e] text-white font-bold text-lg py-4 rounded-xl hover:bg-black transition-colors shadow-md">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>

        <div className="bg-gray-200 w-full h-96 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center text-gray-500">
          [Interactive Map Embedded Here]
        </div>
      </div>
    </div>
  );
}
