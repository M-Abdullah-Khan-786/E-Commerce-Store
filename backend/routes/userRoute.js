const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  UpdateUser,
  deleteUser,
  blockUser,
  unBlockUser,
  handleToken,
  logoutUser,
  updatePassword,
  forgotPasswordtoken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  addCart,
  getCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrder,
  updateOrder,
  getAllOrder,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/login-admin", loginAdmin)
  .post("/forgot-password", forgotPasswordtoken)
  .post("/reset-password/:token", resetPassword)
  .get("/refresh", handleToken)
  .get("/logout", logoutUser)
  .get("/wishlist", authMiddleware, getWishlist)
  .get("/cart", authMiddleware, getCart)
  .get("/orders", authMiddleware, getOrder)
  .get("/all-orders", authMiddleware,isAdmin, getAllOrder)
  .post("/cart", authMiddleware, addCart)
  .post("/cart/apply-coupon", authMiddleware, applyCoupon)
  .post("/cart/create-order", authMiddleware, createOrder)
  .delete("/empty-cart", authMiddleware, emptyCart)
  .get("/all-users", getAllUsers)
  .get("/:id", getSingleUser)
  .put("/update", authMiddleware, UpdateUser)
  .put("/save-address", authMiddleware, saveAddress)
  .put("/update-password", authMiddleware, updatePassword)
  .put("/block-user/:id", authMiddleware, isAdmin, blockUser)
  .put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser)
  .put("/update-order/:id", authMiddleware, isAdmin, updateOrder)
  .delete("/:id", deleteUser);

module.exports = router;
