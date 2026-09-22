import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'

// Layouts
import MainLayout from './components/MainLayout'
import AdminLayout from './components/AdminLayout'
import ScrollToTop from './components/ScrollToTop'

// Public Pages
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ProjectsHub from './pages/ProjectsHub'
import ProjectDetail from './pages/ProjectDetail'
import Sustainability from './pages/Sustainability'
import ContactPage from './pages/ContactPage'
import { PrivacyPolicy, Disclaimer } from './pages/Legal'
import Investors from './pages/Investors'
import MediaCenter from './pages/MediaCenter'
import NotFound from './pages/NotFound'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminSignup from './pages/admin/AdminSignup'
import AdminForgotPassword from './pages/admin/AdminForgotPassword'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProjectForm from './pages/admin/AdminProjectForm'
import AdminAnnouncement from './pages/admin/AdminAnnouncement'
import AdminPopupBanner from './pages/admin/AdminPopupBanner'

import { ProjectProvider } from './contexts/ProjectContext'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.lenis = null;
      lenis.destroy();
    };
  }, []);

  return (
    <ProjectProvider>
      <BrowserRouter>
        <ScrollToTop />
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-white overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-60 animate-slow-spin" 
             style={{
               background: 'radial-gradient(circle at 40% 40%, rgba(14, 165, 233, 0.08), transparent 60%), radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.05), transparent 50%), radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.05), transparent 50%)'
             }}>
        </div>
      </div>
      
      <Routes>
        {/* Public Website Routes */}
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="projects" element={<ProjectsHub />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="sustainability" element={<Sustainability />} />
          <Route path="investors" element={<Investors />} />
          <Route path="media" element={<MediaCenter />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/reset-password" element={<AdminForgotPassword />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects/new" element={<AdminProjectForm />} />
          <Route path="projects/edit/:id" element={<AdminProjectForm />} />
          <Route path="announcement" element={<AdminAnnouncement />} />
          <Route path="popup" element={<AdminPopupBanner />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ProjectProvider>
  )
}

export default App
