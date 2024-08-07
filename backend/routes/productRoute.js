const express = require("express")
const router = express.Router()
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createProduct, getsingleProduct, getAllProducts, updateProduct, deleteProduct, addWishlist } = require("../controllers/productController")

router
    .get("/:id", authMiddleware, getsingleProduct)
    .get("/", authMiddleware, getAllProducts)
    .put("/wishlist", authMiddleware, addWishlist)
    .post("/create", authMiddleware, isAdmin, createProduct)
    .put("/update/:id", authMiddleware, isAdmin, updateProduct)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteProduct)

module.exports = router