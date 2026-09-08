import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import Milestones from '../components/Milestones';

export default function Home() {
  return (
    <div className="text-foreground">
      <Navbar />
      <Hero />
      <FeaturedProjects />
      <Milestones />
      {/* Slide-out form logic can be embedded here or inside App.jsx globally */}
    </div>
  );
}
