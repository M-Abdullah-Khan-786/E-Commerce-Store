// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js';
import "./App.css";
import "react-widgets/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Inquiries from "./pages/Inquiries";
import Bloglist from "./pages/Bloglist";
import BlogCategoryList from "./pages/BlogCategoryList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import ProductCategorylist from "./pages/ProductCategorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import AddBlog from "./pages/AddBlog";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddColor from "./pages/AddColor";
import AddProductCategory from "./pages/AddProductCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import UpdateBrand from "./pages/UpdateBrand";
import UpdateColor from "./pages/UpdateColor";
import UpdateProductCategory from "./pages/UpdateProductCategory";
import UpdateBlogCategory from "./pages/UpdateBlogCategory";
import UpdateBlog from "./pages/UpdateBlog";
import AddCoupon from "./pages/AddCoupon";
import Couponlist from "./pages/Couponlist";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="product" element={<AddProduct />} />
            <Route path="product/update/:id" element={<UpdateProduct />} />
            <Route path="product-list" element={<Productlist />} />
            <Route path="brand" element={<AddBrand />} />
            <Route path="brand/update/:id" element={<UpdateBrand />} />
            <Route path="brand-list" element={<Brandlist />} />
            <Route path="color" element={<AddColor />} />
            <Route path="color/update/:id" element={<UpdateColor />} />
            <Route path="color-list" element={<Colorlist />} />
            <Route path="product-category" element={<AddProductCategory />} />
            <Route path="product-category/update/:id" element={<UpdateProductCategory />} />
            <Route path="products-category-list" element={<ProductCategorylist />} />
            <Route path="orders" element={<Orders />} />
            <Route path="blog" element={<AddBlog />} />
            <Route path="blog/update/:id" element={<UpdateBlog />} />
            <Route path="blog-category" element={<AddBlogCategory />} />
            <Route path="blog-category/update/:id" element={<UpdateBlogCategory />} />
            <Route path="blogs-list" element={<Bloglist />} />
            <Route path="coupon" element={<AddCoupon />} />
            <Route path="coupon-list" element={<Couponlist />} />
            <Route path="blogs-category-list" element={<BlogCategoryList />} />
            <Route path="inquiries" element={<Inquiries />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
