const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // The folder where images will be saved
  },
  filename: function (req, file, cb) {
    // Generate a unique filename: fieldname-timestamp.ext
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

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
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // Return the URL to access the uploaded file
  // Since we'll configure express.static to serve 'uploads' on the root domain,
  // the path will just be /uploads/filename.ext
  res.status(200).json({ 
    message: 'File uploaded successfully',
    url: `/uploads/${req.file.filename}` 
  });
});

module.exports = router;
