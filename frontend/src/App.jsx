import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layouts
import MainLayout from './components/MainLayout'
import AdminLayout from './components/AdminLayout'

// Public Pages
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ProjectsHub from './pages/ProjectsHub'
import ProjectDetail from './pages/ProjectDetail'
import Sustainability from './pages/Sustainability'
import ContactPage from './pages/ContactPage'
import { PrivacyPolicy, Disclaimer } from './pages/Legal'
import NotFound from './pages/NotFound'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProjectForm from './pages/admin/AdminProjectForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="projects" element={<ProjectsHub />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="sustainability" element={<Sustainability />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects/new" element={<AdminProjectForm />} />
          <Route path="projects/edit/:id" element={<AdminProjectForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
