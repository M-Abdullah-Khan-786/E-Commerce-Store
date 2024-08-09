const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");

// Create Coupon
exports.createCoupon = asyncHandler(async (req, res, next) => {
  const { name, expiry, discount } = req.body;
  if (!name || !expiry || !discount) {
    return next(errorhandler(400, "Please fill all required fields"));
  }
  const newCoupon = await Coupon.create(req.body);
  res.status(201).json({
    success: true,
    message: "Coupon created successfully",
    newCoupon,
  });
});

// Update Coupon
exports.updateCoupon = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const findCoupon = await Coupon.findById(id)
    if (!findCoupon) {
      return next(errorhandler(404, "Coupon not found"));
    }
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body,{
        new: true,
        runValidators: true,
    })
    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      updateCoupon,
    });
  });

  // Get Single Coupon
exports.singleCoupon = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const findCoupon = await Coupon.findById(id)
    if (!findCoupon) {
      return next(errorhandler(404, "Coupon not found"));
    }
    res.status(200).json({
      success: true,
      findCoupon,
    });
  });

// Get All Coupons
exports.getAllCoupons = asyncHandler(async (req, res, next) => {
    const Coupons = await Coupon.find();
    res.status(200).json({
      success: true,
      Coupons,
    });
  });

  // Delete Coupon
exports.deleteCoupon = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const findCoupon = await Coupon.findById(id)
    if (!findCoupon) {
      return next(errorhandler(404, "Coupon not found"));
    }
    const deletedCoupon = await Coupon.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
      deletedCoupon,
    });
  });