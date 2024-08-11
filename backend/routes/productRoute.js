const express = require("express")
const router = express.Router()
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createProduct, getsingleProduct, getAllProducts, updateProduct, deleteProduct, addWishlist, addRating, uploadImages } = require("../controllers/productController")
const { uploadProductImages } = require("../utils/multer")

router
    .get("/:id", authMiddleware, getsingleProduct)
    .get("/", authMiddleware, getAllProducts)
    .put("/wishlist", authMiddleware, addWishlist)
    .put("/ratings", authMiddleware, addRating)
    .post("/create", authMiddleware, isAdmin, createProduct)
    .put("/upload/:id", authMiddleware, isAdmin, uploadProductImages.array('images', 10), uploadImages)
    .put("/update/:id", authMiddleware, isAdmin, updateProduct)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteProduct)

module.exports = router