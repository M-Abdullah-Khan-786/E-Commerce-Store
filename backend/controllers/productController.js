const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const { errorhandler } = require("../middlewares/errorMiddleware");
const slugify = require('slugify');

// create Product
exports.createProduct = asyncHandler(async (req, res, next) => {
    const newProduct = await Product.create(req.body)
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        newProduct
    })
})

// get a single Product
exports.getsingleProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
        return next(errorhandler(404, "Product not found"))
    }
    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const findProduct = await Product.findById(id)
    if (!findProduct) {
        return next(errorhandler(404, "Product not found"))
    }
    const deleted = await Product.findByIdAndDelete(id)
    return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        deleted
    })
})


// update Product
exports.updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const findProduct = await Product.findById(id)
    if (!findProduct) {
        return next(errorhandler(404, "Product not found"))
    }
    if (req.body.title) {
        req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })
    return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        updatedProduct
    })
})

// get all Products
exports.getAllProducts = asyncHandler(async (req, res, next) => {
    try {
        // Filtering the Products
        const queryObject = { ...req.query }
        const excludeField = ["limit", "sort", "page", "fields"]
        excludeField.forEach((el) => delete queryObject[el])

        let queryStr = JSON.stringify(queryObject)
        queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, str => `$${str}`)

        let query = Product.find(JSON.parse(queryStr))

        // Sorting the Sorting
        if (req.query.sort) {
            const sortedBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortedBy)
        } else {
            query = query.sort('-createdAt')
        }

        // Limiting the Fields
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }


        // Pagination on Products
        const page = req.query.page * 1 || 1
        const limit = req.query.limit || 22;
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) return next(errorhandler(400, "Page does not exist"))
        }

        const getAllproducts = await query
        res.status(200).json({
            success: true,
            getAllproducts
        })
    } catch (error) {
        console.error("Error while getting products:", error);
        return next(errorhandler(500, "Internal server error"))
    }
})
