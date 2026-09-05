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
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
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
