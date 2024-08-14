const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      count: Number,
      color: String,
    },
  ],
  paymentintent:{},
  orderstatus:{
    type: String,
    default: "pending",
    enum: ["pending", "processing", "shipped", "Cash on Delivery", "delivered", "cancelled"]
  },
  orderby:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
  }
},{
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
