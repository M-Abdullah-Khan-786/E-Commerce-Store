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
    const products = await Product.find()
    res.status(200).json({
        success: true,
        products
    })
})
