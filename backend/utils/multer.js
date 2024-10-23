// multerMiddleware.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", 
    format: async (req, file) => "jpg", 
    public_id: (req, file) => file.originalname, 
  },
});


const blogStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogs",
    format: async (req, file) => "jpg",
    public_id: (req, file) => file.originalname,
  },
});

const uploadProductImages = multer({ storage: productStorage });
const uploadBlogImages = multer({ storage: blogStorage });


module.exports = {
  uploadProductImages,
  uploadBlogImages,
};
