const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");
const slugify = require("slugify");
const cloudinary = require("cloudinary").v2;

// create Product
exports.createProduct = asyncHandler(async (req, res, next) => {
 try {
  const imageUrls = Array.isArray(req.files) ? req.files.map(file => ({
    url: file.path, 
    public_id: file.filename
})) : [];
  
  const newProduct = await Product.create({ ...req.body, images: imageUrls });
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    newProduct,
  });
 } catch (error) {
  return next(
    errorhandler(500, "Error to Add Products")
  );
 }
});

// get a single Product
exports.getsingleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(errorhandler(404, "Product not found"));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const findProduct = await Product.findById(id);
  if (!findProduct) {
    return next(errorhandler(404, "Product not found"));
  }

  const imagePublicIds = findProduct.images.map((image) => {
    const segments = image.url.split("/");
    const publicIdSegment = segments[segments.length - 1].split(".")[0];
    return publicIdSegment;
  });
  

  try {
    await Promise.all(
      imagePublicIds.map((publicId) => cloudinary.uploader.destroy(publicId))
    );

    const deleted = await Product.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deleted,
    });
  } catch (error) {
    return next(
      errorhandler(500, "Error deleting product images from Cloudinary")
    );
  }
});

// update Product
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const existingImages = req.body.images || [];
  const newImages = req.files ? req.files.map(file => ({ url: file.path, public_id: file.filename })) : [];
  const removeImages = Array.isArray(req.body.removeImages) ? req.body.removeImages : [];

  const product = await Product.findById(id);
  if (!product) {
    return next(errorhandler(404, "Product not found"));
  }

  if (removeImages.length > 0) {
    await Promise.all(removeImages.map(async (publicId) => {
      await cloudinary.uploader.destroy(publicId);
    }));
  }

  const finalImages = [
    ...existingImages.filter(img => img.public_id && !removeImages.includes(img.public_id)),
    ...newImages,
  ];

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { ...req.body, images: finalImages },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    updatedProduct,
  });
});


// get all Products
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  try {
    // Filtering the Products
    const queryObject = { ...req.query };
    const excludeField = ["limit", "sort", "page", "fields"];
    excludeField.forEach((el) => delete queryObject[el]);

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (str) => `$${str}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting the Products
    if (req.query.sort) {
      const sortedBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortedBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting the Fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination on Products
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit || 22;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount)
        return next(errorhandler(400, "Page does not exist"));
    }

    const getAllproducts = await query;
    res.status(200).json({
      success: true,
      getAllproducts,
    });
  } catch (error) {
    console.error("Error while getting products:", error);
    return next(errorhandler(500, "Internal server error"));
  }
});

// Add Wishlist
exports.addWishlist = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { productId } = req.body;

  try {
    const user = await User.findById(_id);
    const alreadyExists = user.wishlist.find(
      (id) => id.toString() === productId
    );

    const update = alreadyExists
      ? { $pull: { wishlist: productId } }
      : { $push: { wishlist: productId } };

    const updatedUser = await User.findByIdAndUpdate(_id, update, {
      new: true,
    }).populate("wishlist"); // Populating the wishlist with Product details

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return next(errorhandler(500, "Internal server error"));
  }
});

// Add Rating
exports.addRating = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { productId, star, comment } = req.body;
  try {
    const product = await Product.findById(productId);
    let alreadyRated = product.ratings.find(
      (rating) => rating.postedBy.toString() === _id.toString()
    );

    if (alreadyRated) {
      await Product.updateOne(
        { _id: productId, "ratings._id": alreadyRated._id },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      await Product.findByIdAndUpdate(
        productId,
        {
          $push: { ratings: { star: star, comment: comment, postedBy: _id } },
        },
        {
          new: true,
        }
      );
    }

    const getallRatings = await Product.findById(productId);
    let totalRating = getallRatings.ratings.length;
    let ratingSum = getallRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let findRating = Math.round(ratingSum / totalRating);

    await Product.findByIdAndUpdate(
      productId,
      {
        totalratings: findRating,
      },
      {
        new: true,
      }
    );

    const updatedProduct = await Product.findById(productId);

    return res.status(200).json({
      success: true,
      message: "Rating added successfully",
      updatedProduct,
    });
  } catch (error) {
    return next(errorhandler(500, "Internal server error"));
  }
});
