const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  singleBlog,
  getAllBlogs,
  likedBlog,
  disLikedBlog,
  uploadImages,
  deleteImage,
} = require("../controllers/blogController");
const { uploadBlogImages } = require("../utils/multer");

const router = express.Router();

router
  .post("/create", authMiddleware, isAdmin, createBlog)
  .put("/upload-image/:id",authMiddleware,isAdmin,uploadBlogImages.array("images", 10),uploadImages)
  .delete("/delete-image/:id", authMiddleware, isAdmin, deleteImage)
  .put("/update/:id", authMiddleware, isAdmin, updateBlog)
  .delete("/delete/:id", authMiddleware, isAdmin, deleteBlog)
  .put("/like", authMiddleware, likedBlog)
  .put("/dislike", authMiddleware, disLikedBlog)
  .get("/:id", singleBlog)
  .get("/", getAllBlogs);

module.exports = router;
