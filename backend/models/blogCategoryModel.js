const mongoose = require("mongoose");

const blogcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const BCategory = mongoose.model("Blog_Category", blogcategorySchema);
module.exports = BCategory;