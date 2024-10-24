const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");
const validateId = require("../utils/validateId");
const cloudinary = require("cloudinary").v2;

// Create Blog
exports.createBlog = asyncHandler(async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return next(errorhandler(400, "Please fill all required fields"));
    }
    const newBlog = await Blog.create(req.body);
    return res.json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    return next(errorhandler(500, "Internal server error"));
  }
});

// Update Blog
exports.updateBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  next(validateId(id));
  const findBlog = await Blog.findById(id);
  if (!findBlog) {
    return next(errorhandler(404, "Blog not found"));
  }

  const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    updateBlog,
  });
});

// Delete Blog
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  next(validateId(id));
  const findBlog = await Blog.findById(id);
  if (!findBlog) {
    return next(errorhandler(404, "Blog not found"));
  }

  const deleteBlog = await Blog.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
    deleteBlog,
  });
});

// Get Single Blog
exports.singleBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const findBlog = await Blog.findById(id);
  const updated = await Blog.findByIdAndUpdate(
    id,
    {
      $inc: { numViews: 1 },
    },
    {
      new: true,
    }
  )
    .populate("likes")
    .populate("dislikes");
  if (!findBlog) {
    return next(errorhandler(404, "Blog not found"));
  }
  return res.status(200).json({
    success: true,
    updated,
  });
});

// Get All Blogs
exports.getAllBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find();
  return res.status(200).json({
    success: true,
    blogs,
  });
});

// Liked Blog
exports.likedBlog = asyncHandler(async (req, res, next) => {
  const { blogId } = req.body;
  const findBlog = await Blog.findById(blogId);
  if (!findBlog) {
    return next(errorhandler(404, "Blog not found"));
  }
  const loginUserId = req.user._id;
  const isLiked = findBlog?.isLiked;
  const isDisliked = findBlog?.dislikes?.find(
    (userId) => userId.toString() === loginUserId?.toString()
  );

  if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {},
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      }
    );
    return res.status(200).json({
      success: true,
      blog,
    });
  }

  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {},
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      blog,
    });
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      blog,
    });
  }
});

// Disliked Blog
exports.disLikedBlog = asyncHandler(async (req, res, next) => {
  const { blogId } = req.body;
  const findBlog = await Blog.findById(blogId);
  if (!findBlog) {
    return next(errorhandler(404, "Blog not found"));
  }
  const loginUserId = req.user._id;
  const isDisliked = findBlog?.isDisliked;
  const isLiked = findBlog?.likes?.find(
    (userId) => userId.toString() === loginUserId?.toString()
  );

  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {},
      {
        $pull: { liked: loginUserId },
        isLiked: false,
      }
    );
    return res.status(200).json({
      success: true,
      blog,
    });
  }

  if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {},
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      blog,
    });
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      blog,
    });
  }
});