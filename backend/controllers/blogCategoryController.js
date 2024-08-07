const BCategory = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");

//  Create Category
exports.createCategory = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return next(errorhandler(400, "Please provide a name for the category"));
  }
  const newCategory = await BCategory.create(req.body);
  res.status(201).json({
    success: true,
    message: "Blog Category created successfully",
    newCategory,
  });
});

//  Update Category
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const findCategory = await BCategory.findById(id)
    if (!findCategory) {
      return next(errorhandler(404, "Blog Category not found"));
    }
    const updateCategory = await BCategory.findByIdAndUpdate(id, req.body,{
        new: true,
        runValidators: true,
    })
    res.status(200).json({
      success: true,
      message: "Blog Category updated successfully",
      updateCategory,
    });
  });

  //  Delete Category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const findCategory = await BCategory.findById(id)
    if (!findCategory) {
      return next(errorhandler(404, "Category not found"));
    }
    const deletedCategory = await BCategory.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: "Blog Category deleted successfully",
      deletedCategory,
    });
  });

  //  Get Single Category
exports.singleCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const findCategory = await BCategory.findById(id)
  if (!findCategory) {
    return next(errorhandler(404, "Category not found"));
  }
  res.status(200).json({
    success: true,
    findCategory,
  });
});

 //  Get All Category
 exports.getAllCategory = asyncHandler(async (req, res, next) => {
  const allCategory = await BCategory.find()
  res.status(200).json({
    success: true,
    allCategory,
  });
});