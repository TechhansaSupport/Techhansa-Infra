import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function PopupModal() {
  const [banner, setBanner] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch('/api/popup-banners/active');
        if (res.ok) {
          const data = await res.json();
          if (data && data.isActive) {
            
            // Check if user has already closed this specific banner recently
            const closedBannerId = sessionStorage.getItem('closedBannerId');
            if (closedBannerId !== data._id) {
              setBanner(data);
              setIsOpen(true);
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch pop-up banner', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (banner) {
      sessionStorage.setItem('closedBannerId', banner._id);
    }
  };

  if (loading || !isOpen || !banner) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        {banner.image ? (
          banner.linkUrl ? (
            <a href={banner.linkUrl} target="_blank" rel="noopener noreferrer" className="block w-full" onClick={handleClose}>
              <img src={banner.image} alt={banner.title} className="w-full h-auto object-contain max-h-[80vh]" />
            </a>
          ) : (
            <img src={banner.image} alt={banner.title} className="w-full h-auto object-contain max-h-[80vh]" />
          )
        ) : (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold font-title text-foreground">{banner.title}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
