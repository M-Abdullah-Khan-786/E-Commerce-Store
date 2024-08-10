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
} = require("../controllers/blogController");
const { uploadPhoto, blogImageResize } = require("../middlewares/uploadImage");
const router = express.Router();

router
  .post("/create", authMiddleware, isAdmin, createBlog)
  .put(
    "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 10),
    blogImageResize,
    uploadImages
  )
  .put("/update/:id", authMiddleware, isAdmin, updateBlog)
  .delete("/delete/:id", authMiddleware, isAdmin, deleteBlog)
  .put("/like", authMiddleware, likedBlog)
  .put("/dislike", authMiddleware, disLikedBlog)
  .get("/:id", singleBlog)
  .get("/", getAllBlogs);

module.exports = router;
