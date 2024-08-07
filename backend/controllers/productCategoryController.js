const PCategory = require("../models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");

//  Create Category
exports.createCateory = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return next(errorhandler(400, "Please provide a name for the category"));
  }
  const newCategory = await PCategory.create(req.body);
  res.status(201).json({
    success: true,
    message: "Category created successfully",
    newCategory,
  });
});

//  Update Category
exports.updateCateory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const findCategory = await PCategory.findById(id)
    if (!findCategory) {
      return next(errorhandler(404, "Category not found"));
    }
    const updateCategory = await PCategory.findByIdAndUpdate(id, req.body,{
        new: true,
        runValidators: true,
    })
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      updateCategory,
    });
  });

  //  Delete Category
exports.deleteCateory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const findCategory = await PCategory.findById(id)
    if (!findCategory) {
      return next(errorhandler(404, "Category not found"));
    }
    const deletedCategory = await PCategory.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      deletedCategory,
    });
  });

  //  Get Single Category
exports.singleCateory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const findCategory = await PCategory.findById(id)
  if (!findCategory) {
    return next(errorhandler(404, "Category not found"));
  }
  res.status(200).json({
    success: true,
    findCategory,
  });
});

 //  Get All Category
 exports.getAllCateory = asyncHandler(async (req, res, next) => {
  const allCategory = await PCategory.find()
  res.status(200).json({
    success: true,
    allCategory,
  });
});