import React from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedProjects() {
  const featured = [
    { id: '1', name: 'Techhansa Cyber Park', location: 'New York', status: 'Ongoing', price: 'From $2M', image: '/images/modern-property-light.jpg' },
    { id: '2', name: 'The Camellias', location: 'Dubai', status: 'Completed', price: 'From $5M', image: '/images/hero-bg-light.jpg' },
    { id: '3', name: 'Auris Residences', location: 'California', status: 'New Launch', price: 'From $1.5M', image: '/images/modern-property-light.jpg' },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-foreground">Signature Developments</h2>
            <p className="text-muted max-w-xl">Explore our curated selection of award-winning residential and commercial spaces.</p>
          </div>
          <Link to="/projects" className="text-blue font-bold hover:text-blue-light hover:underline hidden md:block transition-colors">View All Projects &rarr;</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featured.map(project => (
            <Link to={`/projects/${project.id}`} key={project.id} className="group block">
              <div className="glass-panel rounded-3xl overflow-hidden hover-glow transition-all">
                <div className="relative h-72 w-full overflow-hidden">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 text-blue px-3 py-1 text-xs font-bold rounded-full border border-slate-200 backdrop-blur-md">{project.status}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">{project.name}</h3>
                  <p className="text-muted mb-4">{project.location}</p>
                  <p className="font-semibold text-lg text-emerald">{project.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
