const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const getFormat = (mimetype) => {
  if (mimetype === "image/jpeg") {
    return "jpg";
  } else if (mimetype === "image/png") {
    return "png";
  } else if (mimetype === "image/gif") {
    return "gif";
  }
  return "jpg";
};

const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    format: async (req, file) => getFormat(file.mimetype),
    public_id: (req, file) => file.originalname,
  },
});

const blogStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogs",
    format: async (req, file) => getFormat(file.mimetype),
    public_id: (req, file) => file.originalname,
  },
});

const uploadProductImages = multer({ storage: productStorage });
const uploadBlogImages = multer({ storage: blogStorage });

module.exports = {
  uploadProductImages,
  uploadBlogImages,
};
