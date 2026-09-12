import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AdminProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '', location: '', city: '', description: '', reraNumber: '', status: 'Future', propertyType: 'Residential', coverImage: '', isFeatured: false,
    gallery: [],
    pricing: [], amenities: [], constructionUpdates: [],
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
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: finalValue } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: finalValue }));
    }
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        // Do not set Content-Type header; browser will automatically set multipart/form-data with the boundary
        body: uploadData
      });
      const data = await res.json();
      if (res.ok) {
        // Update the form data with the new URL
        handleChange({ target: { name: fieldName, value: data.url } });
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed due to network error');
    }
  };

  const handleMultipleFileUpload = async (e, fieldPath) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    const newUrls = [];
    for (const file of files) {
      const uploadData = new FormData();
      uploadData.append('image', file);
      try {
        const res = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: uploadData
        });
        const data = await res.json();
        if (res.ok) {
          newUrls.push(data.url);
        }
      } catch (err) {
        console.error('Failed to upload', file.name, err);
      }
    }

    if (newUrls.length > 0) {
      if (fieldPath.includes('.')) {
        const [parent, child] = fieldPath.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: [...(prev[parent][child] || []), ...newUrls]
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [fieldPath]: [...(prev[fieldPath] || []), ...newUrls]
        }));
      }
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
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
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

  // Construction Helpers
  const addConstructionRow = () => {
    setFormData(prev => ({ ...prev, constructionUpdates: [...(prev.constructionUpdates || []), { monthYear: '', description: '', image: '' }] }));
  };
  const updateConstructionRow = (index, field, value) => {
    const newUpdates = [...(formData.constructionUpdates || [])];
    newUpdates[index][field] = value;
    setFormData(prev => ({ ...prev, constructionUpdates: newUpdates }));
  };
  const removeConstructionRow = (index) => {
    const newUpdates = [...(formData.constructionUpdates || [])];
    newUpdates.splice(index, 1);
    setFormData(prev => ({ ...prev, constructionUpdates: newUpdates }));
  };

  if (loading) return <div className="p-8">Loading form...</div>;

  return (
    <div className="container mx-auto max-w-4xl glass-panel p-10 rounded-3xl shadow-sm border border-white/40 relative z-10">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin')} type="button" className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors flex items-center justify-center" title="Go Back">
          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-4xl font-bold text-foreground m-0">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
      </div>
      
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
            <div className="col-span-2 flex items-center gap-3 bg-white/60 p-4 rounded-xl border border-slate-200">
              <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 accent-blue cursor-pointer" />
              <label htmlFor="isFeatured" className="text-sm font-semibold text-foreground cursor-pointer select-none">
                Show as Featured on Homepage (Signature Developments)
              </label>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="bg-white/40 p-6 rounded-2xl border border-white/60">
          <h3 className="text-2xl font-bold mb-6 border-b border-slate-200 pb-3 text-blue">Project Overview</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Total Acreage</label>
              <input name="overview.acreage" value={formData.overview?.acreage || ''} onChange={handleChange} placeholder="e.g. 5 Acres" className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Total Units</label>
              <input name="overview.units" value={formData.overview?.units || ''} onChange={handleChange} placeholder="e.g. 250" className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Architectural Concept</label>
              <input name="overview.architecturalConcept" value={formData.overview?.architecturalConcept || ''} onChange={handleChange} placeholder="e.g. Modern Commercial" className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" />
            </div>
          </div>
        </section>

        {/* Media & Images */}
        <section className="bg-white/40 p-6 rounded-2xl border border-white/60">
          <h3 className="text-2xl font-bold mb-6 border-b border-slate-200 pb-3 text-blue">Media & Images</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Cover Image</label>
              <div className="flex gap-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleFileUpload(e, 'coverImage')} 
                  className="w-1/3 border border-slate-200 bg-white/60 p-2 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue hover:file:bg-blue-100 cursor-pointer" 
                />
                <input 
                  name="coverImage" 
                  value={formData.coverImage} 
                  onChange={handleChange} 
                  className="w-2/3 border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" 
                  placeholder="Or enter image URL manually..." 
                />
              </div>
              {formData.coverImage && (
                <div className="mt-4">
                  <img src={formData.coverImage} alt="Cover Preview" className="h-32 object-cover rounded-xl shadow-sm border border-slate-200" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Media Gallery (Images)</label>
              <div className="flex gap-4">
                <input 
                  type="file" 
                  multiple
                  accept="image/*" 
                  onChange={(e) => handleMultipleFileUpload(e, 'gallery')} 
                  className="w-1/3 border border-slate-200 bg-white/60 p-2 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue hover:file:bg-blue-100 cursor-pointer" 
                />
                <input 
                  value={(formData.gallery || []).join(', ')} 
                  onChange={(e) => handleArrayChange('gallery', e.target.value)} 
                  className="w-2/3 border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" 
                  placeholder="Or enter comma separated URLs..." 
                />
              </div>
              
              {/* Media Preview Grid */}
              {(formData.gallery || []).length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {(formData.gallery || []).map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img src={url} alt={`Gallery Image ${idx+1}`} className="h-24 w-full object-cover rounded-xl shadow-sm border border-slate-200" />
                      <button 
                        type="button" 
                        onClick={() => {
                          const newRenders = formData.gallery.filter((_, i) => i !== idx);
                          setFormData(prev => ({ ...prev, gallery: newRenders }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold shadow-md"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
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

        {/* Construction Updates */}
        <section className="bg-white/40 p-6 rounded-2xl border border-white/60">
          <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
            <h3 className="text-2xl font-bold text-blue">Construction Updates</h3>
            <button type="button" onClick={addConstructionRow} className="text-sm bg-blue text-white px-4 py-2 rounded-full font-bold hover:bg-blue-dark transition-colors">+ Add Update</button>
          </div>
          <div className="space-y-3">
            {(formData.constructionUpdates || []).map((row, i) => (
              <div key={i} className="flex gap-3 items-center bg-white/60 p-4 rounded-xl border border-slate-200 shadow-sm">
                <input placeholder="Date (e.g. Oct 2026)" value={row.monthYear} onChange={(e) => updateConstructionRow(i, 'monthYear', e.target.value)} className="w-1/4 border-b border-slate-200 bg-transparent p-2 outline-none focus:border-blue" />
                <input placeholder="Description" value={row.description} onChange={(e) => updateConstructionRow(i, 'description', e.target.value)} className="flex-1 border-b border-slate-200 bg-transparent p-2 outline-none focus:border-blue" />
                <button type="button" onClick={() => removeConstructionRow(i)} className="text-red-500 font-bold px-3 hover:text-red-700 transition-colors">X</button>
              </div>
            ))}
            {(formData.constructionUpdates || []).length === 0 && <p className="text-sm text-muted italic">No construction updates added.</p>}
          </div>
        </section>

        {/* Sustainability */}
        <section className="bg-white/40 p-6 rounded-2xl border border-white/60">
          <h3 className="text-2xl font-bold mb-6 border-b border-slate-200 pb-3 text-blue">Sustainability Impacts</h3>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Water Saved (Liters)</label>
              <input type="number" name="sustainability.waterSaved" value={formData.sustainability?.waterSaved || 0} onChange={handleChange} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Solar Generated (kW)</label>
              <input type="number" name="sustainability.solarGenerated" value={formData.sustainability?.solarGenerated || 0} onChange={handleChange} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Carbon Reduced (Tons)</label>
              <input type="number" name="sustainability.carbonReduced" value={formData.sustainability?.carbonReduced || 0} onChange={handleChange} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Certifications (comma separated)</label>
            <input value={formData.sustainability?.certifications?.join(', ') || ''} onChange={(e) => handleArrayChange('sustainability.certifications', e.target.value)} className="w-full border border-slate-200 bg-white/60 p-3 rounded-xl focus:ring-2 focus:ring-blue focus:bg-white transition-all outline-none" placeholder="LEED Gold, IGBC Green" />
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
