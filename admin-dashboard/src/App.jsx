// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js';
import "./App.css";
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
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";

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
          <Route path="brand-list" element={<Brandlist />} />
          <Route path="color-list" element={<Colorlist />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="blogs-list" element={<Bloglist />} />
          <Route path="blogs-category-list" element={<BlogCategoryList />} />
          <Route path="inquiries" element={<Inquiries />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
