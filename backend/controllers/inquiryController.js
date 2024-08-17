const Inquiry = require("../models/inquiryModel");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");

//  Create Inquiry
exports.createInquiry = asyncHandler(async (req, res, next) => {
    const { name, email, phone, comment } = req.body;
    if (!name || !email || !phone || !comment) {
      return next(errorhandler(400, "Please provide all the fields for the Inquiry"));
    }
    const newInquiry = await Inquiry.create(req.body);
    res.status(201).json({
      success: true,
      message: "your Inquiry submitted successfully",
      newInquiry,
    });
  });
  
  //  Update Inquiry Status
   exports.updateInquiryStatus = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const {status} = req.body
    const findInquiry = await Inquiry.findById(id)
    if (!findInquiry) {
      return next(errorhandler(404, "Inquiry not found"));
    }
    const updateStatus = await Inquiry.findByIdAndUpdate(id,{
        status
    },{
        new: true,
        runValidators: true,
    })
    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
      updateStatus,
    });
  });

    //  Delete Inquiry
  exports.deleteInquiry = asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      const findInquiry = await Inquiry.findById(id)
      if (!findInquiry) {
        return next(errorhandler(404, "Inquiry not found"));
      }
      const deletedInquiry = await Inquiry.findByIdAndDelete(id)
      res.status(200).json({
        success: true,
        message: "Inquiry deleted successfully",
        deletedInquiry,
      });
    });
  
    //  Get Single Inquiry
  exports.singleInquiry = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const findInquiry = await Inquiry.findById(id)
    if (!findInquiry) {
      return next(errorhandler(404, "Inquiry not found"));
    }
    res.status(200).json({
      success: true,
      findInquiry,
    });
  });
  
   //  Get All Inquiry
   exports.getAllInquiry = asyncHandler(async (req, res, next) => {
    const allInquiry = await Inquiry.find()
    res.status(200).json({
      success: true,
      allInquiry,
    });
  });