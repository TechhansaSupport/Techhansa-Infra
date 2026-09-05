const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  inquiryType: { type: String, enum: ['Project', 'Sell', 'General'], default: 'General' },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  propertyType: { type: String },
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Lost'], default: 'New' },
  sourceChannel: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
