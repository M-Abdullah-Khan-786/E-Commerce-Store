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
      <Route path='contact' element={<Contact/>}/>
      <Route path='compare-product' element={<CompareProduct/>}/>
      <Route path='wishlist' element={<Wishlist/>}/>
     </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
