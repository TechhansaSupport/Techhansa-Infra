import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBanner from './AnnouncementBanner';
import PopupModal from './PopupModal';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen relative bg-white">
      <AnnouncementBanner />
      <PopupModal />
      {/* Global Background Graphics */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Blueprint Grid Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(51, 65, 85, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(51, 65, 85, 0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        {/* Soft Floating Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-light/15 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gold/15 rounded-full blur-[120px] -translate-x-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-emerald/15 rounded-full blur-[100px]"></div>
      </div>

      <div className="flex-1 relative z-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
