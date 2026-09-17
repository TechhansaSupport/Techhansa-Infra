import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => navigate('/admin/login'), 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Signup Error:', err);
      setError('Unable to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white text-foreground flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* Global Background Graphics (Same as Website) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(51, 65, 85, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(51, 65, 85, 0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-light/15 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gold/15 rounded-full blur-[120px] -translate-x-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-emerald/15 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-[1100px] h-full max-h-[650px] bg-white/90 backdrop-blur-md rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200/50 flex flex-col lg:flex-row overflow-hidden relative z-10">
        
        {/* Left Side */}
        <div className="w-full lg:w-[45%] flex flex-col px-4 md:px-8 py-6 md:px-12 md:py-6 justify-center">
          
          {/* Logo */}
          <div className="flex items-center gap-4 mb-6">
            <img src="/logo.png" alt="Techhansa Infra Logo" className="w-20 h-20 rounded-full object-contain shadow-sm border border-slate-100"  loading="lazy" />
            <span className="font-title font-bold text-[34px] text-[#D4AF37] tracking-tight drop-shadow-sm -translate-y-1.5">Techhansa Infra</span>
          </div>

          <div className="mb-6">
            <h1 className="font-title text-[32px] md:text-[36px] font-bold text-gray-900 mb-1 leading-tight tracking-tight">Create Account</h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-emerald/10 text-emerald-600 text-sm rounded-lg border border-emerald/20 font-medium">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-3">
            
            <div className="bg-[#f5f6f8] rounded-xl px-4 py-2.5 border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-colors">
              <label className="block text-[11px] font-bold text-gray-400 mb-0.5">Full Name</label>
              <input 
                name="name"
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Admin Name" 
                required
                className="w-full bg-transparent border-none p-0 text-sm font-bold text-gray-900 focus:ring-0 placeholder:text-gray-400 placeholder:font-medium"
              />
            </div>

            <div className="bg-[#f5f6f8] rounded-xl px-4 py-2.5 border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-colors">
              <label className="block text-[11px] font-bold text-gray-400 mb-0.5">Email</label>
              <input 
                name="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@techhansa.com" 
                required
                className="w-full bg-transparent border-none p-0 text-sm font-bold text-gray-900 focus:ring-0 placeholder:text-gray-400 placeholder:font-medium"
              />
            </div>

            <div className="bg-[#f5f6f8] rounded-xl px-4 py-2.5 border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-colors relative">
              <label className="block text-[11px] font-bold text-gray-400 mb-0.5">Password</label>
              <input 
                name="password"
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••" 
                required
                className="w-full bg-transparent border-none p-0 text-lg font-bold text-gray-900 focus:ring-0 pr-10 translate-y-1 placeholder:text-gray-400 placeholder:font-medium"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#0ea5e9] text-white rounded-xl py-3.5 text-sm font-bold hover:bg-[#0284c7] transition-colors shadow-md mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

          </form>

          <p className="text-center text-[13px] font-bold text-gray-900 mt-5">
            Already have an account? <Link to="/admin/login" className="text-gray-500 hover:text-gray-900 transition-colors ml-1">Login</Link>
          </p>

        </div>

        {/* Right Side - Image with custom cutouts */}
        <div className="hidden lg:block w-[55%] p-4 relative bg-white">
           <div className="w-full h-full relative rounded-[2.5rem] overflow-hidden bg-gray-100">
             
             {/* The Image */}
             <img 
               src="/images/surreal_city_door.jpg" 
               alt="Surreal City Door Miniature Art" 
               className="w-full h-full object-cover"
              loading="lazy" />

             {/* Dark gradient overlay to make text readable (optional, can be removed too if no text) */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>

             {/* Custom Cutout 1: Top Left */}
             <div className="absolute top-0 left-0 w-32 h-24 bg-white rounded-br-[2.5rem] z-10"></div>
             
             {/* Custom Cutout 2: Bottom Right */}
             <div className="absolute bottom-0 right-0 w-32 h-24 bg-white rounded-tl-[2.5rem] z-10"></div>

           </div>
        </div>

      </div>
    </div>
  );
}
