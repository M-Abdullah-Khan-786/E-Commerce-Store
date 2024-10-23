const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProduct,
  getsingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addWishlist,
  addRating,
} = require("../controllers/productController");
const { uploadProductImages } = require("../utils/multer");

router
  .get("/:id", authMiddleware, getsingleProduct)
  .get("/", getAllProducts)
  .put("/wishlist", authMiddleware, addWishlist)
  .put("/ratings", authMiddleware, addRating)
  .post("/create", authMiddleware, isAdmin, uploadProductImages.array('images', 10), createProduct)
  .put("/update/:id", authMiddleware, isAdmin, uploadProductImages.array('images', 10), updateProduct)
  .delete("/delete/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
