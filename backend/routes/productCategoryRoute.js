const express = require("express");
const { createCategory, updateCategory, deleteCategory, singleCategory, getAllCategory } = require("../controllers/productCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router
    .post("/create", authMiddleware, isAdmin, createCategory)
    .put("/update/:id", authMiddleware, isAdmin, updateCategory)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteCategory)
    .get("/:id", singleCategory)
    .get("/", getAllCategory)

module.exports = router;
