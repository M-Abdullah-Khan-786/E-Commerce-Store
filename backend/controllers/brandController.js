const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");

//  Create Brand
exports.createBrand = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return next(errorhandler(400, "Please provide a name for the Brand"));
  }
  const newBrand = await Brand.create(req.body);
  res.status(201).json({
    success: true,
    message: "Brand created successfully",
    newBrand,
  });
});

//  Update Brand
exports.updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const findBrand = await Brand.findById(id)
    if (!findBrand) {
      return next(errorhandler(404, "Brand not found"));
    }
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body,{
        new: true,
        runValidators: true,
    })
    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      updateBrand,
    });
  });

  //  Delete Brand
exports.deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const findBrand = await Brand.findById(id)
    if (!findBrand) {
      return next(errorhandler(404, "Brand not found"));
    }
    const deletedBrand = await Brand.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
      deletedBrand,
    });
  });

  //  Get Single Brand
exports.singleBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const findBrand = await Brand.findById(id)
  if (!findBrand) {
    return next(errorhandler(404, "Brand not found"));
  }
  res.status(200).json({
    success: true,
    findBrand,
  });
});

 //  Get All Brand
 exports.getAllBrand = asyncHandler(async (req, res, next) => {
  const allBrand = await Brand.find()
  res.status(200).json({
    success: true,
    allBrand,
  });
});