const User = require("../models/userModel");
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
  const { id } = req.params;
  next(validateId(id));
  const user = await User.findById(id).select("-password");
  if (!user) {
    return next(errorhandler(404, "User not found"));
  }

  return res.status(200).json({
    success: true,
    user,
  });
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
