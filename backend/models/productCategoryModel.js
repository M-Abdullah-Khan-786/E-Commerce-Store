const mongoose = require("mongoose"); 

const productcategorySchema = new mongoose.Schema(
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

const PCategory = mongoose.model("Product_Category", productcategorySchema);
module.exports = PCategory;
