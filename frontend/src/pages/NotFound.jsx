import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <div className="bg-slate-50 min-h-screen text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center pt-24">
        <h1 className="text-9xl font-bold text-blue drop-shadow-sm mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-6 text-foreground">Page Not Found</h2>
        <p className="text-muted mb-8 max-w-md mx-auto text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/"
          className="bg-gradient-to-r from-blue to-blue-light text-white px-8 py-4 rounded-xl font-bold hover-glow transition-all transform duration-300 hover:-translate-y-1"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
