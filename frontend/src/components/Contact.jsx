import React from 'react';

export default function Contact() {
  return (
    <section id="contact-info" className="bg-white text-gray-900 py-24 border-t border-gray-200">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">Get In Touch</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Whether you're looking to buy, sell, or just have a question about the real estate market, our team of experts is here to help.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-500 mb-4">For general inquiries</p>
            <a href="mailto:hello@techhansainfra.com" className="text-[#d09c3a] font-medium hover:underline">hello@techhansainfra.com</a>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-500 mb-4">Mon-Fri from 8am to 6pm</p>
            <a href="tel:+1234567890" className="text-[#d09c3a] font-medium hover:underline">+1 (234) 567-890</a>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-500 mb-4">Corporate Headquarters</p>
            <p className="text-[#d09c3a] font-medium">123 Business Avenue,<br/>New York, NY 10001</p>
          </div>
        </div>
      </div>
    </section>
  );
}
