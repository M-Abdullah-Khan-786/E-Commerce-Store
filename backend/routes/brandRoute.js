const express = require("express");
const { createBrand, updateBrand, deleteBrand, singleBrand, getAllBrand } = require("../controllers/brandController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router
    .post("/", authMiddleware, isAdmin, createBrand)
    .put("/update/:id", authMiddleware, isAdmin, updateBrand)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteBrand)
    .get("/:id", singleBrand)
    .get("/", getAllBrand)

module.exports = router;