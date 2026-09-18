import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          inquiryType: formData.subject === 'Property Inquiry' ? 'Project' : 'General',
          message: formData.message
        })
      });
      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: 'Property Inquiry', message: '' });
        }, 3000);
      } else {
        alert('Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    }
  };
  return (
    <div className="pt-40 pb-24 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center text-blue drop-shadow-sm">Contact Us</h1>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-panel p-8 rounded-3xl">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Let's Start a Conversation</h2>
              <p className="text-muted mb-8 leading-relaxed">
                Whether you are looking for your dream home, a premium office space, or a lucrative investment, our team of experts is here to guide you every step of the way.
              </p>
              <p className="text-blue font-medium hover:underline mb-2"><a href="tel:+919711888951">+91 9711888951</a></p>
              <p className="text-blue font-medium hover:underline"><a href="mailto:sales@techhansa.com">sales@techhansa.com</a></p>
            </div>

            <div className="glass-panel p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Department Contacts</h2>
              <ul className="space-y-4 text-muted">
                <li><strong>Sales:</strong> <a href="mailto:sales@techhansa.com" className="text-blue hover:underline">sales@techhansa.com</a></li>
                <li><strong>Vendors:</strong> <a href="mailto:support@techhansa.com" className="text-blue hover:underline">support@techhansa.com</a></li>
                <li><strong>Media:</strong> <a href="mailto:support@techhansa.com" className="text-blue hover:underline">support@techhansa.com</a></li>
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
                  <input required type="text" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <input required type="text" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                <select value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors">
                  <option value="Property Inquiry" className="bg-white text-foreground">Property Inquiry</option>
                  <option value="Partnership/Vendor" className="bg-white text-foreground">Partnership/Vendor</option>
                  <option value="Media/PR" className="bg-white text-foreground">Media/PR</option>
                  <option value="General Support" className="bg-white text-foreground">General Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea required rows="5" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors resize-none" placeholder="How can we help you today?"></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue to-blue-light text-white font-bold text-lg py-4 rounded-xl hover-glow transition-all shadow-md">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-blue font-bold tracking-widest text-sm uppercase mb-2">Find Us</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Offices & Support</h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {/* Corporate Office */}
          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-1 transition-transform">
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Corporate Office</h4>
            <h3 className="text-xl font-bold text-foreground mb-4">Techhansa Infra</h3>
            <p className="text-muted text-sm mb-4">A3-401, The Plaza at 106, Sector 106, Gurgaon, Haryana 122006</p>
            <p className="text-blue text-sm font-medium mb-1">+91 9711888951</p>
            <p className="text-blue text-sm font-medium">sales@techhansa.com</p>
          </div>

          {/* Head Office */}
          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-1 transition-transform">
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Head Office</h4>
            <h3 className="text-xl font-bold text-foreground mb-4">Techhansa Infra</h3>
            <p className="text-muted text-sm mb-4">SHI 8/27 A K-3 Gilat Bazaar Bypass Shivpur Varanasi Uttar Pradesh India 221002</p>
            <p className="text-blue text-sm font-medium mb-1">+91 9711888951</p>
            <p className="text-blue text-sm font-medium">sales@techhansa.com</p>
          </div>


          {/* Support */}
          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-1 transition-transform">
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-1">General Support</h4>
            <h3 className="text-xl font-bold text-foreground mb-4">Customer Support</h3>
            <p className="text-blue text-sm font-medium mb-1">sales@techhansa.com</p>
            <p className="text-blue text-sm font-medium mb-4">+91 9711888951</p>
            <p className="text-muted text-sm italic">Available Monday – Saturday</p>
          </div>
        </div>

        <div className="bg-slate-50 w-full h-[500px] rounded-3xl overflow-hidden shadow-md relative z-0">
          <MapContainer center={[26.5, 78.5]} zoom={5} scrollWheelZoom={false} className="w-full h-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Gurgaon */}
            <Marker position={[28.5115, 76.9936]}>
              <Popup>
                <strong>Corporate Office</strong><br />
                Sector 106, Gurgaon
              </Popup>
            </Marker>
            {/* Varanasi */}
            <Marker position={[25.3582, 82.9739]}>
              <Popup>
                <strong>Head Office</strong><br />
                Shivpur, Varanasi
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
