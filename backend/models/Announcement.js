const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  text: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isBold: {
    type: Boolean,
    default: false
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  bgColor: {
    type: String,
    default: '#10b981'
  }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', AnnouncementSchema);
