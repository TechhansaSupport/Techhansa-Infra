import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState([]);
  const [hiddenIds, setHiddenIds] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Initialize hidden IDs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dismissedAnnouncements');
      if (stored) {
        setHiddenIds(new Set(JSON.parse(stored)));
      }
    } catch (err) {
      console.error('Failed to parse dismissed announcements from localStorage', err);
    }
  }, []);

  // Fetch announcements (with polling)
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(`/api/announcement?active=true`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setAnnouncements(data);
        } else if (data && data.isActive) {
          setAnnouncements([data]);
        }
      } catch (err) {
        console.error('Failed to fetch announcements', err);
      }
    };
    
    // Fetch immediately on mount
    fetchAnnouncements();
    
    // Poll every 30 seconds for real-time updates
    const pollInterval = setInterval(fetchAnnouncements, 30000);
    return () => clearInterval(pollInterval);
  }, []);

  const visibleAnnouncements = announcements.filter(a => !hiddenIds.has(a._id));

  // Carousel logic (paused on hover)
  useEffect(() => {
    if (visibleAnnouncements.length <= 1 || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleAnnouncements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [visibleAnnouncements.length, isHovered]);

  // Handle out of bounds if an announcement is removed or dismissed
  useEffect(() => {
    if (currentIndex >= visibleAnnouncements.length) {
      setCurrentIndex(Math.max(0, visibleAnnouncements.length - 1));
    }
  }, [visibleAnnouncements.length, currentIndex]);

  const dismissAnnouncement = (id) => {
    setHiddenIds(prev => {
      const newSet = new Set(prev).add(id);
      // Persist to localStorage
      try {
        localStorage.setItem('dismissedAnnouncements', JSON.stringify(Array.from(newSet)));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return newSet;
    });
  };

  const currentAnnouncement = visibleAnnouncements[currentIndex];

  if (!currentAnnouncement) return null;

  // Sanitize the HTML content for security
  const cleanHtml = DOMPurify.sanitize(currentAnnouncement.text, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span', 'u', 's'],
    ALLOWED_ATTR: ['href', 'target', 'style', 'class']
  });

  return (
    <div 
      className="fixed bottom-8 right-8 z-[100] max-w-sm w-full pointer-events-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        key={currentAnnouncement._id} 
        className="p-5 rounded-2xl shadow-xl animate-fade-in flex gap-4 items-start pointer-events-auto transition-all duration-300"
        style={{ 
          backgroundColor: currentAnnouncement.bgColor || '#10b981', 
          color: currentAnnouncement.textColor || '#ffffff',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div className="flex-1 w-full overflow-hidden">
          <div className="flex items-center justify-between mb-2 opacity-90">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
              </svg>
              <span className="font-bold text-sm uppercase tracking-wider">
                Announcement
              </span>
            </div>
            {/* Show pause indicator if multiple announcements and hovering */}
            {visibleAnnouncements.length > 1 && isHovered && (
              <span className="text-[10px] uppercase font-bold opacity-75 tracking-widest bg-black/10 px-2 py-0.5 rounded-full">
                Paused
              </span>
            )}
          </div>
          {/* Render Sanitized Rich Text */}
          <div 
            className="text-sm m-0 leading-relaxed prose prose-sm prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        </div>
        <button 
          onClick={() => dismissAnnouncement(currentAnnouncement._id)}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
          aria-label="Close Announcement"
          style={{ color: currentAnnouncement.textColor || '#ffffff' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
