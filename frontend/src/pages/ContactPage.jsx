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
    <div className="pt-32 pb-24 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-8 max-w-6xl">
        <h1 className="text-5xl font-bold mb-12 text-center text-blue drop-shadow-sm">Contact Us</h1>
        
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-panel p-8 rounded-3xl">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Let's Start a Conversation</h2>
              <p className="text-muted mb-8 leading-relaxed">
                Whether you are looking for your dream home, a premium office space, or a lucrative investment, our team of experts is here to guide you every step of the way.
              </p>
              <p className="text-blue font-medium hover:underline mb-2"><a href="tel:+1234567890">+91 98765 43210</a></p>
              <p className="text-blue font-medium hover:underline"><a href="mailto:corporate@techhansainfra.com">corporate@techhansainfra.com</a></p>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Department Contacts</h2>
              <ul className="space-y-4 text-muted">
                <li><strong>Sales:</strong> <a href="mailto:sales@techhansainfra.com" className="text-blue hover:underline">sales@techhansainfra.com</a></li>
                <li><strong>Vendors:</strong> <a href="mailto:vendors@techhansainfra.com" className="text-blue hover:underline">vendors@techhansainfra.com</a></li>
                <li><strong>Media:</strong> <a href="mailto:pr@techhansainfra.com" className="text-blue hover:underline">pr@techhansainfra.com</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 glass-panel p-10 rounded-3xl relative">
            {isSubmitted && (
              <div className="absolute inset-0 bg-white/90 rounded-3xl z-10 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm border border-slate-200">
                <div className="w-16 h-16 bg-emerald/20 text-emerald rounded-full flex items-center justify-center text-3xl mb-4 shadow-[0_0_15px_rgba(16,185,129,0.3)]">✓</div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Message Sent!</h3>
                <p className="text-muted">Thank you for reaching out. Our team will get back to you shortly.</p>
              </div>
            )}
            
            <h2 className="text-3xl font-bold mb-8 text-foreground">Request a Consultation</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors">
                  <option value="Property Inquiry" className="bg-white text-foreground">Property Inquiry</option>
                  <option value="Partnership/Vendor" className="bg-white text-foreground">Partnership/Vendor</option>
                  <option value="Media/PR" className="bg-white text-foreground">Media/PR</option>
                  <option value="General Support" className="bg-white text-foreground">General Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea required rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors resize-none" placeholder="How can we help you today?"></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue to-blue-light text-white font-bold text-lg py-4 rounded-xl hover-glow transition-all shadow-md">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>

        <div className="bg-slate-50 w-full h-96 rounded-3xl overflow-hidden flex items-center justify-center text-muted border border-slate-200 shadow-md">
          [Interactive Map Embedded Here]
        </div>
      </div>
    </div>
  );
}
