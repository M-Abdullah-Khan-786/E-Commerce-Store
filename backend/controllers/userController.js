const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");
const validateId = require("../utils/validateId");

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

    return res.status(201).json({
        success: true,
        message: "User register successfully",
        token: await user.generateToken(),
        user,
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

    return res.status(200).json({
        success: true,
        message: "User login successfully",
        token: await userExist.generateToken(),
        userExist,
    });
});

// get all Users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().select("-password");
    res.status(200).json({
        success: true,
        users
    });
});


// get single User
exports.getSingleUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    next(validateId(id))
    const user = await User.findById(id).select("-password")
    if (!user) {
        return next(errorhandler(404, "User not found"))
    }

    return res.status(200).json({
        success: true,
        user
    })
})


// update User
exports.UpdateeUser = asyncHandler(async (req, res, next) => {
    const { _id } = req.user
    next(validateId(_id))
    const user = await User.findById(_id).select("-password")
    if (!user) {
        return next(errorhandler(404, "User not found"))
    }

    const updateUser = await User.findByIdAndUpdate(_id, req.body, {
        runValidators: true,
        new: true
    })

    return res.status(200).json({
        success: true,
        message: "User Updated Successfully",
        updateUser
    })
})


// delete User
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    next(validateId(id))
    const user = await User.findById(id)

    if (!user) {
        return next(errorhandler(404, "User not found"))
    }

    const userdeletd = await User.findByIdAndDelete(id).select("-password")

    return res.status(200).json({
        success: true,
        message: "User deleted Successfully",
        userdeletd
    })
})


// Block User
exports.blockUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    next(validateId(id))
    const user = await User.findById(id).select("-password")
    if (!user) {
        return next(errorhandler(404, "User not found"))
    }

    const block = await User.findByIdAndUpdate(id, { isBlocked: true }, {
        runValidators: true,
        new: true
    })

    return res.status(200).json({
        success: true,
        message: "User Blocked Successfully",
        block
    })
})

// Unblock User
exports.unBlockUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    next(validateId(id))
    const user = await User.findById(id).select("-password")
    if (!user) {
        return next(errorhandler(404, "User not found"))
    }

    const unblock = await User.findByIdAndUpdate(id, { isBlocked: false }, {
        runValidators: true,
        new: true
    })

    return res.status(200).json({
        success: true,
        message: "User Unblocked Successfully",
        unblock
    })
})