import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'techhansa2026') {
      localStorage.setItem('adminToken', 'techhansa2026');
      navigate('/admin');
    } else {
      alert('Invalid password');
    }
  };

  // If already authenticated, redirect
  if (localStorage.getItem('adminToken') === 'techhansa2026') {
    navigate('/admin');
    return null;
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

      <div className="flex-1 relative z-10 flex items-center justify-center p-8">
        <div className="glass-panel p-10 rounded-3xl shadow-sm border border-white/40 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Techhansa <span className="text-gold font-light">Admin</span></h1>
            <p className="text-muted">Enter your secure credentials</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Admin Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-5 pr-12 py-4 border border-white/60 bg-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue focus:bg-white transition-all backdrop-blur-sm"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button className="w-full bg-blue text-white font-bold py-4 rounded-xl hover:bg-blue-dark transition-all hover-scale shadow-sm">
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
