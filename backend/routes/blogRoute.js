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
} = require("../controllers/blogController");
const { uploadBlogImages } = require("../utils/multer");

const router = express.Router();

router
  .post(
    "/create",
    authMiddleware,
    isAdmin,
    uploadBlogImages.array("images", 10),
    createBlog
  )
  .put(
    "/update/:id",
    authMiddleware,
    isAdmin,
    isAdmin,
    uploadBlogImages.array("images", 10),
    updateBlog
  )
  .delete("/delete/:id", authMiddleware, isAdmin, deleteBlog)
  .put("/like", authMiddleware, likedBlog)
  .put("/dislike", authMiddleware, disLikedBlog)
  .get("/:id", singleBlog)
  .get("/", getAllBlogs);

module.exports = router;
