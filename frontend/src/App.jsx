import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Contact from './components/Contact'
import Footer from './components/Footer'

import AboutUs from './pages/AboutUs'
import ProjectsHub from './pages/ProjectsHub'
import Sustainability from './pages/Sustainability'
import ContactPage from './pages/ContactPage'
import Admin from './pages/Admin'
import { PrivacyPolicy, Disclaimer } from './pages/Legal'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'

import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen relative bg-white">
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/projects" element={<ProjectsHub />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
