const Color = require("../models/colorModel");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");

//  Create Color
exports.createColor = asyncHandler(async (req, res, next) => {
    const { title } = req.body;
    if (!title) {
      return next(errorhandler(400, "Please provide a name for the Color"));
    }
    const newColor = await Color.create(req.body);
    res.status(201).json({
      success: true,
      message: "Color created successfully",
      newColor,
    });
  });
  
  //  Update Color
  exports.updateColor = asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      const findColor = await Color.findById(id)
      if (!findColor) {
        return next(errorhandler(404, "Color not found"));
      }
      const updateColor = await Color.findByIdAndUpdate(id, req.body,{
          new: true,
          runValidators: true,
      })
      res.status(200).json({
        success: true,
        message: "Color updated successfully",
        updateColor,
      });
    });
  
    //  Delete Color
  exports.deleteColor = asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      const findColor = await Color.findById(id)
      if (!findColor) {
        return next(errorhandler(404, "Color not found"));
      }
      const deletedColor = await Color.findByIdAndDelete(id)
      res.status(200).json({
        success: true,
        message: "Color deleted successfully",
        deletedColor,
      });
    });
  
    //  Get Single Color
  exports.singleColor = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const findColor = await Color.findById(id)
    if (!findColor) {
      return next(errorhandler(404, "Color not found"));
    }
    res.status(200).json({
      success: true,
      findColor,
    });
  });
  
   //  Get All Color
   exports.getAllColor = asyncHandler(async (req, res, next) => {
    const allColor = await Color.find()
    res.status(200).json({
      success: true,
      allColor,
    });
  });