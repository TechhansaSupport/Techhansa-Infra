import React, { useState, useEffect } from 'react';

export default function AdminPopupBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('Learn More');
  const [isActive, setIsActive] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/popup-banners`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Failed to fetch pop-up banners');
        const data = await res.json();
        setBanners(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError('Failed to load pop-up banners');
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const refreshBanners = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/popup-banners`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch pop-up banners');
      const data = await res.json();
      setBanners(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !description) return;
    
    setIsAdding(true);
    try {
      const token = localStorage.getItem('adminToken');
      let uploadedImageUrl = '';

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadRes = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/upload`, {
          method: 'POST',
          body: formData
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          uploadedImageUrl = uploadData.url;
        }
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/popup-banners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          title, 
          description,
          linkUrl,
          linkText,
          image: uploadedImageUrl,
          isActive
        })
      });
      if (!res.ok) throw new Error('Failed to create pop-up banner');
      
      // If the new one is active, we should re-fetch all to get updated active statuses
      refreshBanners();
      
      setTitle('');
      setDescription('');
      setLinkUrl('');
      setLinkText('Learn More');
      setIsActive(false);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert('Error creating pop-up banner');
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      // We need to fetch the existing banner details to update it properly
      const bannerToUpdate = banners.find(b => b._id === id);
      if(!bannerToUpdate) return;

      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/popup-banners/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...bannerToUpdate, isActive: !currentStatus })
      });
      if (!res.ok) throw new Error('Failed to update pop-up banner');
      
      // Re-fetch all to sync active statuses (since only one can be active)
      refreshBanners();
    } catch (err) {
      console.error(err);
      alert('Error updating pop-up banner');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pop-up banner?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/popup-banners/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete pop-up banner');
      setBanners(banners.filter(a => a._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting pop-up banner');
    }
  };

  if (loading) return <div className="p-8 text-center text-muted">Loading pop-up banners...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-8">
      <h1 className="text-3xl font-bold font-title text-foreground mb-8">Manage Pop-up Banners</h1>
      
      {/* Add New Form */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <h2 className="text-xl font-semibold mb-6">Create New Pop-up Banner</h2>
        <form onSubmit={handleAdd} className="space-y-6">
          
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="isActive" 
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-emerald focus:ring-emerald accent-emerald"
            />
            <label htmlFor="isActive" className="font-semibold text-foreground">Active (Will deactivate other banners)</label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-muted mb-2">Title *</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue focus:border-blue bg-white"
                placeholder="Special Offer!"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-muted mb-2">Banner Image (Optional)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setImageFile(e.target.files[0])}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue focus:border-blue bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-muted mb-2">Description *</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue focus:border-blue bg-white resize-none"
              placeholder="Get 50% off on all services..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-muted mb-2">Button Link URL (Optional)</label>
              <input 
                type="text" 
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue focus:border-blue bg-white"
                placeholder="https://example.com/offer"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted mb-2">Button Text</label>
              <input 
                type="text" 
                value={linkText}
                onChange={e => setLinkText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue focus:border-blue bg-white"
                placeholder="Learn More"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isAdding || !title || !description}
            className="bg-emerald text-white font-bold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 mt-4"
          >
            {isAdding ? 'Creating...' : 'Create Pop-up Banner'}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-semibold mb-6">Existing Banners</h2>
        {banners.length === 0 ? (
          <p className="text-muted text-center py-8">No pop-up banners found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {banners.map((banner) => (
              <div key={banner._id} className={`flex flex-col md:flex-row gap-6 p-6 rounded-xl border ${banner.isActive ? 'border-emerald/30 bg-emerald/5' : 'border-slate-200 bg-slate-50'}`}>
                {banner.image && (
                  <div className="w-full md:w-48 h-32 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                    <img src={banner.image} alt="Banner" className="w-full h-full object-cover"  loading="lazy" />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-foreground mb-2">{banner.title}</h3>
                  <p className="text-sm text-muted mb-4 line-clamp-2">{banner.description}</p>
                  
                  {banner.linkUrl && (
                    <div className="text-sm font-semibold text-blue mb-4">
                      Link: {banner.linkText} → {banner.linkUrl}
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-xs font-semibold text-muted">
                      Created: {new Date(banner.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleToggle(banner._id, banner.isActive)}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                          banner.isActive ? 'bg-emerald text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {banner.isActive ? 'Active' : 'Set Active'}
                      </button>
                      <button 
                        onClick={() => handleDelete(banner._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
