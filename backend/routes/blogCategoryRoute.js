const express = require("express");
const { createCategory, updateCategory, deleteCategory, singleCategory, getAllCategory } = require("../controllers/blogCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router
    .post("/", authMiddleware, isAdmin, createCategory)
    .put("/update/:id", authMiddleware, isAdmin, updateCategory)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteCategory)
    .get("/:id", singleCategory)
    .get("/", getAllCategory)

module.exports = router;