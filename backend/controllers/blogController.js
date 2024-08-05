const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");
const validateId = require("../utils/validateId");

exports.createBlog = asyncHandler(async (req, res, next) => {
    const { title, description, category, author } = req.body;
    if (!title || !description || !category || !authore) {
        return next(errorhandler(400, "Please fill all required fields"));
    }
})