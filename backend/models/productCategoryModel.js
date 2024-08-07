const mongoose = require("mongoose"); // Erase if already required

const categorySchema = new mongoose.Schema(
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

const PCategory = mongoose.model("Category", categorySchema);
module.exports = PCategory;
