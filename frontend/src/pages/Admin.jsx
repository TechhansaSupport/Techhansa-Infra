import React, { useState } from 'react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'techhansa2026') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black"
            />
            <button className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Techhansa Admin Panel</h1>
        <button onClick={() => setIsAuthenticated(false)} className="text-sm font-medium hover:text-gray-300">Logout</button>
      </div>
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">Projects Management</h2>
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center">
          <p className="text-gray-500 mb-4">Project data table and editor will be implemented here.</p>
          <button className="bg-[#d09c3a] text-white px-6 py-2 rounded-lg font-bold">
            + Add New Project
          </button>
        </div>
      </div>
    </div>
  );
}
