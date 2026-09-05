import React from 'react';
import Navbar from '../components/Navbar';
import { Droplet, Sun, Leaf, Award } from 'lucide-react';

export default function Sustainability() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <Navbar />
      <section className="pb-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-8 text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">Building a Greener Tomorrow</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We are deeply committed to minimizing our environmental impact. Through green building practices, renewable energy integration, and water conservation, we ensure that our developments are as responsible as they are luxurious.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-8 max-w-6xl mt-24">
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-green-50 rounded-3xl p-8 border border-green-100 text-center">
            <div className="text-green-600 mb-4 flex justify-center"><Droplet size={48} /></div>
            <h3 className="text-4xl font-bold text-green-800 mb-2">50M+</h3>
            <p className="text-green-700 font-medium">Liters Conserved Annually via Rainwater Harvesting</p>
          </div>
          <div className="bg-yellow-50 rounded-3xl p-8 border border-yellow-100 text-center">
            <div className="text-yellow-600 mb-4 flex justify-center"><Sun size={48} /></div>
            <h3 className="text-4xl font-bold text-yellow-800 mb-2">12 MW</h3>
            <p className="text-yellow-700 font-medium">Clean Energy Powered by On-Site Solar</p>
          </div>
          <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 text-center">
            <div className="text-blue-600 mb-4 flex justify-center"><Leaf size={48} /></div>
            <h3 className="text-4xl font-bold text-blue-800 mb-2">-30%</h3>
            <p className="text-blue-700 font-medium">Reduction in Lifetime Carbon Emissions</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Certifications & Awards</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-48 h-48 bg-white shadow-xl rounded-full border-4 border-[#d09c3a] flex flex-col items-center justify-center font-bold text-gray-900 gap-2">
              <Award size={40} className="text-[#d09c3a]" />
              <span className="text-center px-4">IGBC<br/>Platinum</span>
            </div>
            <div className="w-48 h-48 bg-white shadow-xl rounded-full border-4 border-[#d09c3a] flex flex-col items-center justify-center font-bold text-gray-900 gap-2">
              <Award size={40} className="text-[#d09c3a]" />
              <span className="text-center px-4">LEED<br/>Gold</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
