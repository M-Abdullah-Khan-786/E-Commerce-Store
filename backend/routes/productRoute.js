const express = require("express")
const router = express.Router()
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createProduct, getsingleProduct, getAllProducts, updateProduct, deleteProduct, addWishlist, addRating, uploadImages, deleteImage, updateImage } = require("../controllers/productController")
const { uploadProductImages } = require("../utils/multer")

router
    .get("/:id", authMiddleware, getsingleProduct)
    .get("/", authMiddleware, getAllProducts)
    .put("/wishlist", authMiddleware, addWishlist)
    .put("/ratings", authMiddleware, addRating)
    .post("/create", authMiddleware, isAdmin, createProduct)
    .put("/upload-image/:id", authMiddleware, isAdmin, uploadProductImages.array('images', 10), uploadImages)
    .delete("/delete-image/:id", authMiddleware, isAdmin, deleteImage)
    .put("/update/:id", authMiddleware, isAdmin, updateProduct)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteProduct)

module.exports = router