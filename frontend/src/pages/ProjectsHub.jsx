import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useSearchParams } from 'react-router-dom';

export default function ProjectsHub() {
  const [searchParams] = useSearchParams();

  const [view, setView] = useState('list'); // 'list' or 'map'
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'All');
  const [cityFilter, setCityFilter] = useState(searchParams.get('city') || 'All');
  const [budgetFilter, setBudgetFilter] = useState(searchParams.get('budget') || 'All');

  const projects = [
    { id: 1, name: 'Techhansa Cyber Park', rera: 'HRERA-12345', location: 'Gurgaon', type: 'Commercial', status: 'Ongoing', image: '/images/modern-property-light.jpg' },
    { id: 2, name: 'The Camellias', rera: 'HRERA-67890', location: 'Gurgaon', type: 'Residential', status: 'Completed', image: '/images/hero-bg-light.jpg' },
    { id: 3, name: 'Auris Residences', rera: 'MH-RERA-54321', location: 'Mumbai', type: 'Residential', status: 'New Launch', image: '/images/modern-property-light.jpg' },
    { id: 4, name: 'Eco Plots Phase 1', rera: 'HRERA-11111', location: 'Gurgaon', type: 'Plots', status: 'Future', image: '/images/hero-bg-light.jpg' }
  ];

  const filteredProjects = projects.filter(p => {
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (typeFilter !== 'All' && p.type !== typeFilter) return false;
    if (cityFilter !== 'All' && p.location !== cityFilter) return false;
    return true;
  });

  return (
    <div className="text-foreground min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-12 border-b border-slate-200">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-blue">Our Portfolio</h1>
              <p className="text-muted">Filter through our extensive portfolio of completed, ongoing, and future developments across key global markets.</p>
            </div>
            <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl">
              <button 
                onClick={() => setView('list')}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${view === 'list' ? 'bg-gradient-to-r from-blue to-blue-light text-white shadow-sm' : 'text-muted hover:text-blue'}`}
              >
                List View
              </button>
              <button 
                onClick={() => setView('map')}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${view === 'map' ? 'bg-gradient-to-r from-blue to-blue-light text-white shadow-sm' : 'text-muted hover:text-blue'}`}
              >
                Map View
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-foreground focus:outline-none focus:border-blue"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Future">Future</option>
              <option value="New Launch">New Launch</option>
            </select>

            <select 
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-foreground focus:outline-none focus:border-blue"
            >
              <option value="All">All Cities</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Dubai">Dubai</option>
              <option value="Mumbai">Mumbai</option>
            </select>

            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-foreground focus:outline-none focus:border-blue"
            >
              <option value="All">All Property Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Plots">Plots</option>
            </select>

            <select 
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-foreground focus:outline-none focus:border-blue"
            >
              <option value="All">All Budgets</option>
              <option value="Under 1Cr">Under ₹1 Cr</option>
              <option value="1Cr-5Cr">₹1 Cr - ₹5 Cr</option>
              <option value="5Cr+">₹5 Cr+</option>
            </select>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-8">
          {view === 'list' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <Link to={`/projects/${project.id}`} key={project.id} className="group">
                  <div className="glass-panel rounded-2xl overflow-hidden hover-glow transition-all">
                    <div className="relative h-64 overflow-hidden">
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 right-4 bg-white/90 text-blue border border-slate-200 backdrop-blur-md px-3 py-1 text-xs font-bold rounded-full">{project.status}</div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-foreground">{project.name}</h3>
                        <span className="bg-emerald/10 text-emerald border border-emerald/30 text-xs px-2 py-1 rounded">{project.type}</span>
                      </div>
                      <p className="text-muted mb-4">{project.location}</p>
                      <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                        <span className="text-xs text-muted/70">RERA: {project.rera}</span>
                        <span className="text-blue font-bold text-sm">View Details &rarr;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-slate-100 w-full h-[600px] rounded-3xl overflow-hidden shadow-sm flex items-center justify-center text-muted border border-slate-200">
              [Interactive Map View Placeholder - showing {filteredProjects.length} pins]
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
