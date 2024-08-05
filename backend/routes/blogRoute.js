const express = require("express")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createBlog, updateBlog, deleteBlog, singleBlog, getAllBlogs } = require("../controllers/blogController")
const router = express.Router()

router
    .post("/create",authMiddleware, isAdmin, createBlog)
    .put("/update/:id",authMiddleware, isAdmin, updateBlog)
    .delete("/delete/:id",authMiddleware, isAdmin, deleteBlog)
    .get("/:id", singleBlog)
    .get("/", getAllBlogs)


module.exports = router