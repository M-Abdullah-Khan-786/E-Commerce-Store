const User = require("../models/userModel");
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const { errorhandler } = require("./errorMiddleware");

const authMiddleware = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers["authorization"]

        if (!token) {
            return next(errorhandler(401, "Please Login"))
        }

        const authToken = token.split(" ")[1]

        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password")

        req.user = user
        next()
    } catch (error) {
        return next(errorhandler(401, error.message))
    }
})


const isAdmin = asyncHandler(async (req, res, next) => {
    const check = req.user
    if (!check.isAdmin) {
        return next(errorhandler(401, "Only Admin Allowed"))
    }
    next()
})


module.exports = { authMiddleware, isAdmin }