import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function AdminAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state for creating a new announcement
  const [newText, setNewText] = useState('');
  const [newIsActive, setNewIsActive] = useState(true);
  const [newBgColor, setNewBgColor] = useState('#10b981');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`/api/announcement`);
      if (!res.ok) throw new Error('Failed to fetch announcements');
      const data = await res.json();
      setAnnouncements(Array.isArray(data) ? data : [data].filter(Boolean));
    } catch (err) {
      console.error(err);
      setError('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newText || newText.trim() === '<p><br></p>') return; // basic empty check for quill
    
    setIsAdding(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/announcement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          text: newText, 
          isActive: newIsActive,
          bgColor: newBgColor
        })
      });
      if (!res.ok) throw new Error('Failed to create announcement');
      const data = await res.json();
      setAnnouncements([data, ...announcements]);
      setNewText('');
      setNewIsActive(true);
      setNewBgColor('#10b981');
    } catch (err) {
      console.error(err);
      alert('Error creating announcement');
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/announcement/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (!res.ok) throw new Error('Failed to update announcement');
      const data = await res.json();
      setAnnouncements(announcements.map(a => a._id === id ? data : a));
    } catch (err) {
      console.error(err);
      alert('Error updating announcement');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/announcement/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete announcement');
      setAnnouncements(announcements.filter(a => a._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting announcement');
    }
  };

  // Quill editor toolbar configuration
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean']
    ]
  };

  if (loading) return <div className="p-8 text-center text-muted">Loading announcements...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-8">
      <h1 className="text-3xl font-bold font-title text-foreground mb-8">Manage Announcements</h1>
      
      {/* Add New Announcement Form */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <h2 className="text-xl font-semibold mb-6">Add New Announcement</h2>
        <form onSubmit={handleAdd}>
          
          <div className="mb-6 flex items-center gap-3">
            <input 
              type="checkbox" 
              id="newIsActive" 
              checked={newIsActive}
              onChange={(e) => setNewIsActive(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-emerald focus:ring-emerald accent-emerald"
            />
            <label htmlFor="newIsActive" className="font-semibold text-foreground">Active (Visible on Website)</label>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-muted mb-2">Announcement Content</label>
            <style>{`
              .quill-wrapper .ql-toolbar {
                border-top-left-radius: 0.75rem;
                border-top-right-radius: 0.75rem;
                border-color: #e2e8f0;
                background-color: #f8fafc;
              }
              .quill-wrapper .ql-container {
                border-bottom-left-radius: 0.75rem;
                border-bottom-right-radius: 0.75rem;
                border-color: #e2e8f0;
                min-height: 150px;
                font-family: inherit;
                font-size: 1rem;
              }
              .quill-wrapper .ql-editor {
                min-height: 150px;
              }
            `}</style>
            <div className="quill-wrapper mb-4 bg-white text-black">
              <ReactQuill 
                theme="snow"
                value={newText} 
                onChange={setNewText} 
                modules={modules}
                placeholder="Compose your announcement here..."
              />
            </div>
          </div>

          <div className="flex gap-8 mb-8">
            <div className="flex items-center gap-3">
              <label htmlFor="newBgColor" className="font-semibold text-foreground">Banner Background Color</label>
              <input 
                type="color" 
                id="newBgColor" 
                value={newBgColor}
                onChange={(e) => setNewBgColor(e.target.value)}
                className="w-10 h-10 rounded border-0 cursor-pointer"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isAdding || !newText || newText === '<p><br></p>'}
            className="bg-emerald text-white font-bold py-3 px-4 md:px-8 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isAdding ? 'Adding...' : 'Add Announcement'}
          </button>
        </form>
      </div>

      {/* List of Existing Announcements */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-semibold mb-6">Existing Announcements</h2>
        {announcements.length === 0 ? (
          <p className="text-muted text-center py-6 md:py-8">No announcements found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {announcements.map((announcement) => (
              <div key={announcement._id} className={`p-5 rounded-xl border ${announcement.isActive ? 'border-emerald/30 bg-emerald/5' : 'border-slate-200 bg-slate-50'}`}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 w-full overflow-hidden">
                    <div 
                      className={`mb-2 p-4 rounded-xl border border-slate-200 max-h-40 overflow-y-auto ${!announcement.isActive ? 'opacity-70' : ''}`}
                      style={{ 
                        backgroundColor: announcement.bgColor || '#10b981',
                        color: announcement.textColor || '#ffffff' // Legacy fallback
                      }}
                      dangerouslySetInnerHTML={{ __html: announcement.text || '(Empty text)' }}
                    />
                    <div className="text-xs font-semibold text-muted flex gap-4">
                      <span>Created: {new Date(announcement.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 pt-2">
                    <button 
                      onClick={() => handleToggle(announcement._id, announcement.isActive)}
                      className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                        announcement.isActive ? 'bg-emerald text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {announcement.isActive ? 'Active' : 'Inactive'}
                    </button>
                    <button 
                      onClick={() => handleDelete(announcement._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
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
