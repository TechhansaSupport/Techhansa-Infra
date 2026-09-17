const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const storage = multer.memoryStorage();

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|webp/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private (Admin) - for simplicity we just define the route, but in production we should protect this with adminAuth
router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  try {
    const filename = req.file.fieldname + '-' + Date.now() + '.webp';
    const outputPath = path.join(__dirname, '../uploads', filename);

    await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toFile(outputPath);

    res.status(200).json({ 
      message: 'File uploaded successfully',
      url: `/uploads/${filename}` 
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ message: 'Error processing image' });
  }
});

module.exports = router;
