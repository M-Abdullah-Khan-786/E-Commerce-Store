const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");
const crypto = require("crypto");
const validateId = require("../utils/validateId");
const generateRefreshtoken = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");

// resgister User
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !password) {
    return next(errorhandler(400, "Please fill all required fields"));
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(errorhandler(400, "User already exist"));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
  });

  const refreshToken = await generateRefreshtoken(user._id);
  const registerUser = await User.findByIdAndUpdate(
    user._id,
    { refreshToken },
    {
      new: true,
    }
  ).select("-refreshToken");

  return res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      success: true,
      message: "User register successfully",
      token: await user.generateToken(),
      registerUser,
    });
});

// login User
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorhandler(400, "Please fill all required fields"));
  }

  const userExist = await User.findOne({ email });
  if (!userExist) {
    return next(errorhandler(401, "Invalid Email or Password"));
  }

  const comparePassword = await userExist.checkPassword(password);

  if (!comparePassword) {
    return next(errorhandler(401, "Invalid Email or Password"));
  }

  const refreshToken = await generateRefreshtoken(userExist._id);
  const loginUser = await User.findByIdAndUpdate(
    userExist._id,
    { refreshToken },
    {
      new: true,
    }
  ).select("-refreshToken");

  return res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
      message: "User login successfully",
      token: await userExist.generateToken(),
      loginUser,
    });
});

// login Admin
exports.loginAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorhandler(400, "Please fill all required fields"));
  }

  const userExist = await User.findOne({ email });

  if (!userExist) {
    return next(errorhandler(401, "Invalid Email or Password"));
  }

  const comparePassword = await userExist.checkPassword(password);

  if (!comparePassword) {
    return next(errorhandler(401, "Invalid Email or Password"));
  }
  if (!userExist.isAdmin) {
    return next(
      errorhandler(401, "You are Not Authorised. Only Admin Allowed")
    );
  }

  const refreshToken = await generateRefreshtoken(userExist._id);
  const loginUser = await User.findByIdAndUpdate(
    userExist._id,
    { refreshToken },
    {
      new: true,
    }
  ).select("-refreshToken");

  return res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
      message: "User login successfully",
      token: await userExist.generateToken(),
      loginUser,
    });
});

// logout User
exports.logoutUser = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) {
    return next(errorhandler(400, "Token not available in cookies"));
  }
  return res
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    })
    .status(200)
    .json({
      success: true,
      message: "User logout successfully",
    });
});

// handle Refresh Token
exports.handleToken = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) {
    return next(errorhandler(400, "Token not available in cookies"));
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  const decoded = await jwt.verify(refreshToken, process.env.JWT_SECRET);
  if (user._id.toString() !== decoded.id) {
    return next(errorhandler(401, "Invalid Refresh Token"));
  }
  const accessToken = await generateRefreshtoken(user._id);
  res.status(200).json({
    success: true,
    accessToken,
  });
});

// get all Users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-password");
  res.status(200).json({
    success: true,
    users,
  });
});

// get single User
exports.getSingleUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(errorhandler(404, "User not found"));
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

// update User
exports.UpdateUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  next(validateId(_id));
  const user = await User.findById(_id).select("-password");
  if (!user) {
    return next(errorhandler(404, "User not found"));
  }

  const updateUser = await User.findByIdAndUpdate(_id, req.body, {
    runValidators: true,
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    updateUser,
  });
});

// delete User
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  next(validateId(id));
  const user = await User.findById(id);

  if (!user) {
    return next(errorhandler(404, "User not found"));
  }

  const userdeletd = await User.findByIdAndDelete(id).select("-password");

  return res.status(200).json({
    success: true,
    message: "User deleted Successfully",
    userdeletd,
  });
});

// Block User
exports.blockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  next(validateId(id));
  const user = await User.findById(id).select("-password");
  if (!user) {
    return next(errorhandler(404, "User not found"));
  }

  const block = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    {
      runValidators: true,
      new: true,
    }
  );

  return res.status(200).json({
    success: true,
    message: "User Blocked Successfully",
    block,
  });
});

// Unblock User
exports.unBlockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  next(validateId(id));
  const user = await User.findById(id).select("-password");
  if (!user) {
    return next(errorhandler(404, "User not found"));
  }

  const unblock = await User.findByIdAndUpdate(
    id,
    { isBlocked: false },
    {
      runValidators: true,
      new: true,
    }
  );

  return res.status(200).json({
    success: true,
    message: "User Unblocked Successfully",
    unblock,
  });
});

// Update User Password
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json({
      success: true,
      message: "Password updated successfully",
      updatedPassword,
    });
  } else {
    res.json(user);
  }
});

// Forgot Password Token Generate
exports.forgotPasswordtoken = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(errorhandler(404, "User not found"));
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset your password. This link is valid for 10 minutes. <a href="http://localhost:8800/api/user/reset-password/${token}">Click here</a>`;
    const data = {
      to: email,
      subject: "Your password reset token (valid for 2 minutes)",
      text: `Hey, ${user.firstName}`,
      html: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    return next(errorhandler(500, error));
  }
});

// Reset Password
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user)
    return next(errorhandler(404, "TimeOut, Please reset you password again"));
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  return res.json({
    success: true,
    message: "Password reset successfully",
    user,
  });
});

// Get Wishlist
exports.getWishlist = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    return res.status(200).json({
      success: true,
      findUser,
    });
  } catch (error) {
    console.log(error.message);
    return next(errorhandler(500, "Internal server error"));
  }
});

// Save User address
exports.saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { address } = req.body;
  try {
    const findUser = await User.findByIdAndUpdate(
      _id,
      { address },
      { new: true, runValidators: true }
    ).populate("address");
    return res.status(200).json({
      success: true,
      findUser,
    });
  } catch (error) {
    console.log(error.message);
    return next(errorhandler(500, "Internal server error"));
  }
});

// Add to Cart
exports.addCart = asyncHandler(async (req, res, next) => {
  const { cart } = req.body;
  const { _id } = req.user;
  try {
    let products = [];
    const user = await User.findById(_id);
    const isAlreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (isAlreadyExistCart) {
      isAlreadyExistCart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let objects = {};
      objects.product = cart[i]._id;
      objects.count = cart[i].count;
      objects.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      objects.price = getPrice.price;
      products.push(objects);
    }
    let carttotal = 0;
    for (let i = 0; i < products.length; i++) {
      carttotal += products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      carttotal,
      orderby: user._id,
    }).save();

    return res.status(200).json({
      success: true,
      newCart,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// get a Cart
exports.getCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.log(error.message);
    return next(errorhandler(500, "Internal server error"));
  }
});

// Empty Cart
exports.emptyCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findOne({ _id });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const cart = await Cart.findOneAndDelete({ orderby: user._id });
    const checkCart = await Cart.findOne({ orderby: user._id });
    return res.status(200).json({
      success: true,
      message: "Cart is Empty",
      checkCart,
    });
  } catch (error) {
    console.log(error.message);
    return next(errorhandler(500, "Internal server error"));
  }
});

// Apply Coupon
exports.applyCoupon = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { coupon } = req.body;

  const isValidCoupon = await Coupon.findOne({ name: coupon });
  if (!isValidCoupon) {
    return res.status(400).json({ success: false, message: "Invalid Coupon" });
  }

  const user = await User.findOne({ _id });
  const cart = await Cart.findOne({ orderby: user._id }).populate(
    "products.product"
  );

  if (!cart) {
    return res.status(400).json({ success: false, message: "Cart not found" });
  }

  let { carttotal } = cart;
  let totalafterdiscount = (
    carttotal -
    (carttotal * isValidCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalafterdiscount },
    {
      new: true,
      runValidators: true,
    }
  );
  return res.json({
    success: true,
    message: "Coupon Applied Successfully",
    totalafterdiscount,
  });
});

// Create Order
exports.createOrder = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { COD, couponApplied } = req.body;
  try {
    if (!COD) return next(errorhandler(400, "Create cash order failed"));
    const user = await User.findById(_id);
    console.log(user);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmount = 0;
    if (couponApplied && userCart.totalafterdiscount) {
      finalAmount = userCart.totalafterdiscount * 100;
    } else {
      finalAmount = userCart.carttotal * 100;
    }
    const newOrder = await new Order({
      orderby: user,
      products: userCart.products,
      paymentintent: {
        id: uuidv4(),
        amount: finalAmount,
        currency: "PKR",
        method: "COD",
        status: "Cash on Delivery",
        created: Date.now(),
      },
      orderstatus: "Cash on Delivery",
    }).save();

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    const updated = await Product.bulkWrite(update, {});
    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
  }
});

// Get Order
exports.getOrder = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  try {
    const order = await Order.findOne({ orderby: _id }).populate(
      "products.product"
    );
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    return next(errorhandler(500, "Internal server error"));
  }
});

// Get All Order by Admin
exports.getAllOrder = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.find()
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    return next(errorhandler(500, "Internal server error"));
  }
});

// Update Orders
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { orderstatus } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      {
        orderstatus,
        paymentintent: {
          status: orderstatus,
          updated: Date.now(),
        },
      },
      { new: true, runValidators: true }
    ).populate("products.product");
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    return next(errorhandler(500, "Internal server error"));
  }
});
