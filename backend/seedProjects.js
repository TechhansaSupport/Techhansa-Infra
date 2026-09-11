const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/techhansa-infra';

const sampleProjects = [
  {
    name: 'Techhansa Cyber Park',
    location: 'Sector 62, Gurgaon, HR',
    city: 'Gurgaon',
    description: 'A state-of-the-art commercial tech park featuring sustainable architecture and smart building management systems.',
    reraNumber: 'HRERA-GGM-1234-2023',
    status: 'Completed',
    propertyType: 'Commercial',
    coverImage: '/images/hero-bg-light.jpg',
    overview: {
      acreage: '15 Acres',
      units: '4 Towers',
      architecturalConcept: 'Modern Glass Facade with Green Terraces'
    },
    amenities: ['24/7 Power Backup', 'Smart Parking', 'Food Court', 'Gymnasium', 'EV Charging'],
  },
  {
    name: 'The Camellias Luxury Residences',
    location: 'Koregaon Park, Pune, MH',
    city: 'Pune',
    description: 'Ultra-luxury riverside residences offering panoramic views with private garden access.',
    reraNumber: 'MAHARERA-PUN-5678-2024',
    status: 'Ongoing',
    propertyType: 'Residential',
    coverImage: '/images/modern-property-light.jpg',
    overview: {
      acreage: '20 Acres',
      units: '150 Villas',
      architecturalConcept: 'Contemporary Indian'
    },
    amenities: ['Riverside Walkway', 'Infinity Pool', 'Spa & Wellness Center', 'Concierge Service'],
  },
  {
    name: 'Auris Sky Villas',
    location: 'Worli Sea Face, Mumbai, MH',
    city: 'Mumbai',
    description: 'High-rise luxury apartments with clear sea views, double-height ceilings, and private plunge pools.',
    reraNumber: 'MAHARERA-MUM-9012-2025',
    status: 'New Launch',
    propertyType: 'Residential',
    coverImage: '/images/hero-bg-light.jpg',
    overview: {
      acreage: '5 Acres',
      units: '80 Sky Villas',
      architecturalConcept: 'Vertical Forest'
    },
    amenities: ['Sky Lounge', 'Helipad', 'Private Plunge Pools', 'Automated Smart Homes'],
  },
  {
    name: 'Silicon Valley Innovation Hub',
    location: 'HITEC City, Hyderabad, TS',
    city: 'Hyderabad',
    description: 'A modern campus designed for tech incubators and startups, featuring collaborative workspaces and high-speed infrastructure.',
    reraNumber: 'TS-RERA-3456-2026',
    status: 'Future',
    propertyType: 'Commercial',
    coverImage: '/images/modern-property-light.jpg',
    overview: {
      acreage: '10 Acres',
      units: '2 Main Blocks',
      architecturalConcept: 'Open Plan Collaborative Campus'
    },
    amenities: ['Incubator Labs', 'Auditorium', 'Cafeterias', 'Recreation Zones'],
  },
  {
    name: 'Sapphire Estates',
    location: 'Whitefield, Bangalore, KA',
    city: 'Bangalore',
    description: 'Premium plotted development surrounded by lush greenery, offering the perfect canvas to build your dream home.',
    reraNumber: 'PRM/KA/RERA/1251/446/PR/0987/2023',
    status: 'Completed',
    propertyType: 'Plots',
    coverImage: '/images/hero-bg-light.jpg',
    overview: {
      acreage: '50 Acres',
      units: '300 Plots',
      architecturalConcept: 'Eco-friendly Master Plan'
    },
    amenities: ['Clubhouse', 'Jogging Track', 'Kids Play Area', 'Underground Cabling'],
  }
];

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing projects to reset completely to just these 5
    await Project.deleteMany({});
    
    await Project.insertMany(sampleProjects);
    console.log(`Successfully inserted ${sampleProjects.length} sample projects.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  });
