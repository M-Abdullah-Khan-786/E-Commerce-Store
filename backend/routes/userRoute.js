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
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router
  .get("/wishlist", authMiddleware, getWishlist)
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/login-admin", loginAdmin)
  .post("/forgot-password", forgotPasswordtoken)
  .post("/reset-password/:token", resetPassword)
  .get("/refresh", handleToken)
  .get("/logout", logoutUser)
  .get("/AllUsers", authMiddleware, isAdmin, getAllUsers)
  .get("/:id", getSingleUser)
  .delete("/:id", deleteUser)
  .put("/update", authMiddleware, UpdateUser)
  .put("/updatePassword", authMiddleware, updatePassword)
  .put("/block-user/:id", authMiddleware, isAdmin, blockUser)
  .put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
