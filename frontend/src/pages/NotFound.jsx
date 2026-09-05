import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center pt-24">
        <h1 className="text-9xl font-bold text-[#d09c3a] mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/"
          className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
