import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Store from './pages/Store';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>} />
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='store' element={<Store/>}/>
     </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
