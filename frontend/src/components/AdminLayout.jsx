import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function AdminLayout() {
  const isAuthenticated = localStorage.getItem('adminToken') === 'techhansa2026';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-white text-foreground">
      {/* Global Background Graphics (Same as Website) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(51, 65, 85, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(51, 65, 85, 0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-light/15 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gold/15 rounded-full blur-[120px] -translate-x-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-emerald/15 rounded-full blur-[100px]"></div>
      </div>

      {/* Admin Navbar (Glassmorphism) */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/20 py-4 px-8 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Techhansa <span className="text-gold font-light">Admin</span></h1>
        <button 
          onClick={() => {
            localStorage.removeItem('adminToken');
            window.location.reload();
          }} 
          className="text-sm font-semibold text-muted hover:text-blue transition-colors px-4 py-2 border border-slate-200 rounded-full hover:bg-slate-50"
        >
          Logout
        </button>
      </header>

      <div className="flex-1 relative z-10 p-8">
        <Outlet />
      </div>
    </div>
  );
}
