import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Store from './pages/Store';
import Blog from './pages/blog';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import ResetPasssword from './pages/ResetPasssword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermAndCondition from './pages/TermAndCondition';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>} />
      <Route path='about' element={<About/>}/>
      <Route path='store' element={<Store/>}/>
      <Route path='blogs' element={<Blog/>}/>
      <Route path='blog/:id' element={<SingleBlog/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='compare-product' element={<CompareProduct/>}/>
      <Route path='wishlist' element={<Wishlist/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='forgot-password' element={<ForgotPassword/>}/>
      <Route path='reset-password' element={<ResetPasssword/>}/>
      <Route path='privacy-policy' element={<PrivacyPolicy/>}/>
      <Route path='refund-policy' element={<RefundPolicy/>}/>
      <Route path='shipping-policy' element={<ShippingPolicy/>}/>
      <Route path='term-conditions' element={<TermAndCondition/>}/>
     </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
