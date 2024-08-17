const express = require("express");
const {
  createInquiry,
  deleteInquiry,
  singleInquiry,
  getAllInquiry,
  updateInquiryStatus,
} = require("../controllers/inquiryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .post("/create", createInquiry)
  .put("/update/:id", authMiddleware, isAdmin, updateInquiryStatus)
  .delete("/delete/:id", deleteInquiry)
  .get("/:id", singleInquiry)
  .get("/", getAllInquiry);

module.exports = router;
