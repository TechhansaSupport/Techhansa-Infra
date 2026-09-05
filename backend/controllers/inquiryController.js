const Inquiry = require('../models/Inquiry');

// Create a new inquiry (lead)
exports.createInquiry = async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    const savedInquiry = await inquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all inquiries (admin)
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
