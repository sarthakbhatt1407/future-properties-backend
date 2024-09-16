const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Define path for image uploads
const imageUploadDirectory = path.join("uploads/images");

// Create directory if it doesn't exist
if (!fs.existsSync(imageUploadDirectory)) {
  fs.mkdirSync(imageUploadDirectory, { recursive: true });
}

// Multer storage configuration for images only
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save image files in "uploads/images" directory
    cb(null, imageUploadDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4() + "-" + Date.now();
    const extension = path.extname(file.originalname).toLowerCase();

    // Save file with a prefix "image_"
    cb(null, "image_" + uniqueSuffix + extension);
  },
});

// Check for valid image file types
function checkFileType(file, cb) {
  // Allow image file types only: png, jpg, jpeg
  const filetypes = /png|jpeg|jpg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb("Error: Invalid file type! Only image files are allowed.");
  }
}

// Multer upload setup for images only
const imageUpload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = imageUpload;
