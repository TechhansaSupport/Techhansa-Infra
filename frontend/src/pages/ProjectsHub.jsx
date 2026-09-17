import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getCoordinates = (city, location) => {
  const coords = {
    'Gurgaon': [28.4595, 77.0266],
    'Dubai': [25.2048, 55.2708],
    'Mumbai': [19.0760, 72.8777],
    'New York': [40.7128, -74.0060],
    'California': [36.7783, -119.4179],
    'Shyam Nagar, Lucknow': [26.8467, 80.9462], // Exact marker
    'Lucknow': [26.8467, 80.9462]
  };
  return coords[location] || coords[city] || null;
};

export default function ProjectsHub() {
  const [searchParams] = useSearchParams();

  // Helper to convert strings like "₹1.5 Cr" or "80 L" into raw numbers for filtering
  const parsePrice = (priceStr) => {
    if (!priceStr) return Infinity;
    const numMatch = priceStr.match(/[\d.]+/);
    if (!numMatch) return Infinity;
    const num = parseFloat(numMatch[0]);
    const strLower = priceStr.toLowerCase();
    
    if (strLower.includes('cr')) return num * 10000000;
    if (strLower.includes('l') || strLower.includes('lac')) return num * 100000;
    if (strLower.includes('k')) return num * 1000;
    return num;
  };

  const [view, setView] = useState('list'); // 'list' or 'map'
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'All');
  const [cityFilter, setCityFilter] = useState(searchParams.get('city') || 'All');
  const [budgetFilter, setBudgetFilter] = useState(searchParams.get('budget') || 'All');

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects`)
      .then(res => res.json())
      .then(async data => {
        if (Array.isArray(data)) {
          // Render immediately with known coordinates or null
          setProjects(data.map(p => ({ ...p, coords: getCoordinates(p.city, p.location) })));
          setLoading(false);

          // Background geocoding for unknown cities using Nominatim
          const toGeocode = data.filter(p => !getCoordinates(p.city, p.location));
          for (const p of toGeocode) {
            try {
              const query = p.location || p.city;
              const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
              const geo = await res.json();
              if (geo && geo.length > 0) {
                const newCoords = [parseFloat(geo[0].lat), parseFloat(geo[0].lon)];
                setProjects(prev => prev.map(proj => proj._id === p._id ? { ...proj, coords: newCoords } : proj));
              } else {
                // If geocoding fails to find the location, fallback to default India center
                setProjects(prev => prev.map(proj => proj._id === p._id ? { ...proj, coords: [22, 79] } : proj));
              }
            } catch(e) {
              console.error('Geocoding error for', p.city, e);
            }
            // Strict 1 request/second rate limit required by OpenStreetMap Nominatim
            await new Promise(resolve => setTimeout(resolve, 1100));
          }
        } else {
          console.error('API returned an error:', data);
          setProjects([]);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter(p => {
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (typeFilter !== 'All' && p.propertyType !== typeFilter) return false;
    if (cityFilter !== 'All' && p.city !== cityFilter) return false;
    
    if (budgetFilter !== 'All') {
      let minPrice = Infinity;
      if (p.pricing && p.pricing.length > 0) {
        minPrice = Math.min(...p.pricing.map(pr => parsePrice(pr.startingPrice)));
      }
      if (minPrice === Infinity) return false;
      
      if (budgetFilter === 'Under 1Cr' && minPrice >= 10000000) return false;
      if (budgetFilter === '1Cr-5Cr' && (minPrice < 10000000 || minPrice > 50000000)) return false;
      if (budgetFilter === '5Cr+' && minPrice <= 50000000) return false;
    }
    
    return true;
  });

  const uniqueStatuses = [...new Set(projects.map(p => p.status).filter(Boolean))];
  const uniqueCities = [...new Set(projects.map(p => p.city).filter(Boolean))];
  const uniquePropertyTypes = [...new Set(projects.map(p => p.propertyType).filter(Boolean))];

  return (
    <div className="text-foreground min-h-screen">
      <Navbar />
      
      <section className="pt-40 pb-12 border-b border-slate-200">
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
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select 
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-foreground focus:outline-none focus:border-blue"
            >
              <option value="All">All Cities</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-foreground focus:outline-none focus:border-blue"
            >
              <option value="All">All Property Types</option>
              {uniquePropertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
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
              {loading ? (
                <div className="col-span-full py-12 text-center text-muted">Loading projects...</div>
              ) : filteredProjects.length === 0 ? (
                <div className="col-span-full py-12 text-center text-muted">No projects match your search criteria.</div>
              ) : filteredProjects.map(project => (
                <Link to={`/projects/${project._id}`} key={project._id} className="group">
                  <div className="glass-panel rounded-2xl overflow-hidden hover-glow transition-all">
                    <div className="relative h-64 overflow-hidden">
                      <img src={project.coverImage || '/images/modern-property-light.jpg'} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"  loading="lazy" />
                      <div className="absolute top-4 right-4 bg-white/90 text-blue border border-slate-200 backdrop-blur-md px-3 py-1 text-xs font-bold rounded-full">{project.status}</div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-foreground">{project.name}</h3>
                        <span className="bg-emerald/10 text-emerald border border-emerald/30 text-xs px-2 py-1 rounded">{project.propertyType}</span>
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
            <div className="w-full h-[600px] rounded-3xl overflow-hidden shadow-sm border border-slate-200 z-0 relative">
              <MapContainer center={[22, 65]} zoom={4} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredProjects.map(project => (
                  <Marker key={project._id} position={project.coords || [22, 79]}>
                    <Popup>
                      <div className="font-title min-w-[200px]">
                        <img src={project.coverImage || '/images/modern-property-light.jpg'} alt={project.name} className="w-full h-32 object-cover rounded-md mb-2"  loading="lazy" />
                        <h4 className="font-bold text-lg leading-tight">{project.name}</h4>
                        <p className="text-xs text-muted mb-2">{project.location}</p>
                        <Link to={`/projects/${project._id}`} className="text-blue font-semibold text-sm hover:underline block text-center mt-2 border-t pt-2">View Project &rarr;</Link>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
