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
  .get("/all-users", authMiddleware, isAdmin, getAllUsers)
  .get("/:id", getSingleUser)
  .put("/update", authMiddleware, UpdateUser)
  .put("/save-address", authMiddleware, saveAddress)
  .put("/update-password", authMiddleware, updatePassword)
  .put("/block-user/:id", authMiddleware, isAdmin, blockUser)
  .put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser)
  .delete("/:id", deleteUser);

module.exports = router;
