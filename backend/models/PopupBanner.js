const mongoose = require('mongoose');

const PopupBannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL/path to the image
    default: '',
  },
  linkUrl: {
    type: String,
    default: '',
  },
  linkText: {
    type: String,
    default: 'Learn More',
  },
  isActive: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('PopupBanner', PopupBannerSchema);
