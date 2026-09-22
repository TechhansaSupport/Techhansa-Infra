import React from 'react';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      text: "We visited over 20 properties before walking into a Techhansa site. The difference in professionalism, design quality, and transparency was night and day. They didn't just sell us a house; they welcomed us into a community.",
      author: "Priya & Rahul M.",
      role: "Residents at Techhansa Heights"
    },
    {
      text: "As a first-time commercial investor, I was nervous. The Techhansa team held my hand through the entire legal and financial process. My retail space was delivered 2 months ahead of schedule!",
      author: "Amit S.",
      role: "Business Owner"
    }
  ];

  return (
    <section className="py-24 relative bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url("/images/lake-apartment.jpg")' }}>
      <div className="absolute inset-0 bg-white/20 z-0"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-white/50 max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Client Success Stories</h2>
            <p className="text-lg text-slate-800 font-medium">Don't just take our word for it. Hear from the families and businesses who have chosen the Techhansa lifestyle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-panel bg-white/90 p-10 rounded-[2rem] relative hover-scale border border-slate-200 shadow-xl">
              <Quote size={48} className="text-gold/20 absolute top-8 left-8" />
              <p className="text-lg text-foreground leading-relaxed relative z-10 mb-8 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-blue to-emerald rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.author}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
