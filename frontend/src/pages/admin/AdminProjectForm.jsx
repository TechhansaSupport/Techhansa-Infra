import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AdminProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '', location: '', city: '', description: '', reraNumber: '', status: 'Future', propertyType: 'Residential', coverImage: '',
    media: { renders: [], sitePhotos: [], videos: [] },
    pricing: [], amenities: [],
    overview: { acreage: '', units: '', architecturalConcept: '' },
    sustainability: { waterSaved: 0, solarGenerated: 0, carbonReduced: 0, certifications: [] }
  });

  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value.split(',').map(item => item.trim()) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `http://localhost:5000/api/projects/${id}` : 'http://localhost:5000/api/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer techhansa2026'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert(`Project ${isEditing ? 'updated' : 'created'} successfully!`);
        navigate('/admin');
      } else {
        alert('Error saving project.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  // Pricing Helpers
  const addPricingRow = () => {
    setFormData(prev => ({ ...prev, pricing: [...prev.pricing, { unitType: '', area: '', startingPrice: '', floorPlan: '' }] }));
  };
  const updatePricingRow = (index, field, value) => {
    const newPricing = [...formData.pricing];
    newPricing[index][field] = value;
    setFormData(prev => ({ ...prev, pricing: newPricing }));
  };
  const removePricingRow = (index) => {
    const newPricing = [...formData.pricing];
    newPricing.splice(index, 1);
    setFormData(prev => ({ ...prev, pricing: newPricing }));
  };

  if (loading) return <div className="p-8">Loading form...</div>;

  return (
    <div className="container mx-auto max-w-4xl glass-panel p-10 rounded-3xl shadow-sm border border-white/40 relative z-10">
      <h2 className="text-4xl font-bold mb-8 text-foreground">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Details */}
        <section className="bg-white/40 p-6 rounded-2xl border border-white/60">
          <h3 className="text-2xl font-bold mb-6 border-b border-slate-200 pb-3 text-blue">Basic Details</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Project Name</label>
              <input required name="name" value={formData.name} onChange={handleChange} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Location</label>
              <input required name="location" value={formData.location} onChange={handleChange} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">City</label>
              <input required name="city" value={formData.city} onChange={handleChange} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none">
                <option>Future</option><option>New Launch</option><option>Ongoing</option><option>Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Property Type</label>
              <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none">
                <option>Residential</option><option>Commercial</option><option>Plots</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">RERA Number</label>
              <input name="reraNumber" value={formData.reraNumber} onChange={handleChange} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-2 text-foreground">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none h-32 resize-none" />
            </div>
          </div>
        </section>

        {/* Media & Images */}
        <section className="bg-white/40 p-6 rounded-2xl border border-white/60">
          <h3 className="text-2xl font-bold mb-6 border-b border-slate-200 pb-3 text-blue">Media & Images</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Cover Image URL</label>
              <input name="coverImage" value={formData.coverImage} onChange={handleChange} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" placeholder="https://example.com/image.jpg" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Renders (comma separated URLs)</label>
              <input value={formData.media.renders.join(', ')} onChange={(e) => handleArrayChange('media.renders', e.target.value)} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" />
            </div>
          </div>
        </section>

        {/* Pricing Rows */}
        <section className="bg-white/40 p-6 rounded-2xl border border-white/60">
          <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
            <h3 className="text-2xl font-bold text-blue">Configuration & Pricing</h3>
            <button type="button" onClick={addPricingRow} className="text-sm bg-blue text-white px-4 py-2 rounded-full font-bold hover:bg-blue-dark transition-colors">+ Add Row</button>
          </div>
          <div className="space-y-3">
            {formData.pricing.map((row, i) => (
              <div key={i} className="flex gap-3 items-center bg-white/60 p-4 rounded-xl border border-slate-200 shadow-sm">
                <input placeholder="Unit Type (e.g. 3BHK)" value={row.unitType} onChange={(e) => updatePricingRow(i, 'unitType', e.target.value)} className="flex-1 border-b border-slate-200 bg-transparent p-2 outline-none focus:border-blue" />
                <input placeholder="Area (e.g. 1500 sqft)" value={row.area} onChange={(e) => updatePricingRow(i, 'area', e.target.value)} className="flex-1 border-b border-slate-200 bg-transparent p-2 outline-none focus:border-blue" />
                <input placeholder="Price (e.g. ₹1.5 Cr)" value={row.startingPrice} onChange={(e) => updatePricingRow(i, 'startingPrice', e.target.value)} className="flex-1 border-b border-slate-200 bg-transparent p-2 outline-none focus:border-blue" />
                <button type="button" onClick={() => removePricingRow(i)} className="text-red-500 font-bold px-3 hover:text-red-700 transition-colors">X</button>
              </div>
            ))}
            {formData.pricing.length === 0 && <p className="text-sm text-muted italic">No pricing rows added.</p>}
          </div>
        </section>

        {/* Amenities */}
        <section className="bg-white/40 p-6 rounded-2xl border border-white/60">
          <h3 className="text-2xl font-bold mb-6 border-b border-slate-200 pb-3 text-blue">Amenities</h3>
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Amenities (comma separated)</label>
            <input value={formData.amenities.join(', ')} onChange={(e) => handleArrayChange('amenities', e.target.value)} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" placeholder="Pool, Gym, Clubhouse" />
          </div>
        </section>

        <div className="flex justify-end gap-4 pt-6">
          <button type="button" onClick={() => navigate('/admin')} className="px-8 py-3 bg-slate-200 text-slate-800 rounded-full font-bold hover:bg-slate-300 transition-all">Cancel</button>
          <button type="submit" className="px-8 py-3 bg-emerald text-white rounded-full font-bold hover:bg-emerald-600 transition-all shadow-md hover-scale">Save Project</button>
        </div>
      </form>
    </div>
  );
}
