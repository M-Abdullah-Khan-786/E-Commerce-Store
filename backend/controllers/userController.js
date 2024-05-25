const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");
const validateId = require("../utils/validateId");
const generateRefreshtoken = require("../config/refreshToken");
const jwt = require("jsonwebtoken")

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

    return res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
    }).status(201).json({
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

    return res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
    }).status(200).json({
        success: true,
        message: "User login successfully",
        token: await userExist.generateToken(),
        loginUser,
    });
});

// logout User
exports.logoutUser = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies
    if (!cookie.refreshToken) {
        return next(errorhandler(400, "Token not available in cookies"))
    }
    return res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    }).status(200).json({
        success: true,
        message: "User logout successfully"
    })
})

// handle Refresh Token
exports.handleToken = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies
    if (!cookie.refreshToken) {
        return next(errorhandler(400, "Token not available in cookies"))
    }
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken })
    const decoded = await jwt.verify(refreshToken, process.env.JWT_SECRET)
    if (user._id.toString() !== decoded.id) {
        return next(errorhandler(401, "Invalid Refresh Token"))
    }
    const accessToken = await generateRefreshtoken(user._id)
    res.status(200).json({
        success: true,
        accessToken
    })
})

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
exports.UpdateeUser = asyncHandler(async (req, res, next) => {
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
