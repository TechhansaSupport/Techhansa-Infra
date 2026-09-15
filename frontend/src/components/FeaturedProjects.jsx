import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedProjects() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter out only featured projects and limit to 6
          const featuredOnly = data.filter(p => p.isFeatured);
          setFeatured(featuredOnly.slice(0, 6));
        } else {
          console.error('API returned an error:', data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
          {loading ? (
            <div className="col-span-full py-12 text-center text-muted">Loading featured projects...</div>
          ) : featured.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted">No featured projects found.</div>
          ) : (
            featured.map(project => (
              <Link to={`/projects/${project._id}`} key={project._id} className="group block">
                <div className="glass-panel rounded-3xl overflow-hidden hover-glow transition-all">
                  <div className="relative h-72 w-full overflow-hidden">
                    <img src={project.coverImage || '/images/modern-property-light.jpg'} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white/90 text-blue px-3 py-1 text-xs font-bold rounded-full border border-slate-200 backdrop-blur-md">{project.status}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{project.name}</h3>
                    <p className="text-muted mb-4">{project.location}</p>
                    <p className="font-semibold text-lg text-emerald">{project.budget || project.price}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
