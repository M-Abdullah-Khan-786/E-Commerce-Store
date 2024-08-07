const mongoose = require("mongoose"); // Erase if already required

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
