import React from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedProjects() {
  const featured = [
    { id: '1', name: 'Techhansa Cyber Park', location: 'New York', status: 'Ongoing', price: 'From $2M', image: '/images/modern-property.jpg' },
    { id: '2', name: 'The Camellias', location: 'Dubai', status: 'Completed', price: 'From $5M', image: '/images/hero-bg.jpg' },
    { id: '3', name: 'Auris Residences', location: 'California', status: 'New Launch', price: 'From $1.5M', image: '/images/modern-property.jpg' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Signature Developments</h2>
            <p className="text-gray-600 max-w-xl">Explore our curated selection of award-winning residential and commercial spaces.</p>
          </div>
          <Link to="/projects" className="text-[#d09c3a] font-bold hover:underline hidden md:block">View All Projects &rarr;</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featured.map(project => (
            <Link to={`/projects/${project.id}`} key={project.id} className="group block">
              <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-72 w-full overflow-hidden">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-bold rounded-full">{project.status}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-500 mb-4">{project.location}</p>
                  <p className="font-semibold text-lg">{project.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
