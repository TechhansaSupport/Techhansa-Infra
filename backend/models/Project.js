const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  unitType: String,
  area: String,
  startingPrice: String,
  floorPlan: String // URL to image
});

const constructionUpdateSchema = new mongoose.Schema({
  monthYear: String,
  description: String,
  image: String // URL
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String },
  reraNumber: { type: String },
  status: { 
    type: String, 
    enum: ['Completed', 'Ongoing', 'Future', 'New Launch'],
    default: 'Future'
  },
  isFeatured: { type: Boolean, default: false },
  propertyType: {
    type: String,
    enum: ['Residential', 'Commercial', 'Plots'],
    default: 'Residential'
  },
  coverImage: { type: String }, // URL
  media: {
    renders: [String],
    sitePhotos: [String],
    videos: [String]
  },
  overview: {
    acreage: String,
    units: String,
    architecturalConcept: String
  },
  pricing: [pricingSchema],
  amenities: [String],
  constructionUpdates: [constructionUpdateSchema],
  sustainability: {
    waterSaved: Number,
    solarGenerated: Number,
    carbonReduced: Number,
    certifications: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
