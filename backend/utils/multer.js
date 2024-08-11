const multer = require('multer');
const sharp = require('sharp');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

//Cloudinary storage for Products
const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    format: async (req, file) => 'jpeg',
    public_id: (req, file) => `${Date.now()}_${file.originalname.split('.')[0]}`,
  },
});

//Cloudinary storage for Blogs
const blogStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blogs',
    format: async (req, file) => 'jpeg',
    public_id: (req, file) => `${Date.now()}_${file.originalname.split('.')[0]}`,
  },
});

// Setup multer for Product Images
const uploadProductImages = multer({
  storage: productStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload only images.'));
    }
  },
});

// Setup multer for Blog Images
const uploadBlogImages = multer({
  storage: blogStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload only images.'));
    }
  },
});

module.exports = { uploadProductImages, uploadBlogImages };
