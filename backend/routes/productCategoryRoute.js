const express = require("express");
const { createCateory, updateCateory, deleteCateory, singleCateory, getAllCateory } = require("../controllers/productCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router
    .post("/", authMiddleware, isAdmin, createCateory)
    .put("/update/:id", authMiddleware, isAdmin, updateCateory)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteCateory)
    .get("/:id", singleCateory)
    .get("/", getAllCateory)

module.exports = router;
