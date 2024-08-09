const express = require("express");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  singleCoupon,
  deleteCoupon,
} = require("../controllers/couponController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .post("/create", authMiddleware, isAdmin, createCoupon)
  .put("/update/:id", authMiddleware, isAdmin, updateCoupon)
  .delete("/delete/:id", authMiddleware, isAdmin, deleteCoupon)
  .get("/:id", authMiddleware, singleCoupon)
  .get("/", authMiddleware, getAllCoupons)

module.exports = router;
