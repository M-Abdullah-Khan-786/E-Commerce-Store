import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import customerReducer from "../features/customer/customerSlice.js";
import productReducer from "../features/product/productSlice.js";
import brandReducer from "../features/brand/brandSlice.js";
import pCategoryReducer from "../features/product-category/pcategorySlice.js";
import colorReducer from "../features/color/colorSlice.js";
import bCategoryReducer from "../features/blog-category/bcategorySlice.js";
import blogReducer from "../features/blog/blogSlice.js";
import inquiryReducer from "../features/Inquiry/inquirySlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    productCategory: pCategoryReducer,
    color: colorReducer,
    blogCategory: bCategoryReducer,
    blog:blogReducer,
    inquiry: inquiryReducer,
  },
});
